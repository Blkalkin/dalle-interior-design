const Jimp = require('jimp');
const sharp = requi
const OpenAI = require("openai");
const fs = require('fs');
require('dotenv').config({ path: '../.env' });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

function imageToBase64(path) {
  const image = fs.readFileSync(path);
  return image.toString('base64');
}

async function processImage(imagePath, outputPath) {
  try {
      // Read and crop the image
      let image = await Jimp.read(imagePath);
      const minDimension = Math.min(image.bitmap.width, image.bitmap.height);
      const cropX = (image.bitmap.width - minDimension) / 2;
      const cropY = (image.bitmap.height - minDimension) / 2;
      image = await image.crop(cropX, cropY, minDimension, minDimension);
      await image.writeAsync("cropped_image.png");
      console.log("Image processed and saved to: cropped_image.png");

      // Calculate the size of the transparent square (80% of the cropped image)
      const squareSize = Math.floor(minDimension * 0.8);
      const offsetX = Math.floor((minDimension - squareSize) / 2);
      const offsetY = Math.floor((minDimension - squareSize) / 2);

      // Make the center square transparent
      for (let x = offsetX; x < offsetX + squareSize; x++) {
          for (let y = offsetY; y < offsetY + squareSize; y++) {
              image.setPixelColor(Jimp.rgbaToInt(0, 0, 0, 0), x, y);  // Set to fully transparent
          }
      }

      // Save the processed image
      await image.writeAsync(outputPath);
      console.log('Image processed and saved to:', outputPath);
  } catch (error) {
      console.error('Error processing image:', error);
  }
}


async function generate_image_with_local(imagePath,base64Image, userPrompt) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-vision-preview",
    max_tokens: 4096,
    messages: [
      {
        role: "system",
        content: `
        Analyze the image and concisely describe key elements with high realism. Focus on the room's ambiance, layout, size, ceiling height, and the photo's angle, explaining its impact on object visibility and arrangement.

Detail the color scheme and lighting, whether natural or artificial, dim or bright. Describe the flooring, like wooden floorboards or marble tiles, and any rugs, noting their patterns and textures.

Enumerate furniture pieces, specifying styles, colors, materials, and positions relative to the camera's perspective (e.g., a forest green velvet armchair in the foreground left). Highlight decorative items such as paintings, sculptures, or plants, including sizes, colors, positions, and textures.

Describe visible appliances and electronics, stating brands, models, and conditions, along with wall hangings, window treatments, or bookshelves, and their contents.

Comment on the room's overall condition (tidy, cluttered, pristine, worn) and notable features like fireplaces or beams. Include sensory details and emotional responses they evoke.

Use the user's input to guide any modifications in the room's design, focusing on specific areas for inpainting. Keep the language clear and within safety guidelines, aiming for a description under 1000 characters. Do not address the user at any point, the final output must be a description and nothing futher.
        `
      },
      {
        role: "user",
        content: [
          { type: "text", text: userPrompt + "this response must be kept under 900 characters"},
          {
            type: 'image_url',
                    image_url: {
                        url: `data:image/jpeg;base64,${base64Image}`
                    }
          },
        ],
      },
    ],
  });
  let response_text = response.choices[0].message.content;
  let formatted_text = response_text.replace(/\n/g, ' ');
  console.log(formatted_text)

  const baseImageStream = fs.createReadStream('cropped_image.png');
  const maskImageStream = fs.createReadStream('output.png');

  const image_generated = await openai.images.edit({
    image: baseImageStream,
    mask: maskImageStream,
    prompt: formatted_text
  });
  console.log(image_generated)
  }

const image = process.argv[2];
processImage(image, 'output.png')
let base64Image = imageToBase64(image)
const userPrompt = process.argv[3];

generate_image_with_local(image,base64Image, userPrompt);

//To use this, make sure you are in the image generation directory and then just type the command: node dalle_2_test.js "local_url" "prompt"
// Ex. node dalle_2_test.js "sample-images/office.png" "make it look the office of bill gates"
// Wait for a little bit to get back the gpt4 prompt and a temporary link to the generated image. 
// If you'd like to use other images, download the file and either put it in the sample-images folder and refer it to it "sample-images/..." 
// or get the exact path from wherever on your computer.
// still prone to some errors with long prompts, note that THE IMAGES MUST BE PNG AND UNDER 4MB
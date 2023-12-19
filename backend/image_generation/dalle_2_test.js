const Jimp = require('jimp');
const OpenAI = require("openai");
const fs = require('fs');

const apiKey =  "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"
const openai = new OpenAI({apiKey: apiKey});

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
      await image.writeAsync("cropped_image");

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
        Analyze the image and deliver a very detailed description, keeping a high degree of photo realism, focusing on observable elements and perspective. Describe the room, noting its ambiance, layout, size, ceiling height, and the angle of the photograph (corner, eye level, high, low). Explain how this perspective affects the visibility and arrangement of objects.

Detail the color scheme, lighting (natural or artificial, dim or bright), and flooring type (e.g., wooden floorboards, marble tiles, carpeting), including any rugs with their patterns and textures.

Enumerate furniture pieces, noting styles, colors, materials, and their relative positions from the camera's view (e.g., a forest green velvet armchair in the foreground left). Highlight decorative items like paintings, sculptures, or plants, describing sizes, colors, positions, and textures.

Describe visible appliances, electronics (brand, model, condition), and any wall hangings, window treatments, or bookshelves, including contents and appearances.

Comment on the room's condition (tidy, cluttered, pristine, worn) and notable features like fireplaces, beams, or architectural details. Include sensory details like textures, sounds, and smells, and any emotional or atmospheric responses they evoke.

Ensure the language is clear, focused, and aligns with safety guidelines for DALL-E 3 be absolutely descriptive as possible about the locations of objects in the image.

This end result will be directly fed into Dalle 3's as a prompt, so ensure there are not any unnecessary explanations to the user.
        `
      },
      {
        role: "user",
        content: [
          { type: "text", text: userPrompt + "use the input as a guide to shape the description, the output needs to be just detailed descriptions and locations in the photo"},
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

  const baseImageStream = fs.createReadStream(imagePath);
  const maskImageStream = fs.createReadStream('proccessed_image.png');

  const image_generated = await await openai.createImageEdit(
    baseImageStream,
    maskImageStream,
    "dall-e-2",  // Assuming you are using the dall-e-2 model
    formatted_text + "DO NOT REVISE THIS DESCRIPTION IT IS EXTREMELY DETAILED, DO NOT REDUCE ITS LENGTH",
    1,           // Number of images to generate
    "1024x1024"  // Output size
  );
  console.log(image_generated)
  }

const image = process.argv[2];
processImage(image, 'output.png')
let base64Image = imageToBase64(image)
const userPrompt = process.argv[3];

//generate_image_with_local(image,base64Image, userPrompt);


//processImage('input.png', 'output.png');


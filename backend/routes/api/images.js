const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
const fs = require('fs');
const Jimp = require('jimp');
require('dotenv').config({ path: '../../.env' });



class ImageProcessor {
    constructor() {
      this.openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
    
    
    async processImage(imagePath, outputPath) {
        try {
            // Read and save the image as input
            let image = await Jimp.read(imagePath);
            await image.writeAsync("image_generation/route-images/input.png");
            // Crop image and save
            console.log("Image processed and saved to: image_generation/route-images/input.png");
            const minDimension = Math.min(image.bitmap.width, image.bitmap.height);
            const cropX = (image.bitmap.width - minDimension) / 2;
            const cropY = (image.bitmap.height - minDimension) / 2;
            image = await image.crop(cropX, cropY, minDimension, minDimension);
            await image.writeAsync("image_generation/route-images/cropped_image.png");
            console.log("Image processed and saved to: image_generation/route-images/cropped_image.png");
      
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
  
    async generateImageEdit(imagePath, base64Image, userPrompt) {
        const response = await this.openai.chat.completions.create({
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
        
        Use the user's input to guide any modifications in the room's design, focusing on specific areas for inpainting. Keep the language clear and within safety guidelines, aiming for a description under 1000 characters. Do not address the user at any point, the final output must be a description and nothing further.
                `
              },
              {
                role: "user",
                content: [
                  { type: "text", text: userPrompt + "...Keep under 1000 characters"},
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
          formatted_text = formatted_text.slice(0, 1000);
          console.log(formatted_text)
        
          const baseImageStream = fs.createReadStream('image_generation/route-images/cropped_image.png');
          const maskImageStream = fs.createReadStream('image_generation/route-images/output.png');
        
          const image_generated = await this.openai.images.edit({
            image: baseImageStream,
            mask: maskImageStream,
            prompt: formatted_text
          });
          //console.log(image_generated)
          return {
            formattedText: formatted_text,
            imageGenerated: image_generated.data[0].url
        };
    }

    async generateImagePrompt(imagePath, base64Image, userPrompt){
      const response = await this.openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        max_tokens: 4096,
        messages: [
            {
                role: "system",
                content: `Analyze the image and deliver a very detailed description, keeping a high degree of photo realism, focusing on observable elements and perspective. Describe the room, noting its ambiance, layout, size, ceiling height, and the angle of the photograph (corner, eye level, high, low). Explain how this perspective affects the visibility and arrangement of objects.

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
                    { type: "text", text: userPrompt + "use the input as a guide to shape the description, the output needs to be just detailed descriptions and locations in the photo" },
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

    //console.log(response);
    let responseText = response.choices[0].message.content;
    //console.log(responseText);
    let formattedText = responseText.replace(/\n/g, ' ');

    const image_generated = await this.openai.images.generate({
        model: "dall-e-3",
        prompt: formattedText + "DO NOT REVISE THIS DESCRIPTION IT IS EXTEREMELY DETAILED, DO NOT REDUCE ITS LENGTH"
      });
    //console.log(image_generated.data[0].url)
    return { 
      formattedText: image_generated.data[0].revised_prompt, 
      imageGenerated: image_generated.data[0].url
    };
    }


    static imageToBase64(path) {
      const image = fs.readFileSync(path);
      return image.toString('base64');
    }
  }


const imageProcessor = new ImageProcessor();


router.post('/generate-image', async (req, res) => {
    try {
      const { imagePath, userPrompt } = req.body;
      const outputPath = 'image_generation/route-images/output.png';
  
      await imageProcessor.processImage(imagePath, outputPath);
      const base64Image = ImageProcessor.imageToBase64('image_generation/route-images/input.png');
  
      const response = await imageProcessor.generateImageEdit(imagePath, base64Image, userPrompt);
      res.json(response);
    } catch (error) {
      console.error('Error in route:', error);
      res.status(500).send('An error occurred');
    }
});


router.post('/generate-prompt-image', async (req, res) => {
    try {
      const { imagePath, userPrompt } = req.body;
      let image = await Jimp.read(imagePath);
      await image.writeAsync("image_generation/route-images/input.png");
      const base64Image = ImageProcessor.imageToBase64("image_generation/route-images/input.png");
      const response = await imageProcessor.generateImagePrompt(imagePath, base64Image, userPrompt)
      res.json(response);
    } catch (error) {
        console.error('Error in route:', error);
        res.status(500).send('An error occurred: ' + error.message);
    }
});

module.exports = router;

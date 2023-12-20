const OpenAI = require("openai");
require('dotenv').config({ path: '../.env' });

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function generate_image(imageUrl, userPrompt) {
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
            { type: "text", text: userPrompt + "use the input I gave as a guide to shape the description, the output needs to be just detailed descriptions and locations in the photo, remember you are addressing dalle-2 not a person"},
            {
              type: "image_url",
              image_url: {
                "url": imageUrl,
              },
            },
          ],
        },
      ],
    });
    let response_text = response.choices[0].message.content;
    let formatted_text = response_text.replace(/\n/g, ' ');
    console.log(formatted_text)

    const image_generated = await openai.images.generate({
      model: "dall-e-3",
      prompt: formatted_text + "DO NOT REVISE THIS DESCRIPTION IT IS EXTREMELY DETAILED, DO NOT REDUCE ITS LENGTH"
    });
    console.log(image_generated)
    }

const imageUrl = process.argv[2];
const userPrompt = process.argv[3];


generate_image(imageUrl, userPrompt);

// To use this, make sure you are in the image generation directory and then just type the command: node vision_test.js "url" "prompt"
// Ex. node vision_test.js "https://media.istockphoto.com/id/172271165/photo/bedroom-that-needs-a-reno.jpg?s=612x612&w=0&k=20&c=Ma3iagYhzllvN3hmlrlpoD3VvOpGYHl5p86AqhFZyWA=" "add a chair"
// Wait for a little bit to get back the gpt4 prompt, the revised prompt dalle-3 generates, and a temporary link to the generated image. 

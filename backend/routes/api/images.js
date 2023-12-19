const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');


const openai = new OpenAI('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'); 
router.post('/', async (req, res) => {
    const { imageUrl, promptText } = req.body;

    try {
        const descriptionResponse = await openai.chat.completions.create({
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
                        { type: "text", text: promptText + "use the input as a guide to shape the description, the output needs to be just detailed descriptions and locations in the photo" },
                        {
                            type: "image_url",
                            image_url: { "url": imageUrl },
                        },
                    ],
                },
            ],
        });

        let responseText = descriptionResponse.choices[0].message.content;
        let formattedText = responseText.replace(/\n/g, ' ');

        const image_generated = await openai.images.generate({
            model: "dall-e-3",
            prompt: formatted_text + "DO NOT REVISE THIS DESCRIPTION IT IS EXTEREMELY DETAILED, DO NOT REDUCE ITS LENGTH"
          });
        res.json({ description: formattedText, imageResponse: image_generated });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('An error occurred: ' + error.message);
    }
});

module.exports = router;

const OpenAI = require("openai");

const apiKey =  "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"

const openai = new OpenAI({apiKey: apiKey});

async function generate_image() {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 4096,
      messages: [
        {
          role: "system",
          content: `
          Analyze the image and deliver a concise, yet detailed description, focusing on observable elements and perspective. Describe the room, noting its ambiance, layout, size, ceiling height, and the angle of the photograph (corner, eye level, high, low). Explain how this perspective affects the visibility and arrangement of objects.

Detail the color scheme, lighting (natural or artificial, dim or bright), and flooring type (e.g., wooden floorboards, marble tiles, carpeting), including any rugs with their patterns and textures.

Enumerate furniture pieces, noting styles, colors, materials, and their relative positions from the camera's view (e.g., a forest green velvet armchair in the foreground left). Highlight decorative items like paintings, sculptures, or plants, describing sizes, colors, positions, and textures.

Describe visible appliances, electronics (brand, model, condition), and any wall hangings, window treatments, or bookshelves, including contents and appearances.

Comment on the room's condition (tidy, cluttered, pristine, worn) and notable features like fireplaces, beams, or architectural details. Include sensory details like textures, sounds, and smells, and any emotional or atmospheric responses they evoke.

Finally, based on the user's input, add modifications to the room's design, maintaining the level of detail as the original description. This might include adding or rearranging furniture, altering color schemes, or introducing new decorative elements. Ensure the language is clear, focused, and aligns with safety guidelines for DALL-E 3 while being under 4000 characters total (try for 700-800 words).

This end result will be directly fed into Dalle 3's as a prompt, so ensure there are not any unnecessary explanations to the user.
          `
        },
        {
          role: "user",
          content: [
            { type: "text", text: "I'd like another desk where you think it would best fit" },
            {
              type: "image_url",
              image_url: {
                "url": "https://plus.unsplash.com/premium_photo-1661962952618-031d218dd040?q=80&w=2996&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
            },
          ],
        },
      ],
    });
    let response_text = response.choices[0].message.content;
    let formatted_text = response_text.replace(/\n/g, ' ');

    const image_generated = await openai.images.generate({
      model: "dall-e-3",
      prompt: formatted_text
    });
    console.log(image_generated)
    }

  generate_image();

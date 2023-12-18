const OpenAI = require("openai");

const apiKey =  "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"

const openai = new OpenAI({apiKey: apiKey});

async function main() {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      max_tokens: 4096,
      messages: [
        {
          role: "system",
          content: `
          Analyze the given image and provide an ultra-detailed, comprehensive description focusing on every observable element, with a special emphasis on the perspective of the photo. Describe the setting as an interior space of a house, capturing the overall ambiance and mood.

          Detail the room's layout, size, and ceiling height from the photo's original perspective. Is the photo taken from a corner, at eye level, from a higher or lower angle? How does this perspective influence the visibility and arrangement of objects in the room?
          
          Describe the color scheme and lighting conditions, specifying whether the light is natural or artificial, and its intensity (dim, bright). Identify the flooring type and style (e.g., polished wooden floorboards, white marble tiles, plush carpeting) and any rugs or mats, including their patterns and textures.
          
          Enumerate all pieces of furniture, detailing their styles, colors, materials, and placement relative to the camera's viewpoint (e.g., a mid-century modern armchair in forest green velvet, positioned in the foreground to the left). Highlight decorative elements like paintings, sculptures, or indoor plants, describing their sizes, colors, positions, and any observable textures.
          
          Describe any visible appliances or electronics, their brands, models, and their conditions (new, used, vintage). For any visible wall hangings, window treatments, or bookshelves, describe their contents and appearance in detail.
          
          Mention the room's overall condition (tidy, cluttered, pristine, showing signs of wear) and any notable features like fireplaces, ceiling beams, or architectural details, including their styles and materials.
          
          Include sensory details: textures (e.g., smooth leather, rough stone), sounds (perhaps a clock ticking, faint music), and smells (like scented candles or fresh linen). Describe any emotional or atmospheric reactions these elements could evoke.
          
          The goal is to provide an incredibly rich, vivid description that allows for a precise, true-to-life recreation of the room, capturing the essence of its style, character, and atmosphere from the given photographic perspective.

          In addition, use the user prompt to make the changes to the description in a way that redesigns the room how they would like it, with the redesign being as detailed as the original description. This what you are returning that will be used to prompt DALLE-3.

          Make sure that this description will pass the safety system check for Dalle-3.
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
    console.log(response.choices[0]);

    const image_generated = await openai.images.generate({
      model: "dall-e-3",
      prompt: `
      The photo captures an open and airy industrial-style living space, blending modern and rustic elements. It's a spacious room with an ambiance that combines lived-in comfort with a chic minimalist aesthetic. The high ceiling, illuminated by strong natural light amplified by two tall windows flanking a segment of exposed white-painted brick wall, gives the room an expansive feel.

      The photography angle seems to be taken from a corner at slightly above eye level, which highlights the room's length and the alignment of furniture along its length. This elevated perspective accentuates the depth of the room and allows a comprehensive view of its layout and contents.
      
      The flooring is a light, distressed wood, laid in a traditional plank pattern that runs the length of the room, contributing to the sense of verticality and openness. A plush, off-white area rug with speckles of gray anchors the central space, softening the hard lines of the wooden floor.
      
      Furniture in this space includes a large, off-white sectional sofa adorned with neutral-toned pillows, positioned parallel to the back wall and facing what appears to be a central part of the room. An accompanying distressed white metal side table with a small vase of purple flowers stands to the left of the sofa. In the room's center is a low, contemporary coffee table hosting a decorative gray bowl with greenery. Directly across the sofa, a modern media console houses minimalistic décor, including a picture frame, small green plants, books, and an assortment of black, white, and red objects. Adjacent to the media console is a sleek, black tripod lamp and a small desk with a metallic frame and glass top, supporting a houseplant and a few trinkets.
      
      Textures in the room range from the smooth, matte finish of the sofa's upholstery to the roughness of the brick walls and the aged look of the wooden beams overhead. As one can imagine, the sound of the outside, perhaps rustling leaves or distant city hustle, would filter softly through the tall windows, while the fragrance of burning wood might mingle with the natural scent of the lush green plants sprinkled throughout the room.
      
      The user has requested an additional desk be added to the space in a fitting position. Given the current layout and the nature of the open space, an ideal place for a second desk would be on the opposite wall of the existing small desk, maintaining the symmetry and balance of the room. This new desk would be a counterpart in style—a minimalist design with a sleek, metallic frame and a wooden top to match the room's industrial feel. It should be sufficiently spaced from the wood-burning stove and aligned with the sofa, creating a functional work area that doesn't disrupt the room's harmonious flow. The desk might be paired with a contemporary chair featuring clean lines and a matching color palette to blend seamlessly with the room's design. It could also host a modern desk lamp with a metallic finish and perhaps a small potted plant or a set of minimalist organizers, echoing the curated, uncluttered style of the existing furnishings. The overall condition of the redesigned room would remain pristine, with the new addition enhancing both function and form.I NEED to test how the tool works with extremely simple prompts. DO NOT add any detail, just use it AS-IS:
      `
    });
    console.log(image_generated)
    }


  main();

// Writes the nine copy-paste-ready prompt files into ./imageprompts/.
// Edit STYLE / CHARACTER / NEGATIVE / SCENES here, then: node scripts/gen-imageprompts.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const STYLE = `Minecraft-style voxel world rendered with a high-end ray-traced shader pack (BSL / Complementary Reimagined look). Everything is built from perfectly uniform 1x1 cubic blocks on a strict axis-aligned grid with sharp 90-degree edges - no rounded corners, no bevels, no subdivision, no organic curves, no smoothed silhouettes. Block textures are 16x16 pixel textures, crisp nearest-neighbour, visibly pixelated, never blurred or upscaled-smooth. Third-person over-the-shoulder camera, player character slightly right of centre, back to camera, mid-distance framing, horizon on the upper third. 16:9, 2560x1440. Volumetric god rays, soft shadows, subtle atmospheric fog with depth. Cinematic but clean - the centre of the frame stays calm and uncluttered, negative space in the middle third, so interface panels can sit on top of it.`;

const CHARACTER = `CHARACTER: a blocky Minecraft player skin - black t-shirt with a single teal collar stripe, dark grey trousers, dark brown blocky hair, medium-brown skin, short beard. Flat cuboid limbs, no joints, no anatomy, no facial detail, no cloth simulation. Same skin, same proportions, same scale as every other image in this set.`;

const NEGATIVE = `NEGATIVE: smooth surfaces, rounded edges, subdivision, bevelled cubes, anti-aliased textures, blurry pixels, realistic humans, real faces, hands with fingers, photorealistic skin, low-poly organic shapes, Roblox style, Lego studs, plastic sheen, toy bricks, text, watermark, logo, UI overlay, HUD, hotbar, hearts, XP bar, chat box, inventory, crosshair, motion blur, depth-of-field bokeh, fisheye, tilt-shift.`;

const SCENES = [
  ['01-plains', 'hero', 'public/mc/01-plains.jpg',
   `SCENE: Wide plains biome at sunrise. Rolling grass-block hills, a small oak village of cobblestone and oak planks in the mid-left distance, a wheat farm with water channels, a few sheep. Warm low sun casting long horizontal shadows across the blocks, orange-to-pale-blue sky gradient, thin pixel clouds as flat white slabs. The middle and upper centre of the frame is open sky - leave it empty.`],

  ['02-cherry-grove', 'about', 'public/mc/02-cherry-grove.jpg',
   `SCENE: Cherry grove biome. Pink cherry-blossom leaf blocks in dense cubic canopies, petals drifting as small pink squares, a small still pond, moss and flower blocks on the ground. Soft diffuse midday light, gentle pink-to-teal colour bounce. Character stands on the left third facing away toward the trees. The right half of the frame is quiet ground and open air.`],

  ['03-stronghold', 'skills', 'public/mc/03-stronghold.jpg',
   `SCENE: Underground stronghold library. Stone-brick walls, bookshelf blocks floor to ceiling, an enchanting table on an obsidian plinth with an open book hovering above it, purple glyph particles rising as small squares, floating book blocks orbiting. Purple and violet key light from the enchanting table, deep cool shadow elsewhere, a few warm torches on the walls. Dark, moody, high contrast.`],

  ['04-mineshaft', 'projects', 'public/mc/04-mineshaft.jpg',
   `SCENE: Abandoned mineshaft. Oak-plank support frames, rails running into the dark, a row of oak chests along the left wall, ore blocks - redstone, gold, lapis - embedded in the stone. Warm orange torchlight pools falling off into black, dust motes as tiny bright squares. Tight, enclosed, cosy.`],

  ['05-snowy-peaks', 'experience', 'public/mc/05-snowy-peaks.jpg',
   `SCENE: Jagged snowy mountain peaks above a sea of cloud. Snow and packed-ice blocks, spruce trees on the lower slopes, a small campfire on a ledge in the foreground with the character warming beside it. Cold blue-and-lavender twilight, first stars as single white pixels, warm orange campfire light as the only warm source. Sweeping, calm, wide.`],

  ['06-deep-dark', 'achievements', 'public/mc/06-deep-dark.jpg',
   `SCENE: Deep dark biome. Sculk blocks and sculk veins spreading over deepslate, sculk sensors pulsing cyan, a sculk shrieker, an ancient-city pillar structure in the far background. Near-black scene lit only by soft teal sculk emission and one small torch the character holds. Very dark, very quiet, high contrast, lots of negative space.`],

  ['07-village', 'services', 'public/mc/07-village.jpg',
   `SCENE: Interior of a village trading hall. Oak plank and cobblestone walls, lecterns and barrels, a villager in brown robes standing behind a wooden counter, emerald blocks stacked on a shelf, potted plants, a bed in the corner. Warm lantern light through the windows, late-afternoon sun beams landing on the floor blocks. Cosy, occupied, lived-in.`],

  ['08-lush-caves', 'contact', 'public/mc/08-lush-caves.jpg',
   `SCENE: Lush cave chamber. Moss blocks, glow-berry vines hanging in bright yellow-green strands, azalea trees, a clear turquoise water pool with a small waterfall, dripleaf blocks. One vertical god-ray shaft entering through a hole in the ceiling and hitting the water. Saturated green and turquoise, luminous, magical.`],

  ['09-the-end', 'outro', 'public/mc/09-the-end.jpg',
   `SCENE: The End dimension. Pale yellow end-stone islands floating in black void, obsidian pillars topped with end crystals, a purple end-gateway portal beam rising into the dark, enderman silhouettes as tall thin black cuboids in the distance. Sickly yellow-green ambient light against a near-black sky, violet portal glow. Empty, final, vast.`],
];

mkdirSync('imageprompts', { recursive: true });

for (const [slug, screen, out, scene] of SCENES) {
  const body = [
    `# ${slug} -> ${out}  (screen: ${screen})`,
    `# Paste everything below this line.`,
    ``,
    STYLE,
    ``,
    CHARACTER,
    ``,
    scene,
    ``,
    NEGATIVE,
    ``,
  ].join('\n');
  writeFileSync(`imageprompts/${slug}.txt`, body);
  console.log(`imageprompts/${slug}.txt`);
}

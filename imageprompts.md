# imageprompts

**Copy-paste files live in `imageprompts/`** — one `.txt` per background, each
already carrying the style block, character block, scene and negative prompt.
Open one, paste the whole thing, generate. This file is the reasoning behind
them. Changed a shared block? Edit `scripts/gen-imageprompts.mjs` and run
`node scripts/gen-imageprompts.mjs` to rewrite all nine.

Nine backgrounds for the nine screens. Drop the results in `public/mc/` with the
filenames below and they appear automatically — `src/minecraft/config.js` already
points at them. Until then each screen paints its gradient fallback, so nothing
is broken while you generate.

| # | File | Screen |
|---|------|--------|
| 1 | `public/mc/01-plains.jpg` | hero |
| 2 | `public/mc/02-cherry-grove.jpg` | about |
| 3 | `public/mc/03-stronghold.jpg` | skills |
| 4 | `public/mc/04-mineshaft.jpg` | projects |
| 5 | `public/mc/05-snowy-peaks.jpg` | experience |
| 6 | `public/mc/06-deep-dark.jpg` | achievements |
| 7 | `public/mc/07-village.jpg` | services |
| 8 | `public/mc/08-lush-caves.jpg` | contact |
| 9 | `public/mc/09-the-end.jpg` | outro |

---

## The shared style block

Every prompt below is written as **STYLE BLOCK + SCENE**. Paste the style block
verbatim at the top of each generation. It is what makes nine separate
generations look like nine screenshots from one game session rather than nine
different games.

```
STYLE BLOCK — paste identically into every generation:

Minecraft-style voxel world rendered with a high-end ray-traced shader pack
(BSL / Complementary Reimagined look). Everything is built from perfectly
uniform 1x1 cubic blocks on a strict axis-aligned grid — no rounded corners,
no bevels, no organic curves, no smoothed silhouettes. Block textures are
16x16 pixel textures, crisp nearest-neighbour, visibly pixelated, never
blurred or upscaled-smooth. Third-person over-the-shoulder camera, player
character slightly right of centre, back to camera, mid-distance framing,
horizon on the upper third. 16:9, 2560x1440. Volumetric god rays, soft
shadows, subtle atmospheric fog with depth. Cinematic but clean — the centre
of the frame is calm and uncluttered so UI can sit on top of it.
```

**Consistent character** — append this to every scene so the same person appears
in all nine:

```
CHARACTER: the same blocky Minecraft player skin in every image — black t-shirt
with a single teal collar stripe, dark grey trousers, dark brown blocky hair,
medium-brown skin, short beard. Rendered as flat cuboid limbs, no anatomy, no
joints, no cloth simulation. Same skin, same proportions, same scale in all nine
images.
```

**Negative prompt** — same one every time:

```
NEGATIVE: smooth surfaces, rounded edges, subdivision, bevelled cubes, anti-
aliased textures, blurry pixels, realistic humans, real faces, hands with
fingers, photorealistic skin, low-poly organic shapes, Roblox style, Lego studs,
plastic sheen, text, watermark, logo, UI overlay, HUD, hotbar, chat box,
crosshair, motion blur, depth-of-field bokeh, fisheye, tilt-shift.
```

Note the last cluster: **never generate the UI.** The hotbar, hearts, XP bar and
every panel are real DOM. A painted-in HUD will fight the real one and always
lose.

---

## The nine scenes

Format: STYLE BLOCK + CHARACTER + the SCENE line below + NEGATIVE.

**1 — `01-plains.jpg` · hero · Plains at golden hour**
> SCENE: Wide plains biome at sunrise. Rolling grass-block hills, a small oak
> village of cobblestone and oak planks in the mid-left distance, a wheat farm
> with water channels, a few sheep. Warm low sun casting long horizontal
> shadows across the blocks, orange-to-pale-blue sky gradient, thin pixel
> clouds as flat white slabs. The middle and upper centre of the frame is open
> sky — leave it empty.

**2 — `02-cherry-grove.jpg` · about · Cherry Grove, soft daylight**
> SCENE: Cherry grove biome. Pink cherry-blossom leaf blocks in dense cubic
> canopies, petals drifting as small pink squares, a small still pond, moss and
> flower blocks on the ground. Soft diffuse midday light, gentle pink-to-teal
> colour bounce. Character stands on the left third facing away toward the
> trees. Right half of the frame is quiet ground and open air.

**3 — `03-stronghold.jpg` · skills · Stronghold library, enchanting glow**
> SCENE: Underground stronghold library. Stone-brick walls, bookshelf blocks
> floor to ceiling, an enchanting table on an obsidian plinth with an open book
> hovering above it, purple glyph particles rising as small squares, floating
> book blocks orbiting. Purple and violet key light from the enchanting table,
> deep cool shadow elsewhere, a few warm torches on the walls. Dark, moody,
> high contrast.

**4 — `04-mineshaft.jpg` · projects · Abandoned mineshaft, torchlight**
> SCENE: Abandoned mineshaft. Oak-plank support frames, rails running into the
> dark, a row of oak chests along the left wall, ore blocks — redstone, gold,
> lapis — embedded in the stone. Warm orange torchlight pools falling off into
> black, dust motes as tiny bright squares. Tight, enclosed, cosy.

**5 — `05-snowy-peaks.jpg` · experience · Snowy peaks at blue hour**
> SCENE: Jagged snowy mountain peaks above a sea of cloud. Snow and packed-ice
> blocks, spruce trees on the lower slopes, a small campfire on a ledge in the
> foreground with the character warming beside it. Cold blue-and-lavender
> twilight, first stars as single white pixels, warm orange campfire light as
> the only warm source. Sweeping, calm, wide.

**6 — `06-deep-dark.jpg` · achievements · Deep Dark, sculk**
> SCENE: Deep dark biome. Sculk blocks and sculk veins spreading over deepslate,
> sculk sensors pulsing cyan, a sculk shrieker, an ancient-city pillar
> structure in the far background. Near-black scene lit only by soft teal sculk
> emission and one small torch the character holds. Very dark, very quiet, high
> contrast, lots of negative space.

**7 — `07-village.jpg` · services · Village trading hall interior**
> SCENE: Interior of a village trading hall. Oak plank and cobblestone walls,
> lecterns and barrels, a villager in brown robes standing behind a wooden
> counter, emerald blocks stacked on a shelf, potted plants, a bed in the
> corner. Warm lantern light through the windows, late-afternoon sun beams on
> the floor blocks. Cosy, occupied, lived-in.

**8 — `08-lush-caves.jpg` · contact · Lush caves, shaft of light**
> SCENE: Lush cave chamber. Moss blocks, glow-berry vines hanging in bright
> yellow-green strands, azalea trees, a clear turquoise water pool with a small
> waterfall, dripleaf blocks. One vertical god-ray shaft entering through a
> hole in the ceiling and hitting the water. Saturated green and turquoise,
> luminous, magical.

**9 — `09-the-end.jpg` · outro · The End, void islands**
> SCENE: The End dimension. Pale yellow end-stone islands floating in black
> void, obsidian pillars topped with end crystals, purple end-gateway portal
> beam rising into the dark, endermen silhouettes as tall thin black cuboids in
> the distance. Sickly yellow-green ambient light against near-black sky,
> violet portal glow. Empty, final, vast.

---

## The geometry-lock technique

Video and image models trained mostly on photos have one strong instinct:
**smooth things**. Left alone they will round your cube corners, bevel edges,
blur your 16x16 textures into soft gradients, and hand you something that reads
as "voxel-ish 3D render" instead of Minecraft. Worse, a video model will drift
the geometry *between frames* — blocks breathe, grids wander, textures crawl.

Geometry-lock is four rules applied together. Any one alone is not enough.

**1. Name the grid, not the look.** "Minecraft style" is a vibe the model
averages away. *"Perfectly uniform 1x1 cubic blocks on a strict axis-aligned
grid — no rounded corners, no bevels, no subdivision"* is a geometric
constraint it can actually hold. Always describe the primitive, never only the
franchise.

**2. Pin the texture resolution.** Say *"16x16 pixel textures, nearest-neighbour,
visibly pixelated"* explicitly. Without a stated resolution the model
interpolates toward photographic detail, and pixel art is the first casualty.

**3. Negative-prompt the smoothing verbs.** `smooth, rounded, bevelled,
subdivision, anti-aliased, blurry pixels, plastic sheen` — these are the exact
failure modes, and naming them is far more effective than adding more positive
style words.

**4. Lock the camera and the character in identical words.** Reuse the same
sentence for framing and the same sentence for the skin in all nine prompts. Do
not paraphrase between images — paraphrase is drift. Where the tool supports it,
also fix the seed and vary only the scene line; and generate image 1 first, then
pass it as a style/character reference for images 2–9.

For **video** models, add on top of the above:

```
Locked-off camera, no camera movement, no parallax, no zoom, no handheld drift.
Static geometry — blocks do not deform, shift, or breathe. Only light,
particles, water, foliage and cloth-free flags animate. Consistent block grid in
every frame.
```

The trick that saves the most re-rolls: give the video model a **still you
already like** as the first frame and let it animate *only the light and
particles*. Geometry that was never asked to move cannot smooth itself.

---

## Fix-it table

When a generation drifts, change one thing and re-roll — not five.

| Symptom | Cause | Fix |
|---|---|---|
| Cubes look rounded or bevelled | Model defaulting to soft 3D | Add "strict axis-aligned cubes, sharp 90° edges, zero bevel" to the positive; add `rounded, bevelled, subdivision` to the negative |
| Textures look smooth / airbrushed | No stated pixel resolution | Force "16x16 pixel textures, nearest-neighbour, visibly pixelated"; add `anti-aliased, blurry pixels` to the negative |
| Looks like Lego or Roblox | Studs and plastic shading crept in | Negative-prompt `Lego studs, plastic sheen, toy bricks, Roblox`; add "matte, non-reflective block surfaces" |
| Character has a realistic face or fingers | Model pulled toward human anatomy | Keep the character facing away; add "flat cuboid limbs, no fingers, no facial features, no anatomy"; negative `realistic human, real face, hands with fingers` |
| Character changes between images | Skin described loosely | Copy the CHARACTER paragraph byte-for-byte; use image 1 as a reference image; fix the seed |
| Nine images look like nine games | Lighting and camera drifted | Reuse the STYLE BLOCK verbatim; state the same camera height, same lens, same time-of-day family (all "cinematic shader pack") |
| UI painted into the image | Model saw Minecraft screenshots in training | Strengthen the negative: `HUD, hotbar, hearts, XP bar, chat, crosshair, inventory, text, watermark` |
| Centre too busy for the panels | No composition instruction | Add "centre of the frame is calm and uncluttered, subject placed off-centre, negative space in the middle third" |
| Too dark to read the UI over | Shader pack look overshot | Add "ambient fill light, shadows lifted, nothing crushed to pure black"; or reduce the panel opacity in `mc.css` instead of re-rolling |
| Colours clash with the panel text | Background too saturated where text sits | Ask for "desaturated background, saturation concentrated in the light sources only" |
| Video: blocks breathe or crawl | Geometry not locked | Add "static geometry, blocks do not deform, locked-off camera, no parallax"; feed a still as first frame |
| Video: pixel textures shimmer | Temporal interpolation | Lower motion strength; animate only particles, water and light; keep the camera fully static |
| Aspect ratio wrong on ultrawide | Generated 16:9, displayed wider | Regenerate at 21:9, or leave it — `background-size: cover` crops from the centre, which the composition rule above already protects |

---

## After generating

- Export **JPEG, quality ~82, max 2560px wide**. These are full-bleed
  backgrounds; PNG will triple your page weight for no visible gain.
- Keep each file **under ~400 KB**. Nine of them at 1 MB each is a 9 MB site.
- Check every image with the panels on top before you commit — a background
  that is beautiful alone and illegible under a GUI panel is a bad background.
- Changing a filename? Change it in `src/minecraft/config.js` only. Nothing else
  references these paths.

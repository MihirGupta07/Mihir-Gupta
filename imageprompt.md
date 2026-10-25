# imageprompt.md — Art production brief for "The Twilight Archipelago"

This is the complete brief for every custom image the 3D portfolio at mihirgupta.dev can use.
The site already runs without any of these: each slot has a procedural fallback. Generate an asset, save it
at the path given, then set `ready: true` for it in `src/world/assets/manifest.js`. Nothing else changes.

Twelve images ship into the app (A01–A12). Five more (A13–A17) are concept references for the landmarks.
They are not loaded by the site. Use them to model or kitbash `.glb` files later; the 3D specs are in §4.
The share image, favicons and home-screen icons (B01–B06) are in §6.

---

## 1. World art direction (read first, applies to every prompt)

**Concept.** *The Twilight Archipelago.* Mihir's world is a chain of floating stone islands above an endless
sea of cloud, caught in the eleven minutes after sunset. The sun has just gone under the cloud horizon. The
sky climbs from an ember-rose horizon into indigo, and the first stars are coming out. The architecture is
pale limestone and dark bronze: ancient in form (plinths, stairs, spires, arches) but running modern
technology. Thin lines of warm light are inlaid in the stone. Light comes from the ground up, as if the
islands were thinking.

**Mood words.** Quiet, monumental, precise, warm against cool, lived-in. The world should feel built by a
careful engineer. It is not a dystopia and it is not neon.

**Quality references (for feel, never copy).** Journey (scale, silhouettes, warm sand light). Unreal Engine
5 environment showcases (atmospheric perspective, material realism). The calm side of Cyberpunk 2077 (thin
emissive inlays, holographic overlays).

**Master palette.**

| Role | Hex |
|---|---|
| Zenith sky | `#0B1030` |
| Upper sky / violet | `#2A1F4F` |
| Horizon ember rose | `#E0705A` |
| Horizon amber | `#F2A65A` |
| Sun glow, pale gold | `#FFD9A0` |
| Cloud sea lit tops | `#F4B892` |
| Cloud sea body (lavender) | `#8C7FA8` |
| Cloud shadow | `#3B3358` |
| Basalt rock | `#3A3A48` |
| Moss / sage | `#6F8A6A` |
| Limestone | `#D9D2C5` |
| Bronze | `#8C6A43` |
| Path light, warm gold (primary emissive) | `#FFCF7A` |

Each destination has its own signature light. Use it only for emissives and holograms there:
Tower `#FFC872` (dawn gold), Nexus `#6FE3D6` (cyan-teal), Citadel `#FF9A7A` (rose copper),
Observatory `#B9A6FF` (moonlight violet), Beacon `#CFE8FF` (white-blue).

**Global negative prompt** (append to every prompt):
`text, letters, watermark, signature, logo, UI, frame border, people, characters, creatures, dragons, ships,
cars, neon signs, cyberpunk city streets, purple-pink synthwave grid, lens flare overload, oversaturated,
HDR halos, chromatic aberration, blurry, low detail, jpeg artifacts, cartoon, anime, cel shading, toy-like,
low-poly unless requested, fantasy castle cliché, glowing mushrooms`

**Common failure modes to reject:** a visible sun disc above the horizon (it must have set), saturated
magenta skies, a cloud sea that reads as snow or ocean water, islands floating with no underside, generic
Disney castles, cyberpunk neon signage.

---

## 2. In-app assets (A01–A12)

### A01 — Twilight sky panorama
- **Filename / path:** `public/world/sky/twilight_sky_equirect.jpg`
- **Where:** Sky dome around the whole world (`src/world/scene/Sky.jsx`). Visible in every frame.
- **Purpose:** The single biggest mood setter. It replaces the procedural gradient and star shader.
- **Type:** Environment map (equirectangular, 2:1), mapped to the inside of a sphere.
- **Prompt:**
  > Equirectangular 360-degree sky panorama, twilight eleven minutes after sunset, viewed from high above
  > an endless sea of clouds. Lower 45% of the image is empty sky that fades into soft haze at the horizon
  > line (exact vertical centre). Horizon band: glowing ember rose (#E0705A) melting into amber (#F2A65A),
  > with a concentrated pale-gold afterglow (#FFD9A0) centred at longitude 0 where the sun has just set.
  > Above, a smooth gradient through dusky violet (#2A1F4F) to deep indigo (#0B1030) at the zenith. Thin
  > high cirrus streaks catch the last warm light near the afterglow. The upper third holds a sparse,
  > realistic starfield and a faint Milky Way band running diagonally. Photographic, physically plausible
  > atmospheric scattering, subtle noise, no ground, no clouds below horizon, no sun disc.
- **Art direction:** Photoreal astrophotography crossed with matte painting. Afterglow at the image's
  horizontal centre (u = 0.5). The camera faces "north" toward the Beacon, so the warm side frames the
  world's edge.
- **Aspect / resolution:** 2:1, **8192×4096** (min 4096×2048). Save as JPEG quality 85.
- **Transparency:** No. **Tiling:** Must wrap seamlessly at its left and right edges. No pole pinching.
- **Negative:** global + `ground, mountains, clouds below horizon, sun disc, moon close-up, aurora,
  planets, sci-fi nebula colours`
- **Variants:** Optional `twilight_sky_equirect_night.jpg`, the same sky 20 minutes later (afterglow 30%
  dimmer, more stars), for a future time-of-day toggle.
- **Integration:** Loaded with `THREE.TextureLoader`, `SRGBColorSpace`, `EquirectangularReflectionMapping`,
  and set on a back-sided sphere. Also usable as `scene.environment` for subtle reflections.

### A02 — Cloud sea (top-down, tiling)
- **Filename / path:** `public/world/clouds/cloud_sea_tile.jpg`
- **Where:** The huge horizontal plane under the islands (`CloudSea.jsx`), tiled about 6× and scrolled
  slowly.
- **Purpose:** Gives the world its floor and scale. It must read as cloud, not snow or ocean.
- **Type:** Seamless tiling texture (albedo with baked light).
- **Prompt:**
  > Seamless tileable top-down orthographic texture of a dense cumulus cloud sea at dusk, seen from directly
  > above. Soft billowing cloud tops lit by a low warm light from one side: peach highlights (#F4B892) on
  > the crowns, lavender body (#8C7FA8), deep violet shadow valleys (#3B3358). Even density across the
  > tile, no single dominant feature, fine wispy detail, volumetric softness. Photographic.
- **Art direction:** Light comes from the top edge of the texture (+V), matching the afterglow. Keep the
  contrast moderate; the shader adds fog and colour grading.
- **Aspect / resolution:** 1:1, **2048×2048**.
- **Transparency:** No. **Tiling:** Must tile seamlessly on both axes. Check it on a 3×3 grid.
- **Negative:** global + `ocean, water, waves, snow, ice, land, aircraft, visible tiling seams, sun
  reflections`
- **Variants:** Optional grayscale `cloud_sea_height.jpg` (cloud tops white) for parallax/displacement.
- **Integration:** `RepeatWrapping`, repeat (6,6), UV offset animated in the shader. It multiplies the
  procedural colour ramp, so warm/cool grading still follows the sky.

### A03 — Cloud puff sprite atlas
- **Filename / path:** `public/world/clouds/cloud_puffs_atlas.png`
- **Where:** Billboard cloud banks that drift between and below the islands (`Atmosphere.jsx`).
- **Purpose:** Volumetric-looking depth layers in the midground and foreground, the parallax that sells
  scale.
- **Type:** Alpha-transparent sprite atlas, 2×2 grid of four distinct cloud masses.
- **Prompt:**
  > Four isolated soft cumulus cloud masses arranged in a 2x2 grid on a pure transparent background, each
  > centred in its cell with generous empty margin. Dusk lighting from upper left: warm peach rim light
  > (#F4B892), lavender midtones (#8C7FA8), soft violet undersides (#3B3358). Wispy, feathered edges that
  > fade to full transparency, no hard outlines. Varied shapes: one wide flat bank, one tall tower, two
  > medium puffs. Photoreal volumetric clouds.
- **Aspect / resolution:** 1:1, **2048×2048** (each cell 1024²).
- **Transparency:** **Yes**, straight alpha PNG. Edges must fade to alpha 0 well before the cell border.
- **Tiling:** No. **Parallax:** Yes, used at three depths.
- **Negative:** global + `hard edges, cut-out outlines, background colour, sky, overlapping cells`
- **Integration:** Each sprite samples one cell via UV offset. Additive-free normal blending, `depthWrite:
  false`, fog-aware.

### A04 — Horizon mountain ring strip
- **Filename / path:** `public/world/horizon/mountain_ring_strip.png`
- **Where:** A cylinder at the world's edge (radius ~900 u) showing far mountain peaks that pierce the
  cloud sea (`Islands.jsx`).
- **Purpose:** The background layer. It gives distance and makes the world feel larger than its bounds.
- **Type:** Alpha-transparent horizontally tiling strip, mapped onto an open cylinder.
- **Prompt:**
  > Ultra-wide seamless panoramic strip of distant mountain peaks rising out of a sea of clouds at dusk,
  > extreme atmospheric perspective. Peaks are hazy silhouettes in desaturated violet-blue (#4A4470) fading
  > to lavender near their bases where they meet the cloud tops. Faint warm rim light on the right-facing
  > ridges. Varied rhythm: clusters of tall needle peaks, long low ridges, wide gaps. Transparent sky above
  > the peaks. Matte-painting quality.
- **Aspect / resolution:** 8:1, **8192×1024**.
- **Transparency:** **Yes**, sky area fully transparent. The bottom 15% is opaque lavender cloud haze.
- **Tiling:** Must tile seamlessly horizontally (left/right).
- **Negative:** global + `snow caps, trees, buildings, sharp detail, foreground rocks, sky colour in the
  alpha area`
- **Integration:** `RepeatWrapping` on U, repeat 2. `transparent: true`, `fog: true`, rendered before the
  islands.

### A05 — Far floating-island silhouettes atlas
- **Filename / path:** `public/world/horizon/far_islands_atlas.png`
- **Where:** Billboards 300–700 u away (`Islands.jsx`, far layer).
- **Purpose:** "Thousands of tiny lights suggest a world beyond the screen." Distant inhabited islands.
- **Type:** Alpha-transparent sprite atlas, 2×2.
- **Prompt:**
  > Four distant floating rock islands in a 2x2 grid on a transparent background, each an inverted
  > mountain shape with a flat top and a long tapering rocky underside, seen from slightly below the
  > horizon. Atmospheric haze makes them desaturated violet-grey (#5A5378). Each top holds tiny clusters
  > of warm golden window lights (#FFCF7A), one with a thin waterfall falling from its edge into the void,
  > one with a faint slender spire. Matte painting, very soft detail as if 5 km away.
- **Aspect / resolution:** 1:1, **2048×2048**.
- **Transparency:** **Yes**. **Tiling:** No. **Parallax:** Yes (far layer).
- **Negative:** global + `close-up detail, green grass, saturated colours, castles, ground plane`
- **Integration:** Sprite per cell, scale 40–120 u, slow vertical bob. The emissive lights get bloom.

### A06 — Basalt cliff rock (tiling, PBR set)
- **Filename / path:** `public/world/textures/rock_cliff_albedo.jpg`
  (+ `rock_cliff_normal.jpg`, `rock_cliff_roughness.jpg`)
- **Where:** The undersides and cliff faces of every island (`Islands.jsx`).
- **Purpose:** Material realism on the largest surfaces in the midground.
- **Type:** Seamless tiling texture mapped to geometry (triplanar-friendly).
- **Prompt (albedo):**
  > Seamless tileable texture of dark layered basalt cliff rock, vertical columnar fractures, fine strata
  > lines, slate grey with cool violet undertone (#3A3A48), subtle warm iron-oxide streaks, small patches
  > of pale lichen. Flat, even, shadowless lighting (albedo only). Photogrammetry quality.
- **Aspect / resolution:** 1:1, **2048×2048**.
- **Transparency:** No. **Tiling:** Seamless on both axes.
- **Negative:** global + `baked shadows, strong highlights, moss carpet, cracks that repeat visibly,
  perspective`
- **Variants:** Tangent-space normal map (OpenGL +Y) and grayscale roughness (mostly 0.8–0.95), same
  framing. If your generator cannot make these, derive them from the albedo (Materialize, or Substance
  Sampler "Image to Material").
- **Integration:** `MeshStandardMaterial({ map, normalMap, roughnessMap })`, `RepeatWrapping`, repeat ~4.
  Vertex colours still tint the tops warmer.

### A07 — Moss-covered stone tops (tiling)
- **Filename / path:** `public/world/textures/moss_stone_top.jpg`
- **Where:** The flat walkable top of each island.
- **Purpose:** Ground the player sees close up while exploring.
- **Type:** Seamless tiling texture mapped to geometry.
- **Prompt:**
  > Seamless tileable top-down texture of ancient pale limestone paving partially reclaimed by short
  > sage-green moss (#6F8A6A), irregular worn flagstones, fine grass tufts in the joints, tiny pale
  > flowers sparse. Shadowless, even albedo lighting. Photoreal, high detail.
- **Aspect / resolution:** 1:1, **2048×2048**. **Transparency:** No. **Tiling:** Both axes.
- **Negative:** global + `lawn, bright green, leaves, puddles, shadows, perspective, repeating pattern`
- **Variants:** Optional normal map `moss_stone_top_normal.jpg`.
- **Integration:** Top-cap material, repeat ~3 per island.

### A08 — Architecture trim sheet (+ emissive mask)
- **Filename / path:** `public/world/textures/architecture_trim.jpg`
  (+ `architecture_trim_emissive.jpg`)
- **Where:** Every landmark: Tower, Nexus, Citadel, Observatory, Beacon (`Landmarks.jsx`).
- **Purpose:** One cohesive material family that makes all buildings feel authored by the same hand.
- **Type:** Tiling trim sheet mapped to geometry. Horizontal bands, each band tiles on U.
- **Prompt (albedo):**
  > Architectural trim sheet texture, horizontal bands stacked vertically, each band seamlessly tileable
  > left-to-right: (1) smooth honed pale limestone (#D9D2C5), (2) limestone with fine engraved circuit-like
  > geometric channels, (3) dark oxidised bronze panel (#8C6A43) with rivets, (4) fluted stone column
  > profile, (5) narrow window strip of dark glass, (6) worn stone stair edge. Even shadowless lighting,
  > photoreal, precise engineering detail, timeless futuristic style.
- **Prompt (emissive mask):** the same layout in black, with only the engraved channels in band 2 and the
  window strip in band 5 painted in white.
- **Aspect / resolution:** 1:1, **2048×2048**. **Transparency:** No. **Tiling:** Horizontal only (per
  band).
- **Negative:** global + `gothic ornament, graffiti, rust holes, perspective, shadows, uneven band
  heights`
- **Integration:** `map` + `emissiveMap`. Emissive colour is set per landmark (signature hue), and its
  intensity is driven by the player's proximity.

### A09 — Waterfall flow (tiling, alpha)
- **Filename / path:** `public/world/fx/waterfall_flow.png`
- **Where:** Ribbons pouring off island edges into the clouds (`Atmosphere.jsx`).
- **Purpose:** Environmental life. Waterfalls are the world's signature motion.
- **Type:** Alpha-transparent, vertically tiling texture scrolled in a shader.
- **Prompt:**
  > Seamless vertically tileable texture of a thin falling waterfall sheet, long white-blue water streaks
  > and foam strands falling straight down, soft translucent edges fading to transparent at left and right,
  > dusk light giving a faint peach tint on the highlights. Isolated on a transparent background. Photoreal.
- **Aspect / resolution:** 1:4, **512×2048**.
- **Transparency:** **Yes**. **Tiling:** Seamless vertical (top/bottom).
- **Negative:** global + `rocks, background, rainbow, splash at bottom, horizontal seams`
- **Integration:** V offset scrolled at 0.6/s. It multiplies the existing alpha falloff so the base fades
  into the clouds.

### A10 — Hologram frame
- **Filename / path:** `public/world/ui/hologram_frame.png`
- **Where:** Around each project screenshot panel floating over the Nexus pedestals.
- **Purpose:** Gives every project display the same crafted holographic housing.
- **Type:** Alpha-transparent sprite (9-slice friendly).
- **Prompt:**
  > A thin elegant holographic display frame on a transparent background, 16:10 rectangle, hairline cyan-
  > white lines (#6FE3D6 to white), small precise corner brackets, a faint scanline texture inside the
  > border only, tiny tick marks along the bottom edge, soft outer glow. The centre is fully transparent.
  > Minimal, engineered, not gaudy.
- **Aspect / resolution:** 16:10, **1600×1000**. **Transparency:** **Yes** (centre must be alpha 0).
- **Negative:** global + `thick bezels, sci-fi HUD clutter, text, numbers, filled centre, heavy glow`
- **Integration:** Plane in front of the screenshot plane, additive blending, tinted per project colour.

### A11 — Project glyph atlas
- **Filename / path:** `public/world/ui/project_glyphs_atlas.png`
- **Where:** A small emblem hovering above each pedestal in the Nexus.
- **Purpose:** Gives each project a distinct visual identity readable from a distance.
- **Type:** Alpha-transparent sprite atlas, 4 columns × 3 rows (10 used, 2 spare), white line art (the app
  tints it).
- **Cell order (must match `PROJECTS` order in `src/data/constants.js`):**
  1 WiZ Sync: light bulb emitting sound waves · 2 Luce: microphone merged with a kanban card ·
  3 Beat Runner: running figure on a waveform · 4 GeoHide: map pin hidden behind a street corner ·
  5 calo: bowl with a leaf and a small chart · 6 Kairos: hourglass over a route line ·
  7 GitWizz: branching commit graph with a star · 8 Cashira: coin inside an offline cloud ·
  9 Wrapshare: rolled-up story card with a music note · 10 Qestra: three linked nodes under a shield.
- **Prompt:**
  > A 4 by 3 grid of minimal monoline icons, pure white 3px strokes on a fully transparent background,
  > each icon centred in its cell with wide margins, consistent stroke weight and visual size, geometric,
  > refined, like a premium design-system icon set. Icons in order: [list above].
- **Aspect / resolution:** 4:3, **2048×1536** (cells 512²). **Transparency:** **Yes**.
- **Negative:** global + `colour fills, gradients, 3D, emoji style, inconsistent stroke widths`
- **Integration:** UV cell lookup by project index, `color` = project hue, additive.

### A12 — Key art / loading image
- **Filename / path:** `public/world/keyart/loading_keyart.jpg`
- **Where:** The loading screen background, the hero when WebGL is unavailable, and the source for the new
  `public/og-image.png` (crop to 1200×630).
- **Purpose:** The first impression before the 3D world loads, and the social-share image.
- **Type:** Flat image.
- **Prompt:**
  > Cinematic wide establishing shot of a floating archipelago above an endless cloud sea at twilight just
  > after sunset. Foreground right: the edge of a moss-covered limestone island with a faintly glowing gold
  > path (#FFCF7A) leading away from the viewer. Midground: a monumental slender limestone tower with a
  > floating ring crown (warm gold windows), a circular open-air arena ringed with cyan holograms, a tiered
  > stepped citadel glowing rose-copper, a small domed observatory. Background centre: a lone lighthouse
  > on the farthest island emitting a pale white-blue beam toward the stars. Thin waterfalls fall from
  > island edges into the clouds. Sky: ember rose horizon to indigo zenith with first stars. Atmospheric
  > perspective, deep layered depth, Unreal Engine 5 cinematic quality, 35mm anamorphic, calm and
  > monumental. Negative space in the left 40% of the frame for typography.
- **Aspect / resolution:** 21:9, **3440×1440** (min 2560×1080).
- **Transparency:** No.
- **Negative:** global + `text, crowds, ships, dragons, neon city`
- **Variants:** A 9:16 mobile crop `loading_keyart_mobile.jpg` (1080×1920), lighthouse kept in the upper
  third.
- **Integration:** CSS `background-image` on the loader and on the no-WebGL hero. Export the OG crop
  manually to `public/og-image.png`.

---

## 3. Landmark concept references (A13–A17, not loaded by the app)

These are reference sheets for building or kitbashing real 3D models. Generate each as a **turnaround-
style concept sheet**: 16:9, **3840×2160**, neutral dark-violet background, no text. Save them to
`docs/concepts/` (not shipped). Every sheet shares the palette and material language from §1.

| ID | File | Prompt core |
|---|---|---|
| A13 | `docs/concepts/A13_developers_tower.jpg` | *A monumental slender limestone tower on a floating island, square base with stairs, tapering shaft with thin gold (#FFC872) emissive window bands spiralling upward, a detached bronze ring crown floating above the top with a soft light inside, a small balcony overlooking the void. Front, three-quarter and top views.* |
| A14 | `docs/concepts/A14_project_nexus.jpg` | *A circular open-air research arena on a floating island: a ring of ten stone pedestals around a sunken central dais, each pedestal projecting a vertical cyan (#6FE3D6) hologram screen, a thin bronze halo ring hovering over the whole arena, inlaid light channels converging at the centre.* |
| A15 | `docs/concepts/A15_career_citadel.jpg` | *A stepped vertical citadel of six stacked limestone tiers, each tier rotated slightly from the one below, each with a rose-copper (#FF9A7A) light band and a small landing; a spiral stair connects them; the top tier holds a lit plinth. Each tier is a chapter of a career.* |
| A16 | `docs/concepts/A16_research_observatory.jpg` | *A secluded domed observatory on a small high island, bronze dome with an open slit and a long telescope pointed at the stars, two thin parchment-like holographic sheets orbiting slowly, moonlight-violet (#B9A6FF) accent light, a narrow stair down to a bridge.* |
| A17 | `docs/concepts/A17_final_beacon.jpg` | *A lone lighthouse-transmission tower at the very edge of the archipelago, tall limestone shaft with bronze bands, a crystal lantern room emitting a rotating white-blue (#CFE8FF) beam and a vertical light pillar into the sky, cloud sea falling away behind it.* |

Negative for all: global + `fantasy castle, medieval, cyberpunk neon, clutter, characters`.

---

## 4. 3D model specifications (if you build models from A13–A17)

The app currently builds each landmark from procedural primitives in `src/world/scene/Landmarks.jsx`. To
swap in a modelled version, export **glTF binary** (`.glb`, Draco or Meshopt compressed, ≤1.5 MB each) to
`public/world/models/<name>.glb`, then replace the matching primitive group with drei's `useGLTF`. Keep the
group's position, and keep the `activation` uniform that drives emissive intensity.

Conventions: 1 unit = 1 m, Y-up, origin at the centre of the island top surface, pivot at ground.
Materials: at most 2 per model. Use the A08 trim sheet (`map` + `emissiveMap`), with emissive colour set at
runtime. No baked lighting is required. Lights are real-time plus bloom.

| Model | File | Footprint / height | Tri budget | Animation (done in code, keep these as separate named nodes) |
|---|---|---|---|---|
| Developer's Tower | `tower.glb` | 8 m square base, 34 m tall + crown ring Ø10 m at 38 m | 8k | `Crown` rotates Y 0.1 rad/s and bobs ±0.4 m |
| Project Nexus | `nexus.glb` | Ø30 m arena, pedestals 1.4 m tall at r=11 m | 10k | `Halo` rotates; pedestal holograms are separate planes created in code |
| Career Citadel | `citadel.glb` | 6 tiers, base 16 m → top 6 m, total 30 m | 8k | Tiers named `Tier0`..`Tier5`; each glows when its role is focused |
| Research Observatory | `observatory.glb` | Dome Ø9 m, telescope 7 m | 6k | `Telescope` slowly pans; `Dome` static |
| Final Beacon | `beacon.glb` | 5 m base, 42 m tall | 6k | `Lantern` node at top; the beam cone is added in code |

---

## 5. Integration checklist

1. Generate the asset at the stated resolution. Run it through `squoosh`/`cwebp`/`basisu` if you like:
   JPEG q85 or WebP for opaque images, PNG or WebP-alpha for transparent ones. KTX2/Basis is optional and
   recommended for A02, A06, A07, A08.
2. Save it to the exact path above (create folders under `public/world/`).
3. In `src/world/assets/manifest.js`, set that entry's `ready: true`.
4. Run `npm run dev` and check the area listed under **Where**.

### Placeholder inventory (what you see until each asset exists)

| ID | Placeholder currently in use |
|---|---|
| A01 | Gradient sky shader with procedural stars and afterglow |
| A02 | Animated fbm-noise cloud shader |
| A03 | Radial-gradient canvas sprites |
| A04 | Noise-height mountain ring mesh |
| A05 | Procedural low-poly far islands + point lights |
| A06/A07 | Vertex-coloured, flat-shaded rock and moss |
| A08 | Flat limestone/bronze materials with emissive bands |
| A09 | Streak shader |
| A10 | Emissive line frame |
| A11 | None (the project screenshot is shown alone) |
| A12 | CSS gradient |

**Priority order if you only generate a few:** A01 → A02 → A12 → A03 → A04 → A08 → the rest.

---

## 6. Brand and share images (B01–B06)

These images live outside the 3D world: the browser tab, the home screen, and link previews on WhatsApp,
Slack, LinkedIn and X. Today `public/favicon.png`, `public/apple-touch-icon.png` and `public/og-image.png`
are 200×200 placeholders, and `theme-color` is an off-brand green (`#1a7a3e`). Section 1's palette and
negative prompt apply here too, with the exceptions noted below.

**Text rule.** Image models still misspell names. Generate every image here **without text**, then set the
type yourself (Figma, Canva or Photopea). The site's typeface is **Pixelify Sans** (Google Fonts), weight
500–600, in limestone `#D9D2C5`, with gold `#FFCF7A` for accents.

**The mark.** Every icon uses one symbol, the **Ember Isle**: a small floating island seen at a slight
three-quarter angle. It has a flat top, a jagged rock underside tapering to a point, one tiny tower and a
single gold diamond ember hovering above. It repeats the ember trail people follow in the world, and it
still reads at 16 px. Don't use the Allay avatar as the brand mark: it's a Mojang character.

### B01 — Open Graph / share image
- **Filename / path:** `public/og-image.png` (already referenced by `og:image` and `twitter:image`)
- **Where:** Link previews on LinkedIn, X, Slack, WhatsApp, Discord and iMessage.
- **Type:** Flat image, textless plate plus a typography overlay you add.
- **Prompt (plate):**
  > Cinematic wide shot of a floating stone archipelago above an endless lavender cloud sea, eleven
  > minutes after sunset. The islands sit in the right 55% of the frame: a slender limestone tower with
  > a floating bronze ring crown and warm gold windows, a circular arena ringed by faint cyan holograms,
  > and a lone lighthouse on the farthest island sending a pale white-blue beam into the stars. A thin
  > line of small glowing gold diamond embers curves from the bottom-left foreground across a stone
  > bridge toward the tower. The left 45% is calm open sky: ember-rose horizon (#E0705A) fading to indigo
  > (#2A1F4F → #0B1030), with a few early stars and nothing else, kept clean for a headline. Atmospheric
  > perspective, Unreal Engine 5 cinematic quality, 35mm lens, crisp silhouettes, quiet and monumental.
- **Overlay (add after generating):** inside the left 45%, vertically centred, 64 px margin:
  `MIHIR GUPTA` (Pixelify Sans 600, 76 px, `#D9D2C5`, letter-spacing 0.04em), then `Software Engineer ·
  AI products` (Pixelify Sans 500, 30 px, `#FFCF7A`), then `mihirgupta.dev` (24 px, `#D9D2C5` at 70%).
- **Aspect / resolution:** **1200×630** (1.91:1). Generate at 2400×1260 and downscale.
- **Safe area:** WhatsApp and some Slack previews crop to a centred square. Keep the tower and the name
  inside the centre 630×630. Nothing important within 40 px of any edge.
- **Transparency:** No. Export PNG, or JPEG q88 if it's over 300 KB (keep it under 1 MB).
- **Negative:** global + `text, letters, people, ships, dragons, busy foreground, cropped islands at edges`
- **Variants:** `og-image-square.png` 1200×1200 (same scene with the islands centred, for platforms that
  prefer a square).

### B02 — Favicon master (the Ember Isle mark)
- **Filename / path:** `docs/brand/mark_master.png` (source only), exported to the B03–B05 files.
- **Type:** Flat icon illustration, transparent background.
- **Prompt:**
  > A single bold app-icon symbol: a small floating island in three-quarter view. A flat moss-green
  > (#6F8A6A) top, a jagged dark basalt (#3A3A48) rock underside tapering to a sharp point, one tiny
  > slender limestone tower on top, and one glowing warm-gold (#FFCF7A) diamond-shaped ember hovering
  > just above the tower. Chunky pixel-art style on a 32×32 grid with clean hard edges, a limited palette
  > (at most 6 colours), and a thick dark outline (#0B1030) so it reads at tiny sizes. Centred, filling
  > about 80% of the canvas, on a transparent background.
- **Aspect / resolution:** 1:1, **1024×1024** (upscale the 32×32 pixel grid with nearest-neighbour, never
  smoothing).
- **Transparency:** Yes.
- **Negative:** global + `text, letters, monogram, gradients, soft shading, thin lines, background scene,
  multiple islands, characters`
- **Check before exporting:** shrink it to 16×16. If the ember and the floating silhouette aren't both
  readable, simplify: drop the tower before you drop the ember.

### B03 — Favicon set
- **Filename / path:**
  - `public/favicon.ico`: 16, 32 and 48 px layers in one file (any converter).
  - `public/favicon.png`: 32×32.
  - `public/favicon.svg` (optional): a hand-traced vector of the mark. It stays crisp at any size.
- **Source:** B02, downscaled with **nearest-neighbour** (keeps the pixel art sharp).
- **Transparency:** Yes.
- **Integration:** in `index.html`, replace the current icon line with
  `<link rel="icon" href="/favicon.ico" sizes="48x48">` and `<link rel="icon" type="image/png" sizes="32x32"
  href="/favicon.png">` (plus `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` if you made it).

### B04 — Apple touch icon
- **Filename / path:** `public/apple-touch-icon.png`
- **Where:** iPhone and iPad home screens and Safari bookmarks.
- **Prompt:** none. Composite B02 onto an opaque background: a vertical gradient from `#2A1F4F` (top) to
  `#E0705A` (bottom 15%, a thin ember-horizon band). Scale the mark to about 70% of the canvas, centred.
- **Aspect / resolution:** **180×180**.
- **Transparency:** **No.** iOS fills transparent pixels with black. Don't round the corners; iOS does it.

### B05 — PWA / Android icons
- **Filename / path:**
  - `public/icons/icon-192.png`: 192×192, B04 style.
  - `public/icons/icon-512.png`: 512×512, B04 style.
  - `public/icons/icon-maskable-512.png`: 512×512, same background. The mark must sit inside the centre
    **80% circle** (409 px), because Android crops it to circles, squircles and teardrops.
- **Transparency:** No.
- **Integration:** in `public/manifest.json`, set:
  - `"background_color": "#0B1030"`
  - `"theme_color": "#0B1030"`
  - `icons`:
    `[{ "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" }, { "src":
    "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" }, { "src":
    "/icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }]`

  Also change `<meta name="theme-color">` in `index.html` to `#0B1030`.

### B06 — GitHub repo social preview and LinkedIn banner (optional)
- **Filename / path:** `docs/brand/github_social_1280x640.png` and `docs/brand/linkedin_banner_1584x396.png`
  (not shipped by the site).
- **Where:**
  - GitHub repo → Settings → Social preview.
  - LinkedIn profile → background photo.
- **Prompt:** reuse the B01 plate prompt. For LinkedIn, ask for an **ultra-wide 4:1 panorama**. Keep the
  islands in the **right 60%**: LinkedIn puts your profile photo over the bottom-left, and phones crop
  the sides.
- **Overlay:**
  - GitHub: the same type as B01, scaled to 1280×640.
  - LinkedIn: no name; it's already on the page. At most add `mihirgupta.dev` small in the bottom-right.
- **Transparency:** No.

### Brand checklist
1. Generate B01 and B02. Every other file in this section is derived from those two.
2. Export the sizes above, then run `npx @squoosh/cli --oxipng {}` (or TinyPNG) over the PNGs.
3. Make the `index.html` and `manifest.json` edits listed under B03 and B05.
4. After deploying, check previews with the LinkedIn Post Inspector
   (`linkedin.com/post-inspector`) and opengraph.xyz. LinkedIn caches old images; the inspector
   refreshes them.

**Priority order:** B01 → B02 → B04 → B03 → B05 → B06.

---
colors:
  twilight: "#090a18"
  twilight-deep: "#07081a"
  twilight-surface: "#11132a"
  parchment: "#ede6da"
  parchment-body: "rgba(237, 230, 218, 0.82)"
  muted: "#a8a0b8"
  faint: "#8a83a0"
  rule: "rgba(237, 230, 218, 0.12)"
  ember: "#ffcf7a"
  ember-hover: "#ffe0a6"
  ember-ink: "#1a1206"
  tower: "#FFC872"
  nexus: "#6FE3D6"
  citadel: "#FF9A7A"
  observatory: "#B9A6FF"
  beacon: "#CFE8FF"
  fog: "#6A5778"
typography:
  display:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "clamp(3.4rem, 8vw, 6rem)"
    fontWeight: 500
    lineHeight: 0.95
    letterSpacing: "0"
  headline:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "clamp(2.5rem, 4vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1
  title:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.55
  body-lg:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
  chip:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.3
  label:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.14em"
    textTransform: uppercase
  label-sm:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.12em"
    textTransform: uppercase
  data:
    fontFamily: "'Pixelify Sans', ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1.4
    fontVariantNumeric: tabular-nums
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "14px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.ember-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "0.85em 1.4em"
  button-primary-hover:
    backgroundColor: "{colors.ember-hover}"
    textColor: "{colors.ember-ink}"
    rounded: "{rounded.md}"
  button-text:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.parchment}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "10px 16px"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.parchment}"
    rounded: "{rounded.pill}"
    padding: "5px 12px"
  panel:
    backgroundColor: "{colors.twilight}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.none}"
    padding: "8px 32px 64px"
  overlay-card:
    backgroundColor: "{colors.twilight}"
    textColor: "{colors.parchment}"
    rounded: "{rounded.lg}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    typography: "{typography.label}"
---

# Design System: Twilight Archipelago

## 1. Overview

**Creative North Star: "The Observatory Ledger"**

The interface is an instrument room at dusk. The 3D world is the sky: fog-violet, star-lit, lit warmly from the islands below. The UI is the ledger kept open on the desk beside the telescope. Each panel is a record read by starlight. It is calm, exact, and written in a confident hand. Nothing in the chrome competes with the world or the work. One pixel face does everything: set large it is the voice, set small it carries the facts.

The system is made of tinted ink glass over a live scene. One warm accent is reserved for the moment of commitment. Each destination tints its own panel, so you always know which island you are reading. Components are warm and tactile: small radii, a soft ember lift on hover, and hairline rules instead of boxes. Precision, not minimalism. Every hairline and every letter-space is placed on purpose.

The system rejects three looks: the generic teal/purple SaaS portfolio (gradient text, glassy cards, particles everywhere), the over-animated showreel, and the dark-hacker terminal aesthetic. Twilight is not "dark mode". It is a time of day with a warm horizon.

**Key Characteristics:**
- A live 3D scene is the background. The UI floats over it as translucent ink.
- One family: Pixelify Sans at 400–600, upright only. Hierarchy comes from size, weight and case, never from a second face.
- Ember is the one global accent, and each destination brings its own place tint.
- Hairline rules and small radii. Borders do the work that boxes would.
- Motion is slow and settles; nothing bounces.

## 2. Colors

A dusk palette: deep blue-violet inks, warm parchment text, and one ember of gold. Each of the five places glows in its own hue.

### Primary
- **Ember** (`ember`): the lamp on the desk. Used for the primary call to action, the hero byline, and the default focus ring when no place tint is active. **Ember Hover** lifts it one step lighter. **Ember Ink** is the near-black brown used for text on Ember.

### Secondary (place tints)
Each destination sets `--c` on its panel and HUD prompt. The tint drives the panel's left border, the accent line, outline buttons, text selection, and focus.
- **Tower** (`tower`), About: lamplight amber.
- **Nexus** (`nexus`), Projects: sea-glass cyan.
- **Citadel** (`citadel`), Experience: kiln coral.
- **Observatory** (`observatory`), Research: lens violet.
- **Beacon** (`beacon`), Contact: signal ice-blue.

### Neutral
- **Twilight** (`twilight`): the ink behind every panel and overlay. **Twilight Deep** is the world's clear colour and the floor of the loader. **Twilight Surface** is the one raised ink step.
- **Parchment** (`parchment`): all primary text. Body copy sits at 82% (**Parchment Body**) so headings out-rank it without changing size.
- **Muted** (`muted`) for secondary text and idle nav. **Faint** (`faint`) for metadata and tertiary labels; it still clears AA on Twilight.
- **Rule** (`rule`): parchment at 12%. Every divider, chip border, and overlay edge.
- **Fog** (`fog`): the scene's atmospheric violet. It belongs to the world, never to UI fills.

### Named Rules
**The One Lamp Rule.** Ember appears at most once or twice per view: the primary action and the byline. If two Ember elements compete, one of them is wrong.

**The Place Owns Its Panel Rule.** Inside a panel, accent colour comes from the place tint (`--c`), never from Ember and never from another place. Tints are applied as hairlines, glows and `color-mix` washes of 18–45%, never as solid fills behind text.

## 3. Typography

**Font:** Pixelify Sans (fallback: ui-monospace, monospace)

One family is loaded, as a single variable file covering weights 400–600. No italic, no second family.

**Character:** A blocky, Minecraft-like pixel face, set with care. It makes the world read as a built place, made block by block, while keeping body copy readable at 1rem and above. The craft is in restraint: one face, three weights, generous line-height, and no letter-spacing tricks that collide pixel edges.

### Hierarchy
- **Display** (500, `clamp(3.4rem, 8vw, 6rem)`, line-height 0.95, no tracking): the hero name only. A soft twilight text-shadow lifts it off the scene.
- **Headline** (500, `clamp(2.5rem, 4vw, 3.5rem)`, line-height 1, balanced wrap): panel titles.
- **Title** (500, 1.5–2.2rem): project names, role titles, paper titles, stat values, tour and onboarding headings.
- **Body** (400, 1rem, line-height 1.7, Parchment Body): panel prose, capped at about 60ch by the panel width. The lead paragraph steps up to 1.125rem/1.55; lists run at 0.9375rem/1.6.
- **Label** (600, 0.75rem, 0.12–0.14em tracking, uppercase): nav, buttons, eyebrows, section heads, HUD prompts, world-label subtitles. Label Small (0.6875rem) is for the densest chrome.
- **Data** (400, 0.75rem, tabular numbers): dates, tour step numbers, level indices, key caps.

### Named Rules
**The One Face Rule.** Pixelify Sans at 400/500/600 is the whole type kit. A new weight, style or family needs a reason that size, weight and case cannot meet. Data gets `tabular-nums`, not a monospace.

**The Pixel Grid Rule.** Never slant, condense, or apply negative tracking to the pixel face; synthesized italics and tight tracking smear the grid. Emphasis is weight 600 or Ember, never italic.

## 4. Layout

The world fills the viewport. UI attaches to its edges and leaves the centre to the scene.

- **Panel:** docked right at `min(600px, 46vw)`. The camera's view offset shifts the world left by half the panel width, so the scene stays composed beside it. The head is padded 22px 32px 0 and the scroll area 8px 32px 64px.
- **HUD:** a top bar over a gradient scrim. The minimap sits bottom-left (176px). The interaction prompt is centred low.
- **Rhythm:** a 4/8px base. 16px between related items, 24px between groups, 32px panel gutters, 64px of tail space so the last line never sits on the edge.
- **Breakpoint:** at `max-width: 900px` the panel becomes a full-width bottom sheet at 70dvh with a top border. The HUD wraps, the nav scrolls horizontally, and the minimap is hidden.

### Named Rules
**The World Leads Rule.** No UI element may sit in the centre third of the viewport during exploration. The centre belongs to the scene. Panels, HUD and prompts live at the edges.

## 5. Elevation & Depth

Depth comes from the scene, translucency and blur, not from stacked card shadows.

- **Panel glass:** a vertical gradient from `rgba(10, 11, 27, 0.9)` to `rgba(9, 10, 24, 0.96)`, `backdrop-filter: blur(18px) saturate(1.15)`, and a broad left shadow of `-40px 0 80px rgba(3, 3, 10, 0.45)`, so it reads as a sheet laid over the sky.
- **Accent glow:** a 1px, 180px place-tint line at the panel's top-left edge, glowing at `0 0 18px var(--c)`. It is the only glow in the chrome.
- **Overlay cards** (tour, onboarding): Twilight at 88% with blur(14px), a rule border, radius `lg`, and a soft drop of `0 24px 60px -20px rgba(3, 3, 10, 0.7)`.
- **Ember lift:** the primary button rises 1px on hover and casts `0 10px 28px -12px` of Ember at 45%. Warm light, not a grey shadow.
- **World labels:** text-shadow `0 1px 12px rgba(5, 6, 15, 0.9)` and a 16px place-tint stem pointing at the landmark.

### Named Rules
**The Warm Light Rule.** Raised elements cast warm, tinted light (Ember or place tint), never neutral grey shadows. Grey shadows are only for sinking the panel into the scene.

## 6. Shapes

Small, deliberate radii: warm to the touch, never bubbly.

- `none` (0): the docked panel, text buttons, and the HUD bar. Anything that meets a viewport edge stays square.
- `sm` (4px): key caps and project thumbnails.
- `md` (8px): buttons, the HUD prompt, screenshots, and the portrait.
- `lg` (14px): floating overlay cards and the minimap.
- `pill`: tech chips. `circle`: HUD tool buttons (36px) and progress dots.
- Focus ring: 2px solid in the place tint (falling back to Ember), 3px offset, 2px radius.

### Named Rules
**The Edge Is Square Rule.** A surface that touches the viewport edge has square corners. Only free-floating objects get rounded.

## 7. Components

### Buttons
- **Primary (Ember):** Ember fill, Ember Ink label, radius `md`, padding 0.85em 1.4em (large: 1.1em 1.7em at 0.8125rem). On hover it shifts to Ember Hover, lifts 1px with the Ember glow, and its trailing arrow slides 4px right. On press it settles back to flat. Used for ENTER MY WORLD and the single main action in a view.
- **Text:** Muted label over a transparent bottom border. On hover the label turns Parchment and the border turns Rule. Used for SKIP INTRO and secondary dismissals.
- **Outline (place):** a 1px place-tint border, Parchment label, radius `md`, padding 10px 16px. On hover it gains an 18% tint wash and lifts 1px. Used for project links, résumé and source actions.

### Chips
- **Tech chip:** 500 at 0.8125rem, a 1px Rule border, pill radius, padding 5px 12px, no fill. A quiet list rather than a row of badges.

### Panel
- The docked ink-glass sheet described in Elevation. It contains a label eyebrow, a Headline title, a close control (label style), body content, and a pager. Its left border is the place tint at 28%.

### Navigation
- **Top nav:** label-style links in Muted, turning Parchment on hover. The active place takes its tint. On mobile it scrolls horizontally.
- **Minimap:** Twilight at 60%, a rule border, radius `lg`, with place-tinted dots.
- **HUD prompt:** Twilight at 72%, a place-tint border at 45%, radius `md`, and a tabular key cap.

### Overlay cards
- **Tour / Onboarding:** Twilight glass, radius `lg`, a 500 title (2–2.2rem), tabular step numbers, and Ember primary plus Text secondary actions. The tour carries a 2px place-tint top border.

### World labels
- A 500 name (1.25rem) over a label-small subtitle, floating above each landmark. They fade in with proximity and are hidden outside exploration.

## 8. Do's and Don'ts

### Do:
- **Do** let the scene breathe. Keep the centre of the viewport clear during exploration.
- **Do** tint each panel with its place colour through hairlines and washes.
- **Do** set dates, counts and keys with `tabular-nums`.
- **Do** use warm, tinted light for lift: Ember on primary buttons, the place tint on accents.
- **Do** honour reduced motion. Every rise and stagger collapses to an instant state.
- **Do** keep focus rings visible in the place tint at 2px.

### Don't:
- **Don't** use gradient text, particle overlays on UI, or glassy cards stacked on cards. That is the generic teal/purple SaaS portfolio this replaces.
- **Don't** bounce, spin or sparkle. Motion eases out on `cubic-bezier(0.22, 1, 0.36, 1)` and settles.
- **Don't** use green-on-black, terminal chrome, or monospace type. That is the dark-hacker look.
- **Don't** spend Ember on decoration, borders or secondary actions.
- **Don't** round surfaces that meet the viewport edge.
- **Don't** fill text backgrounds with a solid place tint. Tints stay below 45%, behind or beside the text.
- **Don't** invent stats, logos or testimonials to fill a layout. Empty space is information.

// Asset manifest for the world. Every custom image the experience can use lives here.
// Full generation prompts: /imageprompt.md (look up by id).
//
// To integrate a generated asset: drop the file at `path` (under /public) and flip `ready: true`.
// While `ready` is false the scene uses the procedural fallback named in `fallback`, so nothing 404s.
export const ASSETS = {
  skyPanorama: {
    id: 'A01', path: '/world/sky/twilight_sky_equirect.jpg', kind: 'environment-map',
    use: 'Sky dome texture (equirectangular)', fallback: 'gradient + star shader in Sky.jsx', ready: true,
  },
  cloudSea: {
    id: 'A02', path: '/world/clouds/cloud_sea_tile.jpg', kind: 'tiling-texture',
    use: 'Cloud sea plane below the islands', fallback: 'fbm noise shader in CloudSea.jsx', ready: true,
  },
  mountainStrip: {
    id: 'A04', path: '/world/horizon/mountain_ring_strip.png', kind: 'alpha-tiling-strip',
    use: 'Horizon mountain cylinder (wraps 360°)', fallback: 'noise-height ring geometry in Islands.jsx', ready: true,
  },
  farIslands: {
    id: 'A05', path: '/world/horizon/far_islands_atlas.png', kind: 'alpha-sprite-atlas',
    use: 'Far floating landmass billboards (2x2 atlas)', fallback: 'procedural low-poly far islands', ready: true,
  },
  rockCliff: {
    id: 'A06', path: '/world/textures/rock_cliff_albedo.jpg', kind: 'tiling-texture',
    use: 'Island underside / cliff faces', fallback: 'vertex-coloured flat-shaded rock', ready: true,
  },
  mossTop: {
    id: 'A07', path: '/world/textures/moss_stone_top.jpg', kind: 'tiling-texture',
    use: 'Island top surfaces', fallback: 'vertex colour', ready: true,
  },
  stoneTrim: {
    id: 'A08', path: '/world/textures/architecture_trim.jpg', kind: 'tiling-texture',
    variants: ['/world/textures/architecture_trim_emissive.jpg'],
    use: 'Landmark architecture surfaces + window bands', fallback: 'flat standard material + emissive bands', ready: true,
  },
  waterfall: {
    id: 'A09', path: '/world/fx/waterfall_flow.png', kind: 'alpha-tiling-texture',
    use: 'Scrolling waterfall ribbons off island edges', fallback: 'streak shader in Atmosphere.jsx', ready: true,
  },
  hologramFrame: {
    id: 'A10', path: '/world/ui/hologram_frame.png', kind: 'alpha-sprite',
    use: 'Frame around project screenshots in the Nexus', fallback: 'emissive line frame', ready: true,
  },
  projectGlyphs: {
    id: 'A11', path: '/world/ui/project_glyphs_atlas.png', kind: 'alpha-sprite-atlas',
    use: 'Per-project emblem above each Nexus pedestal (4x3 atlas, order = PROJECTS order)', fallback: 'none (screenshot only)', ready: true,
  },
  keyArt: {
    id: 'A12', path: '/world/keyart/loading_keyart.jpg', kind: 'flat-image',
    use: 'Loading screen + WebGL-fallback hero + og-image source', fallback: 'CSS gradient', ready: true,
  },
  // A13–A17 are concept references for landmark 3D models — not loaded by the app.
};

// Third-party 3D models (meshopt-compressed GLB). CC-BY ones are credited in CREDITS below and in the UI.
export const MODELS = {
  rocks: '/world/models/rocks.glb',
  towers: '/world/models/towers.glb', // tower body (Tower) + bulb pillar (Beacon)
  colosseum: '/world/models/colosseum.glb',
  tholos: '/world/models/tholos.glb', // diorama base, pond and trees stripped
  cypress: '/world/models/cypress.glb',
};

export const CREDITS = [
  { what: 'Mossy rocks', who: 'Poly Haven', license: 'CC0', url: 'https://polyhaven.com/a/rock_moss_set_01' },
  { what: 'Desert Fortress Towers', who: 'nkilstrup', license: 'CC BY 4.0', url: 'https://sketchfab.com/3d-models/368813c939494eb0b0d63fa634b03589' },
  { what: 'Colosseum', who: 'Alexander Leth', license: 'CC BY 4.0', url: 'https://sketchfab.com/3d-models/c3c5157559344c74b2c0bacc89036692' },
  { what: 'Greek Tholos', who: 'Nicole (nicolioos)', license: 'CC BY 4.0', url: 'https://sketchfab.com/3d-models/b4fbe06384ba439e93643fc8818e5da4' },
  { what: 'Cypress tree', who: 'ElectroNick', license: 'CC BY 4.0', url: 'https://sketchfab.com/3d-models/249d8cb553a8469e9d645713f8e96ed1' },
];

export const assetUrl = (key) => (ASSETS[key]?.ready ? ASSETS[key].path : null);

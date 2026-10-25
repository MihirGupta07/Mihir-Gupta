// World layout: where everything sits, and which portfolio content each place opens.
// All text content comes from src/data/constants.js — nothing here invents facts.
import { PROJECTS } from '@/data/constants';

// x/z on the ground plane (-z is "north", toward the Beacon), y = top surface height, r = walkable radius
export const ISLANDS = [
  { id: 'landing', x: 0, z: 0, y: 0, r: 15, seed: 1 },
  { id: 'tower', x: -44, z: -26, y: 4, r: 11, seed: 2 },
  { id: 'nexus', x: 38, z: -34, y: 1, r: 19, seed: 3 },
  { id: 'citadel', x: -32, z: -82, y: 2, r: 13, seed: 4 },
  { id: 'observatory', x: 44, z: -92, y: 9, r: 9, seed: 5 },
  { id: 'beacon', x: 4, z: -138, y: 3, r: 10, seed: 6 },
  { id: 'darkroom', x: -112, z: 18, y: 14, r: 5, seed: 7 }, // hidden; reward for wandering west
  // decorative islets
  { id: 'd1', x: 22, z: 22, y: -3, r: 5, seed: 11 },
  { id: 'd2', x: -24, z: 14, y: -5, r: 4, seed: 12 },
  { id: 'd3', x: 2, z: -60, y: -6, r: 6, seed: 13 },
  { id: 'd4', x: 80, z: -50, y: 6, r: 6, seed: 14 },
  { id: 'd5', x: -78, z: -52, y: -2, r: 5, seed: 15 },
  { id: 'd6', x: 70, z: -128, y: -4, r: 5, seed: 16 },
  { id: 'd7', x: -60, z: -124, y: 8, r: 4, seed: 17 },
];

export const islandById = Object.fromEntries(ISLANDS.map((i) => [i.id, i]));

export const BRIDGES = [
  ['landing', 'tower'], ['landing', 'nexus'], ['tower', 'citadel'],
  ['nexus', 'observatory'], ['citadel', 'beacon'], ['observatory', 'beacon'],
];

// Destinations: a place in the world → a panel of real content.
export const DESTINATIONS = [
  { id: 'home', section: 'Home', name: 'The Landing', island: 'landing', color: '#FFCF7A', blurb: 'Where it begins.' },
  { id: 'about', section: 'About', name: "The Developer's Tower", island: 'tower', color: '#FFC872', blurb: 'Story, philosophy, toolkit.' },
  { id: 'projects', section: 'Projects', name: 'The Project Nexus', island: 'nexus', color: '#6FE3D6', blurb: `${PROJECTS.length} things I built and shipped.` },
  { id: 'experience', section: 'Experience', name: 'The Career Citadel', island: 'citadel', color: '#FF9A7A', blurb: 'Every level, a chapter.' },
  { id: 'research', section: 'Research', name: 'The Research Observatory', island: 'observatory', color: '#B9A6FF', blurb: 'Published papers.' },
  { id: 'contact', section: 'Contact', name: 'The Final Beacon', island: 'beacon', color: '#CFE8FF', blurb: 'Send a signal.' },
];
export const destById = Object.fromEntries(DESTINATIONS.map((d) => [d.id, d]));

export const SECRET = { id: 'darkroom', name: 'The Darkroom', island: 'darkroom', color: '#F4B892' };

// One hue per project — art direction only.
const PROJECT_HUES = ['#7FD8FF', '#FFB86B', '#FF7FA8', '#9BE37F', '#FFD36B', '#C59BFF', '#6FE3D6', '#7FFFD0', '#FF9A7A', '#A8C7FF'];
const nexus = islandById.nexus;
export const PEDESTALS = PROJECTS.map((p, i) => {
  const a = (i / PROJECTS.length) * Math.PI * 2 + Math.PI / 2;
  return {
    project: p,
    slug: p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    color: PROJECT_HUES[i % PROJECT_HUES.length],
    x: nexus.x + Math.cos(a) * 12,
    z: nexus.z + Math.sin(a) * 12,
    angle: a,
  };
});
export const pedestalBySlug = Object.fromEntries(PEDESTALS.map((p) => [p.slug, p]));

// Where the player stops when travelling to a destination: on the near (landing-facing) edge.
export function approachPoint(islandId) {
  const i = islandById[islandId];
  const dx = -i.x, dz = -i.z;
  const len = Math.hypot(dx, dz) || 1;
  const k = islandId === 'landing' ? 0 : Math.min(i.r - 2, 7);
  return { x: i.x + (dx / len) * k, z: i.z + (dz / len) * k + (islandId === 'landing' ? 6 : 0) };
}

// Ground height under (x, z): island tops and bridge decks. null = open air (player keeps hovering).
export function groundAt(x, z) {
  let best = null;
  for (const i of ISLANDS) {
    if (Math.hypot(x - i.x, z - i.z) < i.r) best = Math.max(best ?? -Infinity, i.y);
  }
  for (const [a, b] of BRIDGES) {
    const A = islandById[a], B = islandById[b];
    const abx = B.x - A.x, abz = B.z - A.z;
    const t = Math.max(0, Math.min(1, ((x - A.x) * abx + (z - A.z) * abz) / (abx * abx + abz * abz)));
    const d = Math.hypot(x - (A.x + abx * t), z - (A.z + abz * t));
    if (d < 2.2) best = Math.max(best ?? -Infinity, A.y + (B.y - A.y) * t);
  }
  return best;
}

// Solid things the player slides around: [x, z, radius]
export const COLLIDERS = [
  [islandById.tower.x, islandById.tower.z, 5.5],
  [islandById.citadel.x, islandById.citadel.z, 7.5],
  [islandById.observatory.x, islandById.observatory.z, 4.6],
  [islandById.beacon.x, islandById.beacon.z, 3.4],
  [nexus.x, nexus.z, 3.2],
  ...PEDESTALS.map((p) => [p.x, p.z, 1.1]),
];

export const WORLD_RADIUS = 175;

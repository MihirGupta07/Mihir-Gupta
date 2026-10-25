// Navigation verbs shared by the scene, HUD, minimap and keyboard.
import * as THREE from 'three';
import { getState, setState, rig, markVisited } from './store';
import { destById, islandById, approachPoint, groundAt, pedestalBySlug, SECRET } from './data';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function travelToPoint(x, z, lookAt, onArrive) {
  if (getState().phase !== 'explore') return;
  const to = new THREE.Vector3(x, (groundAt(x, z) ?? rig.pos.y - 1.4) + 1.4, z);
  const dist = rig.pos.distanceTo(to);
  const yaw = lookAt ? Math.atan2(-(lookAt.x - x), -(lookAt.z - z)) : rig.yaw;
  if (reduced() || dist < 0.5) {
    rig.pos.copy(to);
    rig.yaw = yaw;
    rig.travel = null;
    onArrive?.();
    return;
  }
  rig.travel = { from: rig.pos.clone(), to, t: 0, dur: THREE.MathUtils.clamp(dist / 26, 1.1, 3.6), yaw0: rig.yaw, yaw1: yaw, onArrive };
}

export function travelTo(destId, open = true) {
  const d = destById[destId] ?? (destId === SECRET.id ? SECRET : null);
  if (!d) return;
  const i = islandById[d.island];
  const p = approachPoint(d.island);
  travelToPoint(p.x, p.z, i, () => {
    rig.pulse = 1;
    markVisited(destId);
    if (open && destId !== 'home') openPanel(destId);
  });
}

export function travelToProject(slug) {
  const p = pedestalBySlug[slug];
  if (!p) return;
  // stand just inside the ring, facing the pedestal
  const nx = islandById.nexus.x, nz = islandById.nexus.z;
  travelToPoint(nx + (p.x - nx) * 0.62, nz + (p.z - nz) * 0.62, p, () => {
    rig.pulse = 1;
    markVisited('projects');
    openPanel('projects', slug);
  });
}

// Panels mirror the URL hash so links, back button and crawlers all agree: #projects/geohide
export function openPanel(type, slug) {
  const hash = `#${type}${slug ? `/${slug}` : ''}`;
  if (location.hash !== hash) history.pushState(null, '', hash);
  setState({ panel: { type, slug } });
}

export function closePanel() {
  if (!getState().panel) return;
  history.pushState(null, '', location.pathname + location.search);
  setState({ panel: null });
}

export function panelFromHash() {
  const [type, slug] = location.hash.slice(1).split('/');
  const valid = ['about', 'projects', 'experience', 'research', 'contact', 'darkroom'];
  return valid.includes(type) ? { type, slug } : null;
}

// E / Enter / prompt button: open whatever place the player is standing at.
export function interact() {
  const n = getState().nearby;
  if (!n || getState().panel) return;
  if (n.kind === 'project') openPanel('projects', n.id);
  else if (n.id !== 'home') openPanel(n.id);
}

const TOUR = ['about', 'projects', 'experience', 'research', 'contact'];
export const TOUR_STOPS = TOUR;
export function tourGo(k) {
  if (k === null || k >= TOUR.length) return setState({ tourStep: null });
  setState({ tourStep: k, panel: null, onboarding: false });
  travelTo(TOUR[k], false);
}

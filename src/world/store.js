// Tiny global store. React state for UI (useWorld), plus a mutable `rig` read every frame by the scene.
import { useSyncExternalStore } from 'react';
import * as THREE from 'three';

let state = {
  phase: 'loading', // loading → intro → explore
  panel: null, // { type: 'about'|'projects'|'experience'|'research'|'contact'|'home'|'darkroom', slug? }
  nearby: null, // { kind: 'dest'|'project'|'secret', id, name, color }
  visited: [],
  tourStep: null,
  audio: false,
  onboarding: false,
  quality: 'high',
  focus: null, // experience id highlighted on the Citadel
};
const listeners = new Set();

export const getState = () => state;
export function setState(patch) {
  state = { ...state, ...(typeof patch === 'function' ? patch(state) : patch) };
  listeners.forEach((l) => l());
}
export function useWorld(selector = (s) => s) {
  return useSyncExternalStore(
    (l) => (listeners.add(l), () => listeners.delete(l)),
    () => selector(state),
  );
}

// Per-frame mutable state (never triggers React renders).
export const rig = {
  pos: new THREE.Vector3(0, 1.4, 6),
  yaw: 0, // camera orbit yaw around player (0 = looking toward -z)
  pitch: 0.32,
  distance: 13,
  travel: null, // { from, to, t, dur, onArrive }
  intro: 0, // 0..1 intro flight progress
  pulse: 0, // light pulse on arrival/discovery
  pathPulse: 0, // every bridge flares (landing stone easter egg)
};

export function markVisited(id) {
  if (!state.visited.includes(id)) setState({ visited: [...state.visited, id] });
}

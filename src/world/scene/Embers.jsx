import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BRIDGES, ISLANDS, islandById, destById } from '../data';
import { TOUR_STOPS } from '../actions';
import { rig, setState, useWorld } from '../store';

const MAX = 48;
const LINKED = new Set(BRIDGES.flat());

// Shortest bridge route between two islands (breadth-first over BRIDGES).
function route(from, to) {
  const prev = { [from]: null }, queue = [from];
  while (queue.length) {
    const cur = queue.shift();
    if (cur === to) break;
    for (const [a, b] of BRIDGES) {
      const next = a === cur ? b : b === cur ? a : null;
      if (next && !(next in prev)) { prev[next] = cur; queue.push(next); }
    }
  }
  const path = [];
  for (let k = to; k; k = prev[k]) path.unshift(k);
  return path[0] === from ? path : [];
}

// Embers every ~5 units along each bridge deck of the route, ending at the target's rim.
function trail(path) {
  const pts = [];
  for (let s = 0; s < path.length - 1; s++) {
    const A = islandById[path[s]], B = islandById[path[s + 1]];
    const dx = B.x - A.x, dz = B.z - A.z, L = Math.hypot(dx, dz);
    const t0 = (A.r - 2) / L, t1 = 1 - (B.r - 3) / L, n = Math.max(2, Math.round(((t1 - t0) * L) / 5));
    for (let k = s ? 1 : 0; k <= n; k++) {
      const t = t0 + ((t1 - t0) * k) / n;
      pts.push(new THREE.Vector3(A.x + dx * t, A.y + (B.y - A.y) * t + 1.3, A.z + dz * t));
    }
  }
  return pts.slice(0, MAX);
}

// The island the player is on (or nearest to), among those the bridges connect.
function nearestIsland() {
  let best = null, bd = Infinity;
  for (const i of ISLANDS) {
    if (!LINKED.has(i.id)) continue;
    const d = Math.hypot(rig.pos.x - i.x, rig.pos.z - i.z) - i.r;
    if (d < bd) { bd = d; best = i.id; }
  }
  return best;
}

// Collectible embers that lay a trail to the next undiscovered region.
export default function Embers() {
  const visited = useWorld((s) => s.visited);
  const phase = useWorld((s) => s.phase);
  const next = TOUR_STOPS.find((id) => !visited.includes(id)) ?? null;
  const mesh = useRef();
  const o = useMemo(() => new THREE.Object3D(), []);
  const geo = useMemo(() => new THREE.OctahedronGeometry(0.22, 0), []);
  const mat = useMemo(() => new THREE.MeshBasicMaterial({ color: new THREE.Color(3.2, 2.1, 0.9), toneMapped: false }), []);

  // a fresh trail each time the goal changes, starting wherever the player is standing
  const pts = useMemo(() => {
    if (!next || phase !== 'explore') return [];
    const from = nearestIsland(), to = destById[next].island;
    return from === to ? [] : trail(route(from, to));
  }, [next, phase]);
  const got = useMemo(() => ({ current: pts.map(() => 0) }), [pts]); // 0 = waiting, (0,1] = collect animation

  useFrame(({ clock }, dt) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.elapsedTime;
    m.count = pts.length;
    pts.forEach((p, i) => {
      const g = got.current[i] ?? 0;
      if (g === 0 && Math.hypot(rig.pos.x - p.x, rig.pos.z - p.z) < 1.8 && Math.abs(rig.pos.y - p.y) < 3) {
        got.current[i] = 1e-3;
        rig.pulse = Math.min(1, rig.pulse + 0.35);
        setState((s) => ({ embers: (s.embers ?? 0) + 1 }));
      }
      if (got.current[i] > 0) got.current[i] = Math.min(1, got.current[i] + dt * 3); // rise and shrink away
      const k = got.current[i] ?? 0;
      // the next few uncollected embers ripple in sequence so the trail reads as a direction
      const wave = 0.5 + 0.5 * Math.sin(t * 3 - i * 0.7);
      o.position.set(p.x, p.y + Math.sin(t * 1.6 + i) * 0.18 + k * 2.5, p.z);
      o.rotation.set(0, t * 1.5 + i, 0);
      o.scale.setScalar((1 - k) * (0.85 + wave * 0.45));
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
    });
    m.instanceMatrix.needsUpdate = true;
  });

  return <instancedMesh ref={mesh} args={[geo, mat, MAX]} frustumCulled={false} />;
}

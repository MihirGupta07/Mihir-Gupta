import { Suspense, useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useAnimations, useGLTF } from '@react-three/drei';
import { rig, getState, setState } from '../store';
import { interact } from '../actions';
import { MODELS } from '../assets/manifest';
import { groundAt, COLLIDERS, WORLD_RADIUS, PEDESTALS, ISLANDS, destById, SECRET } from '../data';

const damp = THREE.MathUtils.damp;
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const angleLerp = (a, b, t) => a + Math.atan2(Math.sin(b - a), Math.cos(b - a)) * t;
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Opening flight: out of the dark, down through the cloud layer, settling on the hero composition.
const INTRO_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(60, 90, 360), new THREE.Vector3(30, 34, 170), new THREE.Vector3(4, 14, 64), new THREE.Vector3(9, 6.5, 24),
]);
const INTRO_LOOK = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 30, 0), new THREE.Vector3(0, 10, -40), new THREE.Vector3(-4, 7, -60), new THREE.Vector3(-6, 7, -70),
]);
export const INTRO_SECONDS = 5;

function nearbyAt(x, z) {
  for (const p of PEDESTALS) {
    if (Math.hypot(x - p.x, z - p.z) < 4.2) return { kind: 'project', id: p.slug, name: p.project.title, color: p.color };
  }
  for (const i of ISLANDS) {
    if (Math.hypot(x - i.x, z - i.z) > i.r + 3) continue;
    const d = Object.values(destById).find((d) => d.island === i.id);
    if (d) return { kind: 'dest', id: d.id, name: d.name, color: d.color };
    if (i.id === SECRET.island) return { kind: 'secret', id: SECRET.id, name: SECRET.name, color: SECRET.color };
  }
  return null;
}

export default function Player() {
  const { camera, gl, size, scene } = useThree();
  const keys = useRef(new Set());
  const vel = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3(0, 6, -40));
  const introT = useRef(0);
  const introStart = useRef(null);
  const viewX = useRef(0);
  const wisp = useRef();
  const light = useRef();
  const heading = useRef(Math.PI);
  const lastPos = useRef(new THREE.Vector3());

  useEffect(() => {
    const el = gl.domElement;
    const pointers = new Map();
    let pinch = 0;
    const typing = (e) => /INPUT|TEXTAREA|SELECT/.test(e.target?.tagName);
    const down = (e) => { pointers.set(e.pointerId, [e.clientX, e.clientY]); };
    const move = (e) => {
      if (!pointers.has(e.pointerId)) return;
      const [px, py] = pointers.get(e.pointerId);
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      if (pointers.size === 2) {
        const [a, b] = [...pointers.values()];
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (pinch) rig.distance = THREE.MathUtils.clamp(rig.distance * (pinch / d), 4, 45);
        pinch = d;
        return;
      }
      if (getState().phase !== 'explore') return;
      rig.yaw -= (e.clientX - px) * 0.0052;
      rig.pitch = THREE.MathUtils.clamp(rig.pitch + (e.clientY - py) * 0.004, -0.08, 1.25);
    };
    const up = (e) => { pointers.delete(e.pointerId); if (pointers.size < 2) pinch = 0; };
    const wheel = (e) => { e.preventDefault(); rig.distance = THREE.MathUtils.clamp(rig.distance * (1 + e.deltaY * 0.0012), 4, 45); };
    const kd = (e) => {
      if (typing(e) || getState().phase !== 'explore') return;
      const k = e.key.toLowerCase();
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', 'shift'].includes(k) && !getState().panel) {
        keys.current.add(k);
        if (k.startsWith('arrow')) e.preventDefault();
        rig.travel = null; // taking control cancels any auto-travel
      }
      if (k === 'e' || (k === 'enter' && e.target === document.body)) interact();
    };
    const ku = (e) => keys.current.delete(e.key.toLowerCase());
    const blur = () => keys.current.clear();
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    window.addEventListener('pointercancel', up);
    el.addEventListener('wheel', wheel, { passive: false });
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    window.addEventListener('blur', blur);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('pointercancel', up);
      el.removeEventListener('wheel', wheel);
      window.removeEventListener('keydown', kd);
      window.removeEventListener('keyup', ku);
      window.removeEventListener('blur', blur);
    };
  }, [gl]);

  const tmp = useMemo(() => ({ off: new THREE.Vector3(), want: new THREE.Vector3(), tgt: new THREE.Vector3(), dir: new THREE.Vector3(), ray: new THREE.Raycaster() }), []);
  const solids = useRef({ list: [], at: -1 });

  useFrame(({ clock }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const { phase, panel } = getState();
    const t = clock.elapsedTime;

    // ---- intro flight
    if (phase !== 'explore') {
      // wall-clock driven so a throttled or janky tab never stalls the reveal
      if (phase === 'intro') {
        introStart.current ??= performance.now();
        introT.current = reduced() ? 1 : Math.min(1, (performance.now() - introStart.current) / 1000 / INTRO_SECONDS);
      }
      const e = ease(introT.current);
      rig.intro = e;
      camera.position.copy(INTRO_PATH.getPoint(e));
      if (e >= 1) camera.position.y += Math.sin(t * 0.4) * 0.15; // hero shot breathes
      look.current.copy(INTRO_LOOK.getPoint(e));
      camera.lookAt(look.current);
      return;
    }
    rig.intro = 1;

    // ---- movement
    const k = keys.current;
    const ix = (k.has('d') || k.has('arrowright') ? 1 : 0) - (k.has('a') || k.has('arrowleft') ? 1 : 0) + rig.stick.x;
    const iz = (k.has('s') || k.has('arrowdown') ? 1 : 0) - (k.has('w') || k.has('arrowup') ? 1 : 0) + rig.stick.y;
    const speed = k.has('shift') ? 22 : 11;
    const sy = Math.sin(rig.yaw), cy = Math.cos(rig.yaw);
    const wantX = (ix * cy + iz * sy) * speed, wantZ = (-ix * sy + iz * cy) * speed;
    const len = Math.max(1, Math.hypot(ix, iz)); // caps diagonals; a half-pushed stick walks at half speed
    vel.current.x = damp(vel.current.x, wantX / len, 6, dt);
    vel.current.z = damp(vel.current.z, wantZ / len, 6, dt);

    const p = rig.pos;
    if (rig.travel) {
      const tr = rig.travel;
      tr.t = Math.min(1, tr.t + Math.min(rawDt, 0.25) / tr.dur);
      const e = ease(tr.t);
      p.lerpVectors(tr.from, tr.to, e);
      p.y += Math.sin(Math.PI * e) * Math.min(9, tr.from.distanceTo(tr.to) * 0.12);
      rig.yaw = angleLerp(tr.yaw0, tr.yaw1, ease(Math.min(1, tr.t * 1.3)));
      if (tr.t >= 1) { rig.travel = null; tr.onArrive?.(); }
    } else {
      p.x += vel.current.x * dt;
      p.z += vel.current.z * dt;
      for (const [cx, cz, r] of COLLIDERS) {
        const dx = p.x - cx, dz = p.z - cz, d = Math.hypot(dx, dz), min = r + 0.7;
        if (d < min && d > 0.0001) { p.x = cx + (dx / d) * min; p.z = cz + (dz / d) * min; }
      }
      const r = Math.hypot(p.x + 10, p.z + 60);
      if (r > WORLD_RADIUS) { p.x = -10 + ((p.x + 10) / r) * WORLD_RADIUS; p.z = -60 + ((p.z + 60) / r) * WORLD_RADIUS; }
      const g = groundAt(p.x, p.z);
      // over open air the wisp keeps its altitude; it never drops into the clouds
      p.y = damp(p.y, g !== null ? g + 1.4 : Math.max(p.y, -12), 5, dt);
    }

    rig.pulse = Math.max(0, rig.pulse - dt * 0.8);

    // ---- avatar
    if (wisp.current) {
      wisp.current.position.set(p.x, p.y + Math.sin(t * 2) * 0.12, p.z);
      // face the way it's moving; when still, keep the last heading
      const mx = rig.travel ? p.x - lastPos.current.x : vel.current.x, mz = rig.travel ? p.z - lastPos.current.z : vel.current.z;
      if (Math.hypot(mx, mz) > (rig.travel ? 1e-3 : 0.5)) heading.current = Math.atan2(mx, mz);
      wisp.current.rotation.y = angleLerp(wisp.current.rotation.y, heading.current, Math.min(1, dt * 8));
    }
    lastPos.current.copy(p);
    rig.moving = rig.travel !== null || Math.hypot(vel.current.x, vel.current.z) > 0.5;
    if (light.current) light.current.intensity = 14 + rig.pulse * 40;

    // ---- proximity
    const n = nearbyAt(p.x, p.z);
    const cur = getState().nearby;
    if ((n?.id ?? null) !== (cur?.id ?? null)) setState({ nearby: n });

    // ---- camera
    const { off, want, tgt, dir, ray } = tmp;
    tgt.set(p.x, p.y + 1.6, p.z);
    const dist = panel ? Math.max(rig.distance, 16) : rig.distance;
    off.set(sy * Math.cos(rig.pitch), Math.sin(rig.pitch), cy * Math.cos(rig.pitch)).multiplyScalar(dist);
    want.copy(tgt).add(off);
    const floor = groundAt(want.x, want.z);
    want.y = Math.max(want.y, (floor ?? -22) + 0.8);

    // keep the camera out of rocks, trees and buildings: stop it in front of the first opaque surface
    // between the player and the camera, or the view fills with the inside of a mesh (reads as a black frame)
    if (t - solids.current.at > 1) {
      solids.current.at = t;
      solids.current.list = [];
      scene.traverse((o) => {
        if (!o.isMesh || !o.visible) return;
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        if (ms.some((m) => !m.transparent)) solids.current.list.push(o); // faded colosseum walls are transparent: skipped
      });
    }
    camera.position.x = damp(camera.position.x, want.x, 4, dt);
    camera.position.y = damp(camera.position.y, want.y, 4, dt);
    camera.position.z = damp(camera.position.z, want.z, 4, dt);
    // test the eased position, not the goal: easing toward the goal can cut a chord through a landmark
    dir.subVectors(camera.position, tgt);
    const reach = dir.length();
    ray.set(tgt, dir.divideScalar(reach));
    ray.near = 0.3; ray.far = reach + 0.5;
    const hit = ray.intersectObjects(solids.current.list, false)[0];
    if (hit) camera.position.copy(tgt).addScaledVector(dir, Math.max(0.6, hit.distance - 0.5));
    look.current.x = damp(look.current.x, tgt.x, 6, dt);
    look.current.y = damp(look.current.y, tgt.y + (panel ? 3 : 0), 6, dt);
    look.current.z = damp(look.current.z, tgt.z, 6, dt);
    camera.lookAt(look.current);

    // ---- when a panel is open on desktop, shift the projection so the world stays visible beside it
    const wantOffset = panel && size.width > 900 ? Math.min(600, size.width * 0.46) / 2 : 0;
    viewX.current = damp(viewX.current, wantOffset, 5, dt);
    if (viewX.current > 0.5) camera.setViewOffset(size.width, size.height, viewX.current, 0, size.width, size.height);
    else if (camera.view?.enabled) camera.clearViewOffset();
  });

  return (
    <group ref={wisp}>
      <Suspense fallback={null}><Allay /></Suspense>
      <pointLight ref={light} color="#A8E4FF" distance={14} decay={1.6} position-y={2.6} />
    </group>
  );
}


// Allay (redesigned) by Master Galanodel, CC BY 4.0. Pixel-art texture, so sample it unfiltered.
function Allay() {
  const { scene, animations } = useGLTF(MODELS.allay);
  const { actions } = useAnimations(animations, scene);
  const playing = useRef(null);
  useMemo(() => scene.traverse((o) => {
    if (!o.isMesh) return;
    const m = o.material;
    if (m.map) { m.map.magFilter = THREE.NearestFilter; m.map.minFilter = THREE.NearestFilter; m.map.needsUpdate = true; }
    m.emissive = new THREE.Color('#9FDcff'); m.emissiveMap = m.map; m.emissiveIntensity = 0.18; // allays glow, faintly
  }), [scene]);
  useFrame(() => {
    const name = rig.moving ? 'animation.master_galanodels_allay.fly' : 'animation.master_galanodels_allay.idle';
    if (playing.current === name) return;
    actions[playing.current]?.fadeOut(0.3);
    actions[name]?.reset().fadeIn(0.3).play();
    playing.current = name;
  });
  return <primitive object={scene} scale={1.6} position-y={-0.75} />;
}

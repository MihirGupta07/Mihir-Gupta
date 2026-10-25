import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { EXPERIENCE, RESEARCH, PERSONAL_INFO } from '@/data/constants';
import { islandById, destById, PEDESTALS, SECRET } from '../data';
import { rig, getState, useWorld } from '../store';
import { travelTo, travelToProject } from '../actions';
import { assetUrl, MODELS } from '../assets/manifest';

const srgb = (hex) => new THREE.Color().setStyle(hex, THREE.SRGBColorSpace);
const smooth = THREE.MathUtils.smoothstep;
const damp = THREE.MathUtils.damp;

// Shared architecture materials (A08 trim sheet slots in here when ready).
let shared;
function mats() {
  if (shared) return shared;
  const stone = new THREE.MeshStandardMaterial({ color: srgb('#D9D2C5'), roughness: 0.78, metalness: 0, flatShading: true });
  const url = assetUrl('stoneTrim');
  if (url) stone.map = new THREE.TextureLoader().load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; });
  // window bands + engraved circuit glow ember; the mask is black everywhere else
  if (url) {
    stone.emissiveMap = new THREE.TextureLoader().load(url.replace('.jpg', '_emissive.jpg'), (t) => { t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; });
    stone.emissive = new THREE.Color('#fff'); stone.emissiveIntensity = 0.3;
  }
  shared = {
    stone,
    dark: new THREE.MeshStandardMaterial({ color: srgb('#2B2A36'), roughness: 0.6, metalness: 0.2, flatShading: true }),
    bronze: new THREE.MeshStandardMaterial({ color: srgb('#8C6A43'), roughness: 0.38, metalness: 0.75 }),
  };
  return shared;
}
const glowMat = (hex, i = 1.5) => new THREE.MeshStandardMaterial({ color: '#000', emissive: srgb(hex), emissiveIntensity: i, toneMapped: false });
const distTo = (x, z) => Math.hypot(rig.pos.x - x, rig.pos.z - z);
// 1 when the player is within `near`, 0 beyond `far`
const proximity = (x, z, near, far) => 1 - smooth(distTo(x, z), near, far);

// Third-party GLB (optionally only the meshes whose names contain one of `pick`),
// sat on y=0, centred in x/z and scaled to `height`.
function Model({ url, pick, height, ...props }) {
  const { scene } = useGLTF(url);
  const key = pick?.join();
  const obj = useMemo(() => {
    const root = new THREE.Group();
    scene.updateMatrixWorld(true);
    scene.traverse((c) => {
      if (!c.isMesh || (pick && !pick.some((p) => c.name.includes(p)))) return;
      const m = c.clone();
      c.matrixWorld.decompose(m.position, m.quaternion, m.scale);
      m.castShadow = m.receiveShadow = true;
      root.add(m);
    });
    const box = new THREE.Box3().setFromObject(root), c = box.getCenter(new THREE.Vector3());
    root.position.set(-c.x, -box.min.y, -c.z);
    const g = new THREE.Group();
    g.add(root);
    g.scale.setScalar(height / (box.max.y - box.min.y));
    return g;
  }, [scene, key, height]); // eslint-disable-line react-hooks/exhaustive-deps
  return <primitive object={obj} {...props} />;
}

const clickable = (fn) => ({
  onClick: (e) => { if (e.delta > 6) return; e.stopPropagation(); fn(); },
  onPointerOver: (e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; },
  onPointerOut: () => { document.body.style.cursor = ''; },
});

// Floating world label, also a real focusable button (keyboard + screen readers).
function Label({ position, text, sub, color, onSelect, near = 30, far = 110 }) {
  const ref = useRef();
  const wp = useMemo(() => new THREE.Vector3(...position), [position]);
  useFrame(({ camera }) => {
    if (!ref.current) return;
    const d = camera.position.distanceTo(wp);
    const o = getState().phase !== 'explore' || getState().panel ? 0 : 1 - smooth(d, near, far);
    ref.current.style.opacity = o.toFixed(3);
    ref.current.style.pointerEvents = o > 0.15 ? 'auto' : 'none';
    ref.current.tabIndex = o > 0.15 ? 0 : -1;
  });
  return (
    <Html position={position} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
      <button ref={ref} className="world-label" style={{ '--c': color, opacity: 0 }} onClick={onSelect}>
        <span className="world-label__name">{text}</span>
        {sub && <span className="world-label__sub">{sub}</span>}
      </button>
    </Html>
  );
}

// Proximity-driven glow + light shared by every landmark.
function useLandmark(dest, { near = 14, far = 55, base = 0.9, boost = 2.6 } = {}) {
  const i = islandById[dest.island];
  const glow = useMemo(() => glowMat(dest.color, base), [dest.color, base]);
  const light = useRef();
  const act = useRef(0);
  useFrame((_, dt) => {
    act.current = damp(act.current, proximity(i.x, i.z, near, far), 2.5, dt);
    const pulse = getState().nearby?.id === dest.id ? rig.pulse : 0;
    glow.emissiveIntensity = (base + act.current * boost + pulse * 3) * Math.min(1, rig.intro * 1.5);
    if (light.current) light.current.intensity = (12 + act.current * 45 + pulse * 90) * Math.min(1, rig.intro * 1.5);
  });
  return { i, glow, light, act };
}

function Tower() {
  const dest = destById.about;
  const { i, glow, light } = useLandmark(dest);
  const m = mats();
  const crown = useRef();
  const face = Math.atan2(-i.x, -i.z);
  useFrame(({ clock }) => {
    if (!crown.current) return;
    crown.current.rotation.y = clock.elapsedTime * 0.12;
    crown.current.position.y = 37 + Math.sin(clock.elapsedTime * 0.6) * 0.4;
  });
  const segs = [3.8, 3.3, 2.8, 2.3, 1.8];
  return (
    <group position={[i.x, i.y, i.z]} rotation-y={face} {...clickable(() => travelTo('about'))}>
      <mesh material={m.stone} position-y={0.6} castShadow receiveShadow><boxGeometry args={[10, 1.2, 10]} /></mesh>
      {[0, 1, 2].map((s) => (
        <mesh key={s} material={m.stone} position={[0, 0.2 + s * 0.2 - 0.4, 5.4 + s * 0.7]} castShadow><boxGeometry args={[4, 0.4, 0.8]} /></mesh>
      ))}
      {MODELS.towers ? <Model url={MODELS.towers} pick={['Tower_Medium_01_0']} height={34} position-y={1.2} /> : segs.map((r, k) => (
        <group key={k} position-y={1.2 + k * 6 + 3}>
          <mesh material={m.stone} rotation-y={Math.PI / 4} castShadow receiveShadow>
            <cylinderGeometry args={[segs[k + 1] ?? r * 0.8, r, 6, 4]} />
          </mesh>
          <mesh material={glow} position-y={-2.95} rotation-y={Math.PI / 4}><cylinderGeometry args={[r * 1.03, r * 1.03, 0.14, 4]} /></mesh>
          {[0, 1, 2, 3].map((f) => (
            <mesh key={f} material={glow} rotation-y={(f * Math.PI) / 2} position={[Math.sin((f * Math.PI) / 2) * r * 0.62, 0, Math.cos((f * Math.PI) / 2) * r * 0.62]}>
              <boxGeometry args={[0.12, 3.6, 0.12]} />
            </mesh>
          ))}
        </group>
      ))}
      <group ref={crown} position-y={37}>
        <mesh material={m.bronze} rotation-x={Math.PI / 2}><torusGeometry args={[4.6, 0.25, 8, 64]} /></mesh>
        <mesh material={glow} rotation-x={Math.PI / 2}><torusGeometry args={[4.1, 0.06, 6, 64]} /></mesh>
        <mesh material={glow}><icosahedronGeometry args={[0.9, 1]} /></mesh>
      </group>
      <pointLight ref={light} color={dest.color} position-y={33} distance={60} decay={1.6} />
      <Label position={[0, 42, 0]} text={dest.name} sub="About" color={dest.color} onSelect={() => travelTo('about')} />
    </group>
  );
}

// A10 frame + A11 glyph atlas (4x3 cells in PROJECTS order), loaded once for all pedestals.
let nexusTex;
function nexusTextures() {
  if (nexusTex) return nexusTex;
  const load = (key) => { const u = assetUrl(key); return u && new THREE.TextureLoader().load(u, (t) => (t.colorSpace = THREE.SRGBColorSpace)); };
  nexusTex = { frame: load('hologramFrame'), glyphs: load('projectGlyphs') };
  return nexusTex;
}
const holoMat = (map, color) => new THREE.MeshBasicMaterial({ map, color: srgb(color), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, toneMapped: false, side: THREE.DoubleSide });

function Pedestal({ p, k, texture }) {
  const holo = useRef();
  const glow = useMemo(() => glowMat(p.color, 1), [p.color]);
  const screen = useMemo(() => new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: 0.5, toneMapped: false, side: THREE.DoubleSide }), [texture]);
  const beam = useMemo(() => new THREE.MeshBasicMaterial({ color: srgb(p.color), transparent: true, opacity: 0.08, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }), [p.color]);
  const frame = useMemo(() => new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.6, 2.25)), []);
  const { frameMat, glyphMat } = useMemo(() => {
    const t = nexusTextures();
    let glyph = null;
    if (t.glyphs && k < 12) {
      glyph = t.glyphs.clone();
      glyph.repeat.set(1 / 4, 1 / 3);
      glyph.offset.set((k % 4) / 4, 1 - (Math.floor(k / 4) + 1) / 3);
    }
    return { frameMat: t.frame && holoMat(t.frame, p.color), glyphMat: glyph && holoMat(glyph, p.color) };
  }, [p.color, k]);
  const act = useRef(0);
  const m = mats();
  const n = islandById.nexus;
  const face = Math.atan2(n.x - p.x, n.z - p.z);
  const sub = p.project.technologies.slice(0, 3).join(' · ');
  useFrame(({ clock }, dt) => {
    act.current = damp(act.current, proximity(p.x, p.z, 3.5, 13), 3, dt);
    const a = act.current;
    if (holo.current) {
      holo.current.position.y = 3.4 + a * 0.7 + Math.sin(clock.elapsedTime * 0.8 + p.angle) * 0.08;
      holo.current.scale.setScalar(0.82 + a * 0.18);
    }
    screen.opacity = 0.35 + a * 0.65;
    glow.emissiveIntensity = (0.8 + a * 3) * Math.min(1, rig.intro * 1.5);
    beam.opacity = 0.05 + a * 0.12;
  });
  const open = () => travelToProject(p.slug);
  return (
    <group position={[p.x, islandById.nexus.y, p.z]} rotation-y={face} {...clickable(open)}>
      <mesh material={m.stone} position-y={0.7} castShadow><cylinderGeometry args={[0.7, 0.9, 1.4, 6]} /></mesh>
      <mesh material={glow} position-y={1.42}><cylinderGeometry args={[0.72, 0.72, 0.05, 6]} /></mesh>
      <mesh material={beam} position-y={2.4}><cylinderGeometry args={[0.15, 0.7, 2, 12, 1, true]} /></mesh>
      <group ref={holo} position-y={3.4}>
        <mesh material={screen}><planeGeometry args={[3.4, 2.1]} /></mesh>
        {frameMat
          ? <mesh material={frameMat} position-z={0.01}><planeGeometry args={[3.9, 2.44]} /></mesh>
          : <lineSegments geometry={frame}><lineBasicMaterial color={srgb(p.color)} toneMapped={false} /></lineSegments>}
        {glyphMat && <mesh material={glyphMat} position-y={1.75}><planeGeometry args={[0.8, 0.8]} /></mesh>}
      </group>
      <Label position={[0, glyphMat ? 6.3 : 5.6, 0]} text={p.project.title} sub={sub} color={p.color} onSelect={open} near={9} far={26} />
    </group>
  );
}

const tmpV = new THREE.Vector3();

function Nexus() {
  const dest = destById.projects;
  const { i, glow, light } = useLandmark(dest, { near: 20, far: 70 });
  const m = mats();
  const textures = useTexture(PEDESTALS.map((p) => p.project.image));
  textures.forEach((t) => (t.colorSpace = THREE.SRGBColorSpace));
  const halo = useRef(), core = useRef();
  const walls = Object.values(useGLTF(MODELS.colosseum).materials)[0];
  useFrame(({ clock, camera }, dt) => {
    const t = clock.elapsedTime;
    if (walls) {
      // the follow camera sits in the wall band while you're inside the arena: ghost the walls
      const inside = distTo(i.x, i.z) < i.r && Math.hypot(camera.position.x - i.x, camera.position.z - i.z) > 13;
      walls.transparent = true;
      walls.opacity = damp(walls.opacity, inside ? 0.12 : 1, 4, dt);
      walls.depthWrite = walls.opacity > 0.9;
    }
    if (halo.current) halo.current.rotation.z = t * 0.05;
    if (core.current) {
      core.current.rotation.y = t * 0.3; core.current.rotation.x = t * 0.17; core.current.position.y = 4 + Math.sin(t * 0.7) * 0.3;
      // the follow camera can swing through the core on the pedestal ring; don't fill the frame with it
      core.current.visible = camera.position.distanceTo(core.current.getWorldPosition(tmpV)) > 4;
    }
  });
  return (
    <group>
      <group position={[i.x, i.y, i.z]}>
        <mesh material={m.stone} position-y={0.2} receiveShadow><cylinderGeometry args={[17, 17.4, 0.4, 48]} /></mesh>
        <mesh material={m.bronze} position-y={0.45}><cylinderGeometry args={[5, 5, 0.3, 40]} /></mesh>
        {MODELS.colosseum && <Model url={MODELS.colosseum} pick={['Walls', 'Arch']} height={12} />}
        <mesh material={m.dark} position-y={0.7} {...clickable(() => travelTo('projects'))}><cylinderGeometry args={[3, 3.2, 0.5, 32]} /></mesh>
        <mesh material={glow} position-y={0.96} rotation-x={-Math.PI / 2}><ringGeometry args={[2.6, 2.8, 48]} /></mesh>
        {PEDESTALS.map((p) => (
          <mesh key={p.slug} material={glow} position={[(p.x - i.x) * 0.58, 0.42, (p.z - i.z) * 0.58]} rotation-y={-p.angle}>
            <boxGeometry args={[12 * 0.66, 0.04, 0.08]} />
          </mesh>
        ))}
        <mesh ref={core} material={glow} position-y={4} {...clickable(() => travelTo('projects'))}>
          <icosahedronGeometry args={[1.1, 0]} />
        </mesh>
        <group ref={halo} position-y={14} rotation-x={Math.PI / 2}>
          <mesh material={m.bronze}><torusGeometry args={[15, 0.22, 8, 96]} /></mesh>
          <mesh material={glow}><torusGeometry args={[14.4, 0.05, 6, 96]} /></mesh>
        </group>
        <pointLight ref={light} color={dest.color} position-y={6} distance={50} decay={1.5} />
        <Label position={[0, 17, 0]} text={dest.name} sub="Projects" color={dest.color} onSelect={() => travelTo('projects')} far={150} />
      </group>
      {PEDESTALS.map((p, k) => <Pedestal key={p.slug} p={p} k={k} texture={textures[k]} />)}
    </group>
  );
}

function Citadel() {
  const dest = destById.experience;
  const { i, light } = useLandmark(dest);
  const m = mats();
  const n = EXPERIENCE.length;
  // base tier = earliest role, top tier = current role
  const tierGlows = useMemo(() => EXPERIENCE.map(() => glowMat(dest.color, 1)), [dest.color]);
  const roles = useMemo(() => [...EXPERIENCE].reverse(), []);
  useFrame(() => {
    const focus = getState().focus;
    const near = proximity(i.x, i.z, 14, 55);
    roles.forEach((r, k) => {
      const target = (0.7 + near * 1.6 + (focus === r.id ? 5 : 0)) * Math.min(1, rig.intro * 1.5);
      tierGlows[k].emissiveIntensity += (target - tierGlows[k].emissiveIntensity) * 0.08;
    });
  });
  const steps = useMemo(() => {
    const mesh = new THREE.InstancedMesh(new THREE.BoxGeometry(1.4, 0.25, 0.7), mats().stone, 48);
    const o = new THREE.Object3D();
    for (let k = 0; k < 48; k++) {
      const a = k * 0.42, r = 9.5 - (k / 48) * 4.5;
      o.position.set(Math.cos(a) * r, k * (n * 4.4) / 48, Math.sin(a) * r);
      o.rotation.y = -a;
      o.updateMatrix();
      mesh.setMatrixAt(k, o.matrix);
    }
    mesh.castShadow = true;
    return mesh;
  }, [n]);
  return (
    <group position={[i.x, i.y, i.z]} {...clickable(() => travelTo('experience'))}>
      {roles.map((r, k) => {
        const s = 15 - k * 1.8;
        return (
          <group key={r.id} position-y={k * 4.4 + 2.1} rotation-y={k * 0.22}>
            <mesh material={m.stone} castShadow receiveShadow><boxGeometry args={[s, 4.2, s]} /></mesh>
            <mesh material={tierGlows[k]} position-y={1.9}><boxGeometry args={[s + 0.25, 0.18, s + 0.25]} /></mesh>
            <mesh material={m.dark} position-y={-0.2}><boxGeometry args={[s + 0.06, 1.2, s * 0.5]} /></mesh>
          </group>
        );
      })}
      <primitive object={steps} />
      <mesh material={tierGlows[n - 1]} position-y={n * 4.4 + 1.2}><octahedronGeometry args={[1.1, 0]} /></mesh>
      <pointLight ref={light} color={dest.color} position-y={n * 4.4 + 3} distance={55} decay={1.6} />
      <Label position={[0, n * 4.4 + 6, 0]} text={dest.name} sub="Experience" color={dest.color} onSelect={() => travelTo('experience')} />
    </group>
  );
}

function Observatory() {
  const dest = destById.research;
  const { i, glow, light } = useLandmark(dest, { near: 12, far: 50 });
  const m = mats();
  const papers = useRef(), scope = useRef();
  const paperMat = useMemo(() => new THREE.MeshStandardMaterial({ color: srgb('#E8E2F5'), emissive: srgb('#B9A6FF'), emissiveIntensity: 0.5, transparent: true, opacity: 0.85, side: THREE.DoubleSide, toneMapped: false }), []);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (papers.current) papers.current.rotation.y = t * 0.15;
    if (scope.current) scope.current.rotation.y = Math.sin(t * 0.1) * 0.5;
  });
  return (
    <group position={[i.x, i.y, i.z]}>
      {MODELS.tholos ? <Model url={MODELS.tholos} height={10} {...clickable(() => travelTo('research'))} /> : <group {...clickable(() => travelTo('research'))}>
        <mesh material={m.stone} position-y={1.75} castShadow receiveShadow><cylinderGeometry args={[4, 4.4, 3.5, 24]} /></mesh>
        <mesh material={m.bronze} position-y={3.5} castShadow><sphereGeometry args={[4.2, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} /></mesh>
        <mesh material={glow} position-y={3.5} rotation-z={0.0}><torusGeometry args={[4.22, 0.06, 6, 48, Math.PI]} /></mesh>
        <group ref={scope} position-y={6}>
          <mesh material={m.bronze} rotation-x={-0.7} position={[0, 1.5, -1.5]}><cylinderGeometry args={[0.45, 0.65, 7, 16]} /></mesh>
          <mesh material={glow} rotation-x={-0.7} position={[0, 4.1, -3.7]}><torusGeometry args={[0.5, 0.06, 6, 24]} /></mesh>
        </group>
      </group>}
      <group ref={papers} position-y={7}>
        {RESEARCH.map((r, k) => {
          const a = (k / RESEARCH.length) * Math.PI * 2;
          return (
            <group key={r.id} position={[Math.cos(a) * 7, k * 1.2, Math.sin(a) * 7]} rotation-y={-a + Math.PI / 2} {...clickable(() => { travelTo('research'); })}>
              <mesh material={paperMat}><planeGeometry args={[1.7, 2.3]} /></mesh>
              {[0.6, 0.3, 0, -0.3, -0.6].map((y) => (
                <mesh key={y} material={glow} position={[0, y, 0.01]}><planeGeometry args={[1.2, 0.05]} /></mesh>
              ))}
            </group>
          );
        })}
      </group>
      <pointLight ref={light} color={dest.color} position-y={9} distance={40} decay={1.6} />
      <Label position={[0, 14, 0]} text={dest.name} sub="Research" color={dest.color} onSelect={() => travelTo('research')} />
    </group>
  );
}

const beamMaterial = (hex) => new THREE.ShaderMaterial({
  transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
  uniforms: { uColor: { value: srgb(hex) }, uStrength: { value: 0.5 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
  fragmentShader: 'uniform vec3 uColor; uniform float uStrength; varying vec2 vUv; void main(){ float a = pow(max(vUv.y, 0.0), 2.2) * uStrength; gl_FragColor = vec4(uColor * a, a); }',
});

function Beacon() {
  const dest = destById.contact;
  const { i, glow, light, act } = useLandmark(dest, { near: 14, far: 70, base: 2, boost: 3 });
  const m = mats();
  const beamRef = useRef();
  const visited = useWorld((s) => s.visited.length);
  const beam = useMemo(() => beamMaterial(dest.color), [dest.color]);
  const pillar = useMemo(() => beamMaterial(dest.color), [dest.color]);
  useFrame(({ clock }) => {
    if (beamRef.current) beamRef.current.rotation.y = clock.elapsedTime * 0.35;
    const all = visited >= 5 ? 1 : 0; // every region discovered: the beacon flares
    beam.uniforms.uStrength.value = (0.35 + act.current * 0.3 + all * 0.4) * Math.min(1, rig.intro * 1.5);
    pillar.uniforms.uStrength.value = (0.12 + all * 0.35) * Math.min(1, rig.intro * 1.5);
  });
  return (
    <group position={[i.x, i.y, i.z]} {...clickable(() => travelTo('contact'))}>
      <mesh material={m.stone} position-y={1} castShadow receiveShadow><cylinderGeometry args={[3.4, 3.8, 2, 20]} /></mesh>
      {MODELS.towers ? <Model url={MODELS.towers} pick={['Pillar_Bulb']} height={30.2} position-y={2} /> : <>
        <mesh material={m.stone} position-y={17} castShadow><cylinderGeometry args={[1.5, 2.4, 30, 20]} /></mesh>
        {[8, 18, 28].map((y) => <mesh key={y} material={m.bronze} position-y={y}><cylinderGeometry args={[2.5 - y * 0.03, 2.5 - y * 0.03, 0.5, 20]} /></mesh>)}
      </>}
      <mesh material={m.bronze} position-y={32.2}><cylinderGeometry args={[2.4, 2.4, 0.3, 24]} /></mesh>
      <mesh material={glow} position-y={33.6}><cylinderGeometry args={[1.25, 1.25, 2.4, 16]} /></mesh>
      <mesh material={m.bronze} position-y={35.6}><coneGeometry args={[1.8, 1.8, 16]} /></mesh>
      <group ref={beamRef} position-y={33.6}>
        {[0, Math.PI].map((r) => (
          <mesh key={r} material={beam} rotation={[0, r, Math.PI / 2]} position-x={r ? -40 : 40}>
            <cylinderGeometry args={[0.6, 7, 80, 24, 1, true]} />
          </mesh>
        ))}
      </group>
      <mesh material={pillar} position-y={240}><cylinderGeometry args={[0.6, 0.6, 420, 12, 1, true]} /></mesh>
      <pointLight ref={light} color={dest.color} position-y={33} distance={70} decay={1.4} />
      <Label position={[0, 40, 0]} text={dest.name} sub="Contact" color={dest.color} onSelect={() => travelTo('contact')} far={180} />
    </group>
  );
}

// The Landing: name stone, lamps, compass inlay. Clicking the stone lights every path (a small surprise).
function Landing() {
  const i = islandById.landing;
  const m = mats();
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 2048; c.height = 1024;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  useEffect(() => {
    const draw = () => {
      const g = tex.image.getContext('2d');
      g.clearRect(0, 0, 2048, 1024);
      g.fillStyle = '#FFDDA0';
      g.textAlign = 'left';
      g.font = '500 92px "Pixelify Sans", monospace';
      g.fillText('SOFTWARE ENGINEER · BUILDER', 120, 230);
      g.font = '600 300px "Pixelify Sans", monospace';
      g.fillText(PERSONAL_INFO.name.split(' ')[0], 110, 560);
      g.fillText(PERSONAL_INFO.name.split(' ').slice(1).join(' '), 110, 860);
      g.fillRect(120, 285, 520, 4);
      tex.needsUpdate = true;
    };
    draw();
    document.fonts?.ready.then(draw);
  }, [tex]);
  const lamps = useMemo(() => Array.from({ length: 7 }, (_, k) => {
    const a = Math.PI * 0.15 + (k / 6) * Math.PI * 0.7 + Math.PI;
    return [Math.cos(a) * 12, Math.sin(a) * -12];
  }), []);
  const lampGlow = useMemo(() => glowMat('#FFCF7A', 3), []);
  const inlay = useMemo(() => glowMat('#FFCF7A', 1.2), []);
  useFrame(() => { inlay.emissiveIntensity = (1.2 + rig.pathPulse * 4) * Math.min(1, rig.intro * 1.5); });
  return (
    <group position={[i.x, i.y, i.z]}>
      <group position={[-6.5, 0, -4]} rotation-y={0.35} {...clickable(() => { rig.pathPulse = 1; })}>
        <mesh material={m.dark} position-y={2.6} castShadow receiveShadow><boxGeometry args={[8.4, 5.2, 0.9]} /></mesh>
        <mesh position={[0, 2.6, 0.46]}>
          <planeGeometry args={[7.8, 3.9]} />
          <meshBasicMaterial map={tex} transparent toneMapped={false} color={new THREE.Color(1.6, 1.4, 1.1)} />
        </mesh>
        <mesh material={m.stone} position-y={0.15}><boxGeometry args={[9.4, 0.3, 1.8]} /></mesh>
      </group>
      <mesh material={inlay} position-y={0.03} rotation-x={-Math.PI / 2}><ringGeometry args={[4.2, 4.35, 64]} /></mesh>
      <mesh material={inlay} position-y={0.03} rotation-x={-Math.PI / 2}><ringGeometry args={[2.2, 2.26, 64]} /></mesh>
      {[0, 1, 2, 3].map((k) => (
        <mesh key={k} material={inlay} position-y={0.03} rotation={[-Math.PI / 2, 0, (k * Math.PI) / 4]}><planeGeometry args={[8.6, 0.05]} /></mesh>
      ))}
      {lamps.map(([x, z], k) => (
        <group key={k} position={[x, 0, z]}>
          <mesh material={m.bronze} position-y={1.3}><cylinderGeometry args={[0.07, 0.1, 2.6, 6]} /></mesh>
          <mesh material={lampGlow} position-y={2.75}><sphereGeometry args={[0.16, 12, 8]} /></mesh>
        </group>
      ))}
    </group>
  );
}

function Darkroom() {
  const i = islandById.darkroom;
  const m = mats();
  const glow = useMemo(() => glowMat(SECRET.color, 2), []);
  const open = () => travelTo('darkroom');
  return (
    <group position={[i.x, i.y, i.z]} {...clickable(open)}>
      {[-1.6, 1.6].map((x) => <mesh key={x} material={m.stone} position={[x, 2, 0]} castShadow><boxGeometry args={[0.7, 4, 0.7]} /></mesh>)}
      <mesh material={m.stone} position-y={4.3}><boxGeometry args={[4.4, 0.6, 0.9]} /></mesh>
      <mesh material={glow} position-y={2.2}><planeGeometry args={[2.3, 3.2]} /></mesh>
      <pointLight color={SECRET.color} intensity={40} distance={20} position={[0, 3, 2]} />
      <Label position={[0, 6, 0]} text={SECRET.name} sub="Undiscovered" color={SECRET.color} onSelect={open} near={14} far={40} />
    </group>
  );
}

export default function Landmarks() {
  return (
    <>
      <Landing />
      <Tower />
      <Nexus />
      <Citadel />
      <Observatory />
      <Beacon />
      <Darkroom />
    </>
  );
}

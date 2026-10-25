import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ISLANDS, islandById, WORLD_RADIUS } from '../data';
import { rig } from '../store';
import { NOISE } from './glsl';
import { seeded } from './islandGeometry';
import { assetUrl } from '../assets/manifest';

const srgb = (hex) => new THREE.Color().setStyle(hex, THREE.SRGBColorSpace);
const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Warm dust motes in a box that follows the player, so the air always feels alive nearby.
function Motes({ count }) {
  const { points, mat } = useMemo(() => {
    const rnd = seeded(5);
    const p = new Float32Array(count * 3), s = new Float32Array(count);
    for (let i = 0; i < count; i++) { p[i * 3] = rnd() * 90; p[i * 3 + 1] = rnd() * 30; p[i * 3 + 2] = rnd() * 90; s[i] = rnd(); }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(p, 3));
    g.setAttribute('seed', new THREE.BufferAttribute(s, 1));
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      uniforms: { uTime: { value: 0 }, uCenter: { value: new THREE.Vector3() }, uPx: { value: 1 } },
      vertexShader: /* glsl */ `
        attribute float seed; uniform float uTime, uPx; uniform vec3 uCenter; varying float vA;
        void main(){
          vec3 box = vec3(90.0, 30.0, 90.0);
          vec3 p = position + vec3(sin(uTime * 0.2 + seed * 30.0), uTime * (0.15 + seed * 0.2), cos(uTime * 0.17 + seed * 20.0)) * 1.5;
          p = mod(p - uCenter + box * 0.5, box) - box * 0.5 + uCenter;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (1.5 + seed * 2.5) * uPx * (40.0 / -mv.z);
          vA = (0.4 + 0.6 * sin(uTime * (0.8 + seed) + seed * 50.0)) * smoothstep(45.0, 10.0, length(p - uCenter));
        }`,
      fragmentShader: /* glsl */ `
        varying float vA;
        void main(){ float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d) * vA; gl_FragColor = vec4(vec3(1.0, 0.82, 0.55) * a * 1.4, a); }`,
    });
    return { points: new THREE.Points(g, mat), mat };
  }, [count]);
  useFrame(({ gl }, dt) => {
    if (!reduced()) mat.uniforms.uTime.value += dt;
    mat.uniforms.uCenter.value.copy(rig.pos);
    mat.uniforms.uPx.value = gl.getPixelRatio();
  });
  points.frustumCulled = false;
  return <primitive object={points} />;
}

// One lumpy cumulus about 2.4 wide: overlapping noise-bumped spheres with a flattened base,
// light baked into vertex colours (cool shadowed base, warm sunset rim on tops and the -z sun side).
function cloudGeometry(seed) {
  const rnd = seeded(seed);
  const n = 11 + Math.floor(rnd() * 5), parts = [];
  for (let k = 0; k < n; k++) {
    // a broad low base row plus smaller puffs heaped on top toward the middle
    const t = rnd() - 0.5, top = k > n * 0.55, r = (top ? 0.22 : 0.3) + (0.5 - Math.abs(t)) * 0.35 + rnd() * 0.1;
    parts.push(new THREE.IcosahedronGeometry(r, 2).translate(t * (top ? 1.1 : 1.9), (top ? 0.35 : 0.05) + r * 0.3, (rnd() - 0.5) * 0.7));
  }
  const g = mergeGeometries(parts);
  const pos = g.attributes.position, nrm = g.attributes.normal, v = new THREE.Vector3();
  const col = new Float32Array(pos.count * 3), c = new THREE.Color();
  const under = srgb('#5C4E73'), body = srgb('#B3A1BE'), lit = srgb('#FFD2B0');
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    v.multiplyScalar(1 + 0.08 * Math.sin(v.x * 13.1 + seed) * Math.sin(v.y * 11.3) * Math.sin(v.z * 12.7 + seed * 2)
      + 0.05 * Math.sin(v.x * 29 + v.z * 23 + seed));
    if (v.y < 0) { v.y *= 0.25; nrm.setXYZ(i, 0, -1, 0); }
    pos.setXYZ(i, v.x, v.y, v.z);
    c.copy(under).lerp(body, THREE.MathUtils.smoothstep(v.y, -0.05, 0.5))
      .lerp(lit, Math.max(0, nrm.getY(i)) * 0.45 + Math.max(0, -nrm.getZ(i)) * 0.35);
    c.toArray(col, i * 3);
  }
  g.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return g;
}

// 3D cloud banks rising out of the cloud sea. Near the play area their tops stay under y ≈ -15,
// below the lowest the camera goes, so the view never ends up inside one; far banks rise a little
// higher along the horizon but stay under the islands so they never wall off the view.
function CloudBanks({ count }) {
  const meshes = useMemo(() => {
    const rnd = seeded(21);
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true, emissive: srgb('#2A2238') });
    const meshes = [1, 2, 3, 4].map((seed) => {
      const m = new THREE.InstancedMesh(cloudGeometry(seed), mat, count);
      m.userData.clouds = [];
      m.frustumCulled = false; // instances drift; the geometry's own bounds don't cover them
      return m;
    });
    for (let i = 0; i < count; i++) {
      const a = rnd() * Math.PI * 2, d = 20 + Math.pow(rnd(), 0.8) * 420;
      const x = Math.cos(a) * d, z = Math.sin(a) * d - 60;
      const far = Math.hypot(x + 10, z + 60) > WORLD_RADIUS + 40;
      const s = (far ? 40 + rnd() * 90 : 14 + rnd() * 40) / 2.4, y = -27 + rnd() * 2;
      const sy = Math.min(s * 0.6, ((far ? -6 : -15) - y) / 0.9);
      meshes[i % 4].userData.clouds.push({ x, y, z, s, sy, ry: rnd() * 6, v: 0.6 + rnd() * 1.4 });
    }
    for (const m of meshes) m.count = m.userData.clouds.length;
    return meshes;
  }, [count]);

  const o = useMemo(() => new THREE.Object3D(), []);
  useFrame(({ clock }) => {
    const t = reduced() ? 0 : clock.elapsedTime;
    for (const m of meshes) {
      m.userData.clouds.forEach((c, k) => {
        o.position.set((((c.x + t * c.v + 500) % 1000) + 1000) % 1000 - 500, c.y, c.z);
        o.rotation.set(0, c.ry, 0);
        o.scale.set(c.s, c.sy, c.s * 0.8);
        o.updateMatrix();
        m.setMatrixAt(k, o.matrix);
      });
      m.instanceMatrix.needsUpdate = true;
    }
  });
  return meshes.map((m, k) => <primitive key={k} object={m} />);
}

const FALLS = [['landing', 2.4, 3], ['tower', 0.6, 3.5], ['nexus', 2.2, 4.5], ['nexus', -0.7, 2.6], ['citadel', 3.8, 3.2], ['observatory', 0.3, 2.4], ['d4', 1.2, 2], ['d7', 4, 1.6]];

// A falling water column in the island's local frame (+x away from the centre): a flat lip on the rim
// that arcs outward, then rounds out and widens as it drops into the cloud sea.
function fallGeometry(r, top, width) {
  const ALONG = 28, AROUND = 14, pos = [], uv = [], idx = [];
  for (let i = 0; i <= ALONG; i++) {
    const t = i / ALONG;
    const out = r * 0.97 + 2.2 * Math.sqrt(Math.min(1, t * 6)) + t * 2.5;
    const a = (width / 2) * (1 + t * 0.9), b = (width / 2) * (0.12 + Math.min(1, t * 4) * 0.45) * (1 + t);
    for (let j = 0; j <= AROUND; j++) {
      const th = (j / AROUND) * Math.PI * 2;
      pos.push(out + Math.cos(th) * b, top - 0.35 - t * (top + 30), Math.sin(th) * a);
      uv.push(j / AROUND, 1 - t);
    }
  }
  for (let i = 0; i < ALONG; i++) for (let j = 0; j < AROUND; j++) {
    const k = i * (AROUND + 1) + j;
    idx.push(k, k + AROUND + 1, k + 1, k + 1, k + AROUND + 1, k + AROUND + 2);
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

// Waterfalls pouring off island rims into the clouds, each with a mist cloud where it lands.
function Waterfalls() {
  const { mat, falls, mist } = useMemo(() => {
    const url = assetUrl('waterfall');
    const map = url ? new THREE.TextureLoader().load(url, (t) => { t.wrapS = t.wrapT = THREE.RepeatWrapping; }) : null;
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.DoubleSide,
      uniforms: { uTime: { value: 0 }, uMap: { value: map }, uHasMap: { value: map ? 1 : 0 } },
      vertexShader: /* glsl */ `
        varying vec2 vUv; varying float vFacing;
        void main(){
          vUv = uv;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vFacing = abs(dot(normalize(normalMatrix * normal), normalize(-mv.xyz)));
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uTime, uHasMap; uniform sampler2D uMap; varying vec2 vUv; varying float vFacing;
        ${NOISE}
        void main(){
          float u = vUv.x * 3.0; // the streak pattern wraps the column three times
          float streak = vnoise(vec2(u * 7.0, vUv.y * 9.0 + uTime * 1.6)) * 0.6 + vnoise(vec2(u * 20.0, vUv.y * 24.0 + uTime * 2.6)) * 0.4;
          if (uHasMap > 0.5) streak = texture2D(uMap, vec2(u, vUv.y * 3.0 + uTime * 0.6)).a;
          float a = smoothstep(0.0, 0.25, vUv.y) * (0.3 + streak * 0.6) * mix(1.0, 0.55, vFacing); // denser at the silhouette
          vec3 col = mix(vec3(0.62, 0.66, 0.85), vec3(1.0, 0.88, 0.8), streak);
          gl_FragColor = vec4(toLinear(col), a);
          #include <colorspace_fragment>
        }`,
    });
    const falls = FALLS.map(([id, angle, width]) => {
      const i = islandById[id];
      const base = [i.x + Math.cos(angle) * (i.r + 5), -25, i.z + Math.sin(angle) * (i.r + 5)];
      return { geo: fallGeometry(i.r, i.y, width), pos: [i.x, 0, i.z], rot: -angle, base, width };
    });
    const mist = new THREE.InstancedMesh(cloudGeometry(9), new THREE.MeshLambertMaterial({ color: srgb('#D9CFE6'), emissive: srgb('#3A3048') }), falls.length);
    const o = new THREE.Object3D();
    falls.forEach((f, k) => { o.position.set(...f.base); o.scale.set(f.width * 2.2, f.width * 1.1, f.width * 2.2); o.updateMatrix(); mist.setMatrixAt(k, o.matrix); });
    mist.computeBoundingSphere();
    return { mat, falls, mist };
  }, []);
  useFrame((_, dt) => { mat.uniforms.uTime.value += dt; });
  return (
    <>
      {falls.map((f, k) => <mesh key={k} geometry={f.geo} material={mat} position={f.pos} rotation-y={f.rot} />)}
      <primitive object={mist} />
    </>
  );
}

// Slowly orbiting rock debris.
function Debris({ count }) {
  const group = useMemo(() => {
    const rnd = seeded(41);
    const m = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(1, 0), new THREE.MeshStandardMaterial({ color: srgb('#4A4558'), flatShading: true, roughness: 1 }), count);
    const o = new THREE.Object3D();
    for (let k = 0; k < count; k++) {
      const isl = ISLANDS[Math.floor(rnd() * 7)];
      const a = rnd() * Math.PI * 2, d = isl.r + 3 + rnd() * 14;
      o.position.set(isl.x + Math.cos(a) * d, isl.y - 4 - rnd() * 14, isl.z + Math.sin(a) * d);
      o.rotation.set(rnd() * 6, rnd() * 6, 0);
      o.scale.setScalar(0.2 + Math.pow(rnd(), 3) * 1.6);
      o.updateMatrix();
      m.setMatrixAt(k, o.matrix);
    }
    const g = new THREE.Group();
    g.add(m);
    return g;
  }, [count]);
  useFrame(({ clock }) => { group.position.y = Math.sin(clock.elapsedTime * 0.3) * 0.6; });
  return <primitive object={group} />;
}

export default function Atmosphere({ quality }) {
  const high = quality === 'high';
  return (
    <>
      <CloudBanks count={high ? 110 : 50} />
      <Waterfalls />
      <Motes count={high ? 700 : 220} />
      <Debris count={high ? 80 : 30} />
    </>
  );
}

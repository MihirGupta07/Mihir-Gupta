import { Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { ISLANDS, groundAt } from '../data';
import { travelToPoint } from '../actions';
import { useGLTF } from '@react-three/drei';
import { assetUrl, MODELS } from '../assets/manifest';

import { seeded, islandGeometry } from './islandGeometry';

const srgb = (hex) => new THREE.Color().setStyle(hex, THREE.SRGBColorSpace);

function rockMaterial() {
  const m = new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.92, metalness: 0.02 });
  const url = assetUrl('rockCliff');
  if (url) {
    m.map = new THREE.TextureLoader().load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(4, 4); });
  }
  return m;
}

// A07 on the walkable tops (geometry group 1); without it the tops keep their vertex-colour moss.
function mossMaterial() {
  const url = assetUrl('mossTop');
  if (!url) return null;
  const map = new THREE.TextureLoader().load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping; });
  return new THREE.MeshStandardMaterial({ map, color: srgb('#C4C8BC'), roughness: 0.95, metalness: 0 });
}

const texture = (key, cb) => {
  const url = assetUrl(key);
  return url && new THREE.TextureLoader().load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; cb?.(t); });
};

// click/tap any walkable surface to travel there
const walkTo = (e) => {
  if (e.delta > 6 || groundAt(e.point.x, e.point.z) === null) return;
  e.stopPropagation();
  travelToPoint(e.point.x, e.point.z);
};

export default function Islands({ quality }) {
  const { meshes, material } = useMemo(() => {
    const rock = rockMaterial(), moss = mossMaterial();
    const material = moss ? [rock, moss] : rock;
    const meshes = ISLANDS.map((i) => ({ i, geo: islandGeometry(i.r, i.seed) }));
    return { meshes, material };
  }, []);

  return (
    <group>
      {meshes.map(({ i, geo }) => (
        <mesh key={i.id} geometry={geo} material={material} position={[i.x, i.y, i.z]}
          castShadow={quality === 'high'} receiveShadow={quality === 'high'} onClick={walkTo} />
      ))}
      <Suspense fallback={null}><Flora /></Suspense>
      <FarIslands />
      <MountainRing />
    </group>
  );
}

// Slender cypress silhouettes and boulders — scale cues on the walkable islands.
function Flora() {
  const { cypress, boulders } = useMemo(() => {
    const rnd = seeded(99);
    const cypress = [], boulders = [];
    for (const i of ISLANDS) {
      if (i.id === 'nexus') continue;
      const n = i.id.startsWith('d') ? 4 : 5;
      for (let k = 0; k < n; k++) {
        const a = rnd() * Math.PI * 2, d = i.r * (0.62 + rnd() * 0.3);
        const x = i.x + Math.cos(a) * d, z = i.z + Math.sin(a) * d;
        // keep the landing's spawn view and paths clear
        if (i.id === 'landing' && z > -6 && Math.abs(x) < 7) continue;
        if (rnd() > 0.45) cypress.push([x, i.y, z, 0.7 + rnd() * 0.8]);
        else boulders.push([x, i.y, z, 0.4 + rnd() * 0.9, rnd() * 6]);
      }
    }
    return { cypress, boulders };
  }, []);

  // ElectroNick's cypress: one instanced mesh per part (bark, foliage), each part's own transform folded in.
  const { scene: cypressSet } = useGLTF(MODELS.cypress);
  const tree = useMemo(() => {
    const g = new THREE.Group(), o = new THREE.Object3D(), part = new THREE.Matrix4();
    cypressSet.updateMatrixWorld(true);
    const h = new THREE.Box3().setFromObject(cypressSet).max.y;
    cypressSet.traverse((c) => {
      if (!c.isMesh) return;
      // alpha-blended cards sort badly when instanced; cut them out instead
      if (c.material.transparent) { c.material.transparent = false; c.material.alphaTest = 0.15; }
      const m = new THREE.InstancedMesh(c.geometry, c.material, cypress.length);
      cypress.forEach(([x, y, z, s], k) => {
        o.position.set(x, y, z); o.rotation.set(0, k * 2.4, 0); o.scale.setScalar((6 * s) / h); o.updateMatrix();
        m.setMatrixAt(k, part.multiplyMatrices(o.matrix, c.matrixWorld));
      });
      m.castShadow = true;
      g.add(m);
    });
    return g;
  }, [cypressSet, cypress]);

  // Poly Haven mossy rock set: one instanced mesh per rock shape, boulders dealt round-robin.
  const { scene: rockSet } = useGLTF(MODELS.rocks);
  const rocks = useMemo(() => {
    const shapes = [];
    rockSet.traverse((c) => {
      if (!c.isMesh) return;
      const g = c.geometry.clone().center();
      g.computeBoundingSphere();
      shapes.push({ g, mat: c.material, r: g.boundingSphere.radius });
    });
    const o = new THREE.Object3D();
    return shapes.map(({ g, mat, r }, si) => {
      const mine = boulders.filter((_, k) => k % shapes.length === si);
      const m = new THREE.InstancedMesh(g, mat, mine.length);
      mine.forEach(([x, y, z, s, rot], k) => {
        const sc = (s * 1.3) / r;
        o.position.set(x, y + s * 0.25, z); o.rotation.set(0, rot, 0); o.scale.setScalar(sc); o.updateMatrix(); m.setMatrixAt(k, o.matrix);
      });
      m.castShadow = m.receiveShadow = true;
      return m;
    });
  }, [rockSet, boulders]);

  return <><primitive object={tree} />{rocks.map((m, k) => <primitive key={k} object={m} />)}</>;
}

// Background layer: distant inhabited islands with tiny warm lights.
function FarIslands() {
  const atlas = useMemo(() => texture('farIslands'), []);
  return atlas ? <FarIslandSprites atlas={atlas} /> : <FarIslandMeshes />;
}

// A05: 2x2 atlas of painted far islands as billboards on the same ring the meshes use.
function FarIslandSprites({ atlas }) {
  const group = useMemo(() => {
    const rnd = seeded(7);
    const mats = [0, 1, 2, 3].map((c) => {
      const t = atlas.clone();
      t.repeat.set(0.5, 0.5); t.offset.set((c % 2) * 0.5, c < 2 ? 0.5 : 0);
      return new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false });
    });
    const g = new THREE.Group();
    for (let k = 0; k < 34; k++) {
      const a = rnd() * Math.PI * 2, d = 240 + rnd() * 480, s = (7 + rnd() * 26) * 2.6;
      const sp = new THREE.Sprite(mats[k % 4]);
      sp.position.set(Math.cos(a) * d, -10 + rnd() * 70, Math.sin(a) * d - 60);
      sp.scale.set(s, s, 1);
      g.add(sp);
    }
    return g;
  }, [atlas]);
  return <primitive object={group} />;
}

function FarIslandMeshes() {
  const { mesh, lights } = useMemo(() => {
    const rnd = seeded(7);
    const geos = [islandGeometry(1, 31, 2.2), islandGeometry(1, 32, 1.4), islandGeometry(1, 33, 2.8)];
    const mat = new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true });
    const group = new THREE.Group();
    const lightPos = [];
    const o = new THREE.Object3D();
    const counts = [12, 12, 10];
    geos.forEach((g, gi) => {
      const im = new THREE.InstancedMesh(g, mat, counts[gi]);
      for (let k = 0; k < counts[gi]; k++) {
        const a = rnd() * Math.PI * 2, d = 240 + rnd() * 480, s = 7 + rnd() * 26;
        o.position.set(Math.cos(a) * d, -10 + rnd() * 70, Math.sin(a) * d - 60);
        o.scale.setScalar(s);
        o.rotation.y = rnd() * 6;
        o.updateMatrix();
        im.setMatrixAt(k, o.matrix);
        for (let l = 0; l < 6 + rnd() * 18; l++) {
          const la = rnd() * Math.PI * 2, lr = rnd() * s * 0.8;
          lightPos.push(o.position.x + Math.cos(la) * lr, o.position.y + 0.3 + rnd() * s * 0.2, o.position.z + Math.sin(la) * lr);
        }
      }
      group.add(im);
    });
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(lightPos, 3));
    const lights = new THREE.Points(lg, new THREE.PointsMaterial({ color: srgb('#FFCF7A'), size: 2.2, sizeAttenuation: true, fog: false, transparent: true, opacity: 0.9, depthWrite: false, toneMapped: false }));
    return { mesh: group, lights };
  }, []);
  return <><primitive object={mesh} /><primitive object={lights} /></>;
}

// Horizon: a ring of hazy peaks piercing the cloud sea.
function MountainRing() {
  const strip = useMemo(() => texture('mountainStrip', (t) => { t.wrapS = THREE.RepeatWrapping; t.repeat.x = 6; }), []);
  if (strip) {
    // A04: painted strip wrapped 6x round an open cylinder (2172x724 tiles ≈ 1200 wide, 400 tall)
    return (
      <mesh position-y={170} renderOrder={-8}>
        <cylinderGeometry args={[1150, 1150, 420, 96, 1, true]} />
        <meshBasicMaterial map={strip} transparent depthWrite={false} fog={false} side={THREE.BackSide} toneMapped={false} />
      </mesh>
    );
  }
  return <MountainMesh />;
}

function MountainMesh() {
  const geo = useMemo(() => {
    const N = 300, R = 1150;
    const pos = [], col = [], idx = [];
    const base = srgb('#6B5A80'), peak = srgb('#3A3660'), warm = srgb('#8A5E6E');
    const h = (t) => {
      const a = t * Math.PI * 2;
      const v = Math.sin(a * 3 + 1) * 0.35 + Math.sin(a * 7 + 2) * 0.25 + Math.sin(a * 17 + 0.5) * 0.18 + Math.sin(a * 41) * 0.08;
      return Math.max(0, v + 0.2) * 150 + 10;
    };
    for (let k = 0; k <= N; k++) {
      const t = k / N, a = t * Math.PI * 2;
      const x = Math.cos(a) * R, z = Math.sin(a) * R;
      const sunward = Math.max(0, -Math.sin(a));
      pos.push(x, -30, z, x, -30 + h(t), z);
      base.toArray(col, col.length);
      peak.clone().lerp(warm, Math.pow(sunward, 3) * 0.6).toArray(col, col.length);
      if (k < N) { const b = k * 2; idx.push(b, b + 1, b + 2, b + 1, b + 3, b + 2); }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
    g.setIndex(idx);
    return g;
  }, []);
  return (
    <mesh geometry={geo} renderOrder={-8}>
      <meshBasicMaterial vertexColors fog={false} side={THREE.DoubleSide} toneMapped={false} />
    </mesh>
  );
}

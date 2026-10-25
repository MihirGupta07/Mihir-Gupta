import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { BRIDGES, islandById } from '../data';
import { rig } from '../store';

const srgb = (hex) => new THREE.Color().setStyle(hex, THREE.SRGBColorSpace);

// Floating slab walkways with inlaid gold edge light and lanterns. All instanced: 3 draw calls total.
export default function Bridges() {
  const { slabs, edges, lanterns, edgeMat } = useMemo(() => {
    const slabT = [], edgeT = [], lampT = [];
    for (const [a, b] of BRIDGES) {
      const A = islandById[a], B = islandById[b];
      const dx = B.x - A.x, dz = B.z - A.z, L = Math.hypot(dx, dz);
      const ux = dx / L, uz = dz / L;
      const t0 = (A.r - 1) / L, t1 = 1 - (B.r - 1) / L;
      const yAt = (t) => A.y + (B.y - A.y) * t; // same rule as groundAt()
      const yaw = Math.atan2(ux, uz);
      const pitch = -Math.atan2(B.y - A.y, L);
      const n = Math.ceil(((t1 - t0) * L) / 2.1);
      for (let k = 0; k <= n; k++) {
        const t = t0 + ((t1 - t0) * k) / n;
        slabT.push([A.x + dx * t, yAt(t) - 0.2, A.z + dz * t, yaw, pitch, k]);
      }
      const tm = (t0 + t1) / 2, len = (t1 - t0) * L;
      const slope = Math.hypot(len, (B.y - A.y) * (t1 - t0));
      for (const side of [-1, 1]) {
        edgeT.push([A.x + dx * tm + uz * side * 1.3, yAt(tm) - 0.02, A.z + dz * tm - ux * side * 1.3, yaw, pitch, slope]);
        for (let s = 10; s < len - 4; s += 11) {
          const t = t0 + s / L;
          lampT.push([A.x + dx * t + uz * side * 2.4, yAt(t) + 2.2 + Math.sin(s) * 0.4, A.z + dz * t - ux * side * 2.4]);
        }
      }
    }
    const o = new THREE.Object3D();
    o.rotation.order = 'YXZ';
    const slabs = new THREE.InstancedMesh(new THREE.BoxGeometry(2.5, 0.4, 1.8), new THREE.MeshStandardMaterial({ color: srgb('#CFC6B6'), roughness: 0.8, flatShading: true }), slabT.length);
    slabT.forEach(([x, y, z, yaw, pitch, k], i) => {
      o.position.set(x, y + Math.sin(k * 1.7) * 0.04, z); o.rotation.set(pitch, yaw, Math.sin(k * 2.3) * 0.015); o.scale.set(1, 1, 1);
      o.updateMatrix(); slabs.setMatrixAt(i, o.matrix);
    });
    slabs.castShadow = slabs.receiveShadow = true;
    const edgeMat = new THREE.MeshStandardMaterial({ color: '#000', emissive: srgb('#FFCF7A'), emissiveIntensity: 1.4, toneMapped: false });
    const edges = new THREE.InstancedMesh(new THREE.BoxGeometry(0.07, 0.07, 1), edgeMat, edgeT.length);
    edgeT.forEach(([x, y, z, yaw, pitch, len], i) => {
      o.position.set(x, y, z); o.rotation.set(pitch, yaw, 0); o.scale.set(1, 1, len);
      o.updateMatrix(); edges.setMatrixAt(i, o.matrix);
    });
    const lanterns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(0.18, 1), new THREE.MeshBasicMaterial({ color: new THREE.Color(3, 2.2, 1.1), toneMapped: false }), lampT.length);
    lampT.forEach(([x, y, z], i) => { o.position.set(x, y, z); o.rotation.set(0, 0, 0); o.scale.set(1, 1, 1); o.updateMatrix(); lanterns.setMatrixAt(i, o.matrix); });
    return { slabs, edges, lanterns, edgeMat };
  }, []);

  useFrame((_, dt) => {
    rig.pathPulse = Math.max(0, rig.pathPulse - dt * 0.35);
    edgeMat.emissiveIntensity = (1.4 + rig.pathPulse * 6) * Math.min(1, rig.intro * 1.5);
  });

  return <><primitive object={slabs} /><primitive object={edges} /><primitive object={lanterns} /></>;
}

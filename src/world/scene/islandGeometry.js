import * as THREE from 'three';

export function seeded(seed) {
  let s = seed * 9301 + 49297;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

const srgb = (hex) => new THREE.Color().setStyle(hex, THREE.SRGBColorSpace);
const MOSS = [srgb('#6F8A6A'), srgb('#7C9373'), srgb('#5E7A5E')];
const ROCK_TOP = srgb('#5A5566');
const ROCK_LOW = srgb('#242231');
const RIM = srgb('#8C6A63');

// Floating island: flat walkable top, broken rim, long jagged underside tapering to a point.
export function islandGeometry(r, seed, depth = r * 1.8) {
  const rnd = seeded(seed);
  const profile = [new THREE.Vector2(0.15, -depth - 1.6)];
  for (let k = 7; k >= 1; k--) {
    const t = k / 8;
    profile.push(new THREE.Vector2(r * Math.pow(1 - t, 1.25) * (0.92 + rnd() * 0.12) + 0.2, -1.6 - depth * t));
  }
  profile.push(new THREE.Vector2(r * 0.97, -1.5), new THREE.Vector2(r * 1.03, -0.55), new THREE.Vector2(r, 0), new THREE.Vector2(0, 0));
  const g = new THREE.LatheGeometry(profile, 36);

  const waves = Array.from({ length: 4 }, (_, i) => ({ k: 2 + i * 2 + Math.floor(rnd() * 2), ph: rnd() * 6.28, b: 0.15 + rnd() * 0.3, a: 0.16 / (i + 1) }));
  const pos = g.attributes.position;
  const v = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    const theta = Math.atan2(v.z, v.x);
    let n = 0;
    for (const w of waves) n += Math.sin(w.k * theta + w.ph + v.y * w.b) * w.a;
    if (v.y < -0.1) {
      const s = 1 + n * (v.y < -1 ? 1.6 : 0.5);
      v.x *= s; v.z *= s;
      v.y += n * 2.2 * Math.min(1, -v.y / 4);
    } else if (Math.hypot(v.x, v.z) > r * 0.9) {
      v.x *= 1 + n * 0.25; v.z *= 1 + n * 0.25;
    }
    pos.setXYZ(i, v.x, v.y, v.z);
  }

  const flat = g.toNonIndexed();
  flat.computeVertexNormals();
  const colors = new Float32Array(flat.attributes.position.count * 3);
  const p = flat.attributes.position, nrm = flat.attributes.normal;
  const c = new THREE.Color();
  const tops = [], rest = [];
  for (let i = 0; i < p.count; i += 3) {
    // colour per face so flat shading reads as carved facets
    const y = (p.getY(i) + p.getY(i + 1) + p.getY(i + 2)) / 3;
    const ny = nrm.getY(i);
    // the lathe collapses to a point at the top centre: those zero-area faces have zero normals,
    // which shade to NaN and Bloom smears a single NaN pixel into a black frame. Drop them.
    if (Math.hypot(nrm.getX(i), ny, nrm.getZ(i)) < 1e-6) continue;
    const top = ny > 0.7 && y > -0.4;
    (top ? tops : rest).push(i);
    if (top) c.copy(MOSS[Math.floor(rnd() * MOSS.length)]);
    else {
      const t = THREE.MathUtils.clamp(-y / (depth + 1.6), 0, 1);
      c.copy(ROCK_TOP).lerp(ROCK_LOW, Math.pow(t, 0.7));
      if (y > -2.2) c.lerp(RIM, 0.35);
      c.multiplyScalar(0.85 + rnd() * 0.3);
    }
    for (let j = 0; j < 3; j++) c.toArray(colors, (i + j) * 3);
  }
  flat.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  // Walkable top faces first as group 1 (moss material), the rest as group 0 (rock).
  // Tops get planar UVs so the moss texture doesn't pinch toward the centre.
  const order = tops.concat(rest);
  for (const name of ['position', 'normal', 'uv', 'color']) {
    const a = flat.attributes[name], n = a.itemSize, out = new Float32Array(order.length * 3 * n);
    order.forEach((f, k) => out.set(a.array.subarray(f * n, (f + 3) * n), k * 3 * n));
    flat.setAttribute(name, new THREE.BufferAttribute(out, n));
  }
  const pa = flat.attributes.position, uv = flat.attributes.uv;
  for (let v = 0; v < tops.length * 3; v++) uv.setXY(v, pa.getX(v) / 6, pa.getZ(v) / 6);
  flat.addGroup(0, tops.length * 3, 1);
  flat.addGroup(tops.length * 3, rest.length * 3, 0);
  return flat;
}

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NOISE, SKY } from './glsl';
import { rig } from '../store';
import { assetUrl } from '../assets/manifest';

// Sky dome: procedural twilight gradient + stars, or the A01 panorama once it exists.
export default function Sky() {
  const material = useMemo(() => {
    const url = assetUrl('skyPanorama');
    const map = url ? new THREE.TextureLoader().load(url, (t) => (t.colorSpace = THREE.SRGBColorSpace)) : null;
    return new THREE.ShaderMaterial({
      side: THREE.BackSide, depthWrite: false, fog: false, toneMapped: false,
      uniforms: { uTime: { value: 0 }, uReveal: { value: 0 }, uMap: { value: map }, uHasMap: { value: map ? 1 : 0 } },
      vertexShader: /* glsl */ `
        varying vec3 vDir;
        void main(){ vDir = position; vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position = p.xyww; }`,
      fragmentShader: /* glsl */ `
        uniform float uTime, uReveal, uHasMap; uniform sampler2D uMap; varying vec3 vDir;
        ${NOISE}${SKY}
        void main(){
          vec3 d = normalize(vDir);
          vec3 col = skyColor(d);
          col = mix(col, vec3(0.42, 0.36, 0.52), smoothstep(0.0, -0.1, d.y));
          // stars: one per sparse cell, fading in toward the zenith
          vec3 sp = d * 260.0; vec3 cell = floor(sp);
          float r = hash21(cell.xy + cell.z * 7.31);
          float star = step(0.993, r) * smoothstep(0.1, 0.45, d.y) * smoothstep(0.32, 0.0, length(fract(sp) - 0.5));
          star *= 0.55 + 0.45 * sin(uTime * (1.0 + r * 2.0) + r * 90.0);
          col += vec3(0.85, 0.9, 1.0) * star * 1.6;
          // faint galactic band
          float bd = dot(d, normalize(vec3(0.6, 0.3, 0.75))) * 5.0; // squared by hand: pow() of a negative is NaN
          float band = exp(-bd * bd) * smoothstep(0.15, 0.6, d.y);
          col += vec3(0.25, 0.22, 0.4) * band * fbm(d.xz * 6.0) * 0.35;
          col = toLinear(col);
          if (uHasMap > 0.5) {
            vec2 uv = vec2(atan(d.x, -d.z) / 6.2831853 + 0.5, asin(clamp(d.y, -1.0, 1.0)) / 3.14159265 + 0.5);
            col = texture2D(uMap, uv).rgb;
          }
          gl_FragColor = vec4(col * uReveal, 1.0);
          #include <colorspace_fragment>
        }`,
    });
  }, []);

  useFrame((_, dt) => {
    material.uniforms.uTime.value += dt;
    // the world fades up out of darkness during the intro
    material.uniforms.uReveal.value = 0.08 + 0.92 * Math.min(1, rig.intro * 1.6);
  });

  return (
    <mesh material={material} frustumCulled={false} renderOrder={-10}>
      <sphereGeometry args={[1600, 48, 24]} />
    </mesh>
  );
}

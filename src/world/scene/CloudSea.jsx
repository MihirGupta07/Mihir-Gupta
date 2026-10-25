import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NOISE, SKY } from './glsl';
import { rig } from '../store';
import { assetUrl } from '../assets/manifest';

// The endless cloud floor. Fades into the exact sky horizon colour so there is no seam.
export default function CloudSea() {
  const material = useMemo(() => {
    const url = assetUrl('cloudSea');
    const map = url ? new THREE.TextureLoader().load(url, (t) => {
      t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    }) : null;
    return new THREE.ShaderMaterial({
      depthWrite: true, fog: false, toneMapped: false,
      uniforms: { uTime: { value: 0 }, uReveal: { value: 0 }, uMap: { value: map }, uHasMap: { value: map ? 1 : 0 } },
      vertexShader: /* glsl */ `
        varying vec3 vWorld;
        void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vWorld = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */ `
        uniform float uTime, uReveal, uHasMap; uniform sampler2D uMap; varying vec3 vWorld;
        ${NOISE}${SKY}
        void main(){
          vec2 p = vWorld.xz * 0.011 + vec2(uTime * 0.006, uTime * 0.003);
          float n = fbm(p);
          float c = n * 0.6 + fbm(p * 2.7 + n * 1.6 - uTime * 0.012) * 0.4;
          vec3 shadow = vec3(0.22, 0.19, 0.34), body = vec3(0.52, 0.47, 0.64), top = vec3(0.96, 0.72, 0.57);
          vec3 col = mix(shadow, body, smoothstep(0.25, 0.6, c));
          vec3 dir = normalize(vWorld - cameraPosition);
          vec3 hz = vec3(dir.x, 0.0, dir.z) / max(length(dir.xz), 1e-5); // straight below the camera dir.xz is zero
          float toSun = pow(max(-hz.z, 0.0), 3.0);
          col = mix(col, top, smoothstep(0.5, 0.85, c) * (0.35 + 0.5 * toSun));
          if (uHasMap > 0.5) col *= texture2D(uMap, vWorld.xz * 0.0035 + uTime * 0.002).rgb * 1.6;
          float dist = length(vWorld.xz - cameraPosition.xz);
          col = mix(col, skyColor(hz) * 0.92, smoothstep(140.0, 1100.0, dist));
          gl_FragColor = vec4(toLinear(col) * uReveal, 1.0);
          #include <colorspace_fragment>
        }`,
    });
  }, []);

  useFrame((_, dt) => {
    material.uniforms.uTime.value += dt;
    material.uniforms.uReveal.value = 0.06 + 0.94 * Math.min(1, rig.intro * 1.4);
  });

  return (
    <mesh material={material} rotation-x={-Math.PI / 2} position-y={-26} renderOrder={-5}>
      <planeGeometry args={[3200, 3200, 1, 1]} />
    </mesh>
  );
}

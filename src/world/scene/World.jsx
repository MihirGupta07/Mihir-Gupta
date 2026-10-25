import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerformanceMonitor, useGLTF } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import Sky from './Sky';
import CloudSea from './CloudSea';
import Islands from './Islands';
import Bridges from './Bridges';
import Embers from './Embers';
import Landmarks from './Landmarks';
import Atmosphere from './Atmosphere';
import Player from './Player';
import { rig, setState } from '../store';
import { MODELS } from '../assets/manifest';

// start fetching every GLB at import time, not when its component first mounts
Object.values(MODELS).forEach((url) => useGLTF.preload(url));

// Low sunset key light from the north (behind the world, so every silhouette gets a warm rim),
// cool sky fill from the south. Both rise out of darkness during the intro.
function Lights({ shadows }) {
  const sun = useRef(), fill = useRef(), hemi = useRef();
  useFrame(() => {
    const k = Math.min(1, rig.intro * 1.3);
    if (sun.current) sun.current.intensity = 2.4 * k;
    if (fill.current) fill.current.intensity = 0.55 * k;
    if (hemi.current) hemi.current.intensity = 0.15 + 0.85 * k;
  });
  return (
    <>
      <hemisphereLight ref={hemi} args={['#7270b0', '#3a2836', 1]} />
      <directionalLight
        ref={sun} color="#FFB27A" position={[-40, 46, -230]}
        castShadow={shadows} shadow-mapSize={[2048, 2048]} shadow-bias={-0.0006} shadow-normalBias={0.04}
        shadow-camera-left={-120} shadow-camera-right={120} shadow-camera-top={120} shadow-camera-bottom={-120}
        shadow-camera-near={10} shadow-camera-far={420}
      />
      <directionalLight ref={fill} color="#8F8FD6" position={[70, 50, 140]} />
    </>
  );
}

export default function World({ quality }) {
  const high = quality === 'high';
  return (
    <Canvas
      flat
      dpr={high ? [1, 1.75] : [0.75, 1.25]}
      shadows={high}
      gl={{ antialias: !high, powerPreference: 'high-performance', stencil: false }}
      camera={{ fov: 50, near: 0.1, far: 3500, position: [60, 90, 360] }}
      aria-hidden="true"
    >
      <PerformanceMonitor onDecline={() => setState({ quality: 'low' })} flipflops={2} />
      <fogExp2 attach="fog" args={['#6A5778', 0.0036]} />
      <Lights shadows={high} />
      <Sky />
      <CloudSea />
      {/* separate boundaries: a chunk that suspends (re)loading blanks only itself, not the whole world */}
      <Suspense fallback={null}><Islands quality={quality} /><Bridges /><Embers /></Suspense>
      <Suspense fallback={null}><Landmarks /></Suspense>
      <Suspense fallback={null}><Atmosphere quality={quality} /></Suspense>
      <Suspense fallback={null}><Ready /></Suspense>
      <Player />
      {high && (
        <EffectComposer multisampling={4}>
          <Bloom mipmapBlur intensity={0.8} luminanceThreshold={0.85} luminanceSmoothing={0.25} radius={0.72} />
          <Vignette offset={0.32} darkness={0.62} />
        </EffectComposer>
      )}
    </Canvas>
  );
}

// mounts only once every model has loaded
function Ready() {
  useGLTF(Object.values(MODELS));
  useEffect(() => setState({ ready: true }), []);
  return null;
}

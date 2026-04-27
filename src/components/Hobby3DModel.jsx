import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

// Synthetic environment map for PBR reflections. Generated in-code via
// three's RoomEnvironment — no HDR download, no extra network round-trip,
// ~free in bundle size. Without an environment, metallic/glass materials
// render black because they have nothing to reflect.
function SyntheticEnv() {
  const { scene, gl } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    return () => {
      envTex.dispose();
      pmrem.dispose();
      scene.environment = null;
    };
  }, [scene, gl]);
  return null;
}

// Centers a cloned GLB scene at world origin and scales its largest dim to
// `fit`. Identical math runs once per model (memoized on the source scene).
function GLBModel({ path, rotation = [0, 0, 0], fit = 1.7, visible = true }) {
  // useGLTF auto-applies drei's bundled MeshoptDecoder (pure JS) when the
  // GLB has the EXT_meshopt_compression extension. No external decoder
  // file, no WASM, no MIME concerns — works on every iOS Safari version.
  const { scene } = useGLTF(path);
  const prepared = useMemo(() => {
    const c = scene.clone(true);
    c.rotation.set(rotation[0], rotation[1], rotation[2]);
    c.updateMatrixWorld(true);
    const box = new THREE.Box3().setFromObject(c);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const s = fit / maxDim;
    c.scale.setScalar(s);
    c.position.set(-center.x * s, -center.y * s, -center.z * s);
    return c;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);
  return <primitive object={prepared} visible={visible} />;
}

const BASE = import.meta.env.BASE_URL;
const DUMBBELL_PATH = `${BASE}models/dumble.glb`;
const HEADPHONES_PATH = `${BASE}models/headphones.glb`;

// Single Canvas instance — both models live in the scene, only the active
// one is `visible`. This keeps the page to ONE WebGL context (iOS Safari
// caps total contexts per page) and avoids the cost of mounting/unmounting
// canvases when the user switches tabs.
const FADE_MS = 350; // half of 700ms — matches the .text-content opacity transition

export default function Hobby3DModel({ activeType }) {
  // `renderedType` lags `activeType` so we can fade out first, swap the
  // visible model under cover of opacity 0, then fade back in. The result
  // is a clean fade-out / fade-in crossfade like the text section's.
  const [renderedType, setRenderedType] = useState(activeType);
  const [opacity, setOpacity] = useState(1);

  // Reset OrbitControls to its initial position every time the tab
  // changes — coming back to a model should always show it from the
  // start orientation, regardless of how the user rotated it last time.
  const controlsRef = useRef();

  useEffect(() => {
    if (activeType === renderedType) return;
    setOpacity(0);
    const t = setTimeout(() => {
      setRenderedType(activeType);
      const ctrls = controlsRef.current;
      if (ctrls) {
        ctrls.object.position.set(0, 0, 3.2);
        ctrls.target.set(0, 0, 0);
        ctrls.update();
      }
      setOpacity(1);
    }, FADE_MS);
    return () => clearTimeout(t);
  }, [activeType, renderedType]);

  // Preload both GLBs once the component actually mounts (i.e. user reaches
  // About). Module-level preloads would run on every page that imports this
  // file via the route bundle, even if the user never visits About.
  useEffect(() => {
    useGLTF.preload(DUMBBELL_PATH);
    useGLTF.preload(HEADPHONES_PATH);
  }, []);

  return (
    <Canvas
      style={{
        width: '100%',
        height: '100%',
        touchAction: 'none',
        opacity,
        transition: `opacity ${FADE_MS}ms ease`
      }}
      camera={{ position: [0, 0, 3.2], fov: 40 }}
      // Cap DPR at 1.5 — retina (2x) doubles fragment work for no visible
      // gain on these models.
      dpr={[1, 1.5]}
      // Only render when something changes (e.g. OrbitControls invalidates
      // on user interaction or damping). Idle = zero CPU/GPU cost.
      frameloop="demand"
      gl={{
        antialias: false,
        // Don't keep the drawing buffer around — saves memory on mobile.
        preserveDrawingBuffer: false
      }}
    >
      {/* Synthetic env map (in-code, no HDR download) so PBR/metallic
        * materials have something to reflect — without it they render
        * black. Lights below add directional shape on top of the env. */}
      <SyntheticEnv />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 6, 5]} intensity={1.2} />
      <directionalLight position={[-5, 2, -3]} intensity={0.6} />
      <Suspense fallback={null}>
        <GLBModel
          path={DUMBBELL_PATH}
          rotation={[0, 0, 0]}
          visible={renderedType === 'dumbbell'}
        />
        <GLBModel
          path={HEADPHONES_PATH}
          rotation={[0, Math.PI / 2, 0]}
          visible={renderedType === 'headphones'}
        />
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.9}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

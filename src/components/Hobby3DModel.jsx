import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { useMemo, Suspense } from 'react';
import * as THREE from 'three';

// One model loader. Loads the .glb, clones it, applies the given rotation,
// then scales+offsets the clone so its bounding box center sits at world
// origin and the largest dimension fits a fixed size. Identical math runs
// for every Canvas instance, so positioning is deterministic.
function GLBModel({ path, rotation = [0, 0, 0], fit = 1.3 }) {
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
  return <primitive object={prepared} />;
}

const BASE = import.meta.env.BASE_URL;
const MODELS = {
  dumbbell: { path: `${BASE}models/dumble.glb`, rotation: [0, 0, 0] },
  headphones: { path: `${BASE}models/headphones.glb`, rotation: [0, Math.PI / 2, 0] }
};

useGLTF.preload(`${BASE}models/dumble.glb`);
useGLTF.preload(`${BASE}models/headphones.glb`);

export default function Hobby3DModel({ type }) {
  const cfg = MODELS[type] || MODELS.dumbbell;
  return (
    <Canvas
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
      camera={{ position: [0, 0, 3.2], fov: 40 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 6, 5]} intensity={2} />
      <directionalLight position={[-5, 2, -3]} intensity={1.2} />
      <Suspense fallback={null}>
        <Environment preset="studio" />
        <GLBModel path={cfg.path} rotation={cfg.rotation} />
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        rotateSpeed={0.9}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}

import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Suspense } from 'react';
import './App.css';
import Experience from './experience';

export default function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [4, 3, 6], fov: 45 }}>
        {/* GLB는 불러오는 동안 잠시 멈춘다. 이 Suspense가 없으면 그사이 화면이 통째로 빈다 */}
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      {/* 불러오는 동안 진행률을 보여 준다. Canvas 밖에 둬야 한다 */}
      <Loader />
    </>
  );
}

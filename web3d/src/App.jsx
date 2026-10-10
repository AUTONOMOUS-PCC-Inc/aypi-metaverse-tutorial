import { Canvas } from '@react-three/fiber';
import './App.css';
import Experience from './experience';

export default function App() {
  return (
    <Canvas shadows camera={{ position: [4, 3, 6], fov: 45 }}>
      <Experience />
    </Canvas>
  );
}

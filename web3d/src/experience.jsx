import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';

// 빈 장면: 바닥·조명·카메라 조작·성능 표시만 있다. 여기에 미션마다 물체를 추가한다
export default function Experience() {
    return <>
        <Perf position="top-left" />
        <OrbitControls makeDefault />

        <ambientLight intensity={0.3} />
        <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />

        <mesh receiveShadow position-y={-1} rotation-x={THREE.MathUtils.degToRad(-90)} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="#5D6D7E" />
        </mesh>
    </>
}

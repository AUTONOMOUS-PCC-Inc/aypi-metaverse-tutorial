import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Html, useAnimations, useGLTF } from '@react-three/drei';
import { LoopOnce, LoopRepeat, Vector3 } from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

export function NameTag({ name, talk }) {
    // 애니메이션 뼈대와 분리해 발바닥 기준 높이를 일정하게 유지한다.
    return <Html center position={[0, 2, 0]} style={{ pointerEvents: 'none' }}>
        {talk && <div style={{ position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: 240, padding: '10px 14px', borderRadius: 14, background: 'white', color: '#142030', overflowWrap: 'anywhere', whiteSpace: 'pre-wrap', boxShadow: '0 3px 12px #0003' }}>{talk}</div>}
        <div style={{
            padding: '5px 10px', borderRadius: '8px', background: 'rgba(20, 28, 40, 0.85)',
            color: 'white', fontSize: '14px', whiteSpace: 'nowrap', userSelect: 'none',
        }}>{name}</div>
    </Html>;
}

// 뼈대까지 복제해 각 로봇의 애니메이션이 다른 로봇에 영향을 주지 않게 한다.
export function useRobotModel() {
    const { scene, animations } = useGLTF('/Robot.glb');
    const model = useMemo(() => {
        const clone = SkeletonUtils.clone(scene);
        clone.traverse((object) => {
            if (object.isMesh) object.castShadow = true;
        });
        return { scene: clone };
    }, [scene]);
    return { ...model, animations };
}

export default function Colleague({ name, talk, animationName = 'Idle', position = [0, -1, 0], rotationY = 0 }) {
    const { scene, animations } = useRobotModel();
    const { actions, names } = useAnimations(animations, scene);
    const group = useRef();
    const initialPosition = useRef([...position]);
    const initialRotation = useRef(rotationY);
    const startPosition = useRef(new Vector3(...position));
    const targetPosition = useRef(new Vector3(...position));
    const startRotation = useRef(rotationY);
    const targetRotation = useRef(rotationY);
    const elapsed = useRef(0.2);
    const [traveling, setTraveling] = useState(false);
    const [x, y, z] = position;
    const displayedAnimation = animationName === 'Idle' && traveling ? 'Walk' : animationName;

    useEffect(() => {
        if (!group.current) return;
        startPosition.current.copy(group.current.position);
        targetPosition.current.set(x, y, z);
        startRotation.current = group.current.rotation.y;
        // -π와 π의 경계에서는 짧은 방향으로 회전한다.
        const difference = rotationY - startRotation.current;
        targetRotation.current = startRotation.current + Math.atan2(Math.sin(difference), Math.cos(difference));
        elapsed.current = 0;
        setTraveling(Math.hypot(x - group.current.position.x, z - group.current.position.z) > 0.01);
    }, [x, y, z, rotationY]);

    useFrame((_, delta) => {
        if (!group.current || elapsed.current >= 0.2) return;
        elapsed.current = Math.min(elapsed.current + delta, 0.2);
        const progress = elapsed.current / 0.2;
        group.current.position.lerpVectors(startPosition.current, targetPosition.current, progress);
        group.current.rotation.y = startRotation.current + (targetRotation.current - startRotation.current) * progress;
        if (progress === 1) setTraveling(false);
    });

    useEffect(() => {
        console.log(`${name} 애니메이션:`, names);
    }, [name, names]);

    useEffect(() => {
        const action = actions[displayedAnimation];
        if (!action) {
            console.warn(`없는 애니메이션: ${displayedAnimation}`);
            return;
        }
        action.reset().setLoop(displayedAnimation === 'Jump' ? LoopOnce : LoopRepeat, Infinity);
        action.clampWhenFinished = displayedAnimation === 'Jump';
        action.fadeIn(0.2).play();
        return () => action.fadeOut(0.2);
    }, [actions, displayedAnimation]);

    return <group ref={group} position={initialPosition.current} rotation-y={initialRotation.current} dispose={null}>
        <Center top><primitive object={scene} /></Center>
        <NameTag name={name} talk={talk} />
    </group>;
}

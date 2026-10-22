import * as THREE from 'three'
import { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Center, Environment, OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Colleague, { NameTag, useRobotModel } from './Colleague';

function Model() {
    const { scene } = useGLTF('/model.glb');

    useLayoutEffect(() => {
        // GLB 내부의 모든 메시에 그림자 생성을 켠다.
        scene.traverse((object) => {
            if (object.isMesh) object.castShadow = true;
        });
    }, [scene]);

    return <Center top position={[0, -1, 0]}>
        {/* OpenSCAD의 Z축 위쪽을 장면의 Y축 위쪽으로 맞춘다. */}
        <primitive object={scene} scale={0.01} rotation-x={-Math.PI / 2} />
    </Center>;
}

function Robot({ character, socket }) {
    const { scene, animations } = useRobotModel();
    const { actions, names } = useAnimations(animations, scene);
    const robot = useRef();
    // 서버가 돌려준 내 위치로 로컬 조작을 덮어쓰지 않는다.
    const initialPosition = useRef([...character.position]);
    const initialRotation = useRef(character.rotationY);
    const sendElapsed = useRef(0);
    const lastSent = useRef(JSON.stringify({
        animationName: character.animationName, position: character.position, rotationY: character.rotationY,
    }));
    const keys = useRef(new Set());
    const jumpTime = useRef(null);
    const jumpDuration = 0.7;
    const followTarget = useRef(new THREE.Vector3());
    const cameraShift = useRef(new THREE.Vector3());
    const cameraRight = useRef(new THREE.Vector3());
    const cameraForward = useRef(new THREE.Vector3());
    const moveDirection = useRef(new THREE.Vector3());
    const [animation, setAnimation] = useState('Idle');

    useEffect(() => {
        console.log('Robot 애니메이션:', names);
    }, [names]);

    useEffect(() => {
        const action = actions[animation];
        if (!action) return;
        action.reset();
        action.setLoop(animation === 'Jump' ? THREE.LoopOnce : THREE.LoopRepeat, Infinity);
        action.clampWhenFinished = animation === 'Jump';
        if (animation === 'Jump') action.setDuration(jumpDuration);
        else action.setEffectiveTimeScale(1);
        action.fadeIn(0.15).play();
        return () => action.fadeOut(0.2);
    }, [actions, animation]);

    useEffect(() => {
        const movementKeys = ['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ShiftLeft', 'ShiftRight', 'ControlLeft', 'ControlRight', 'Space'];
        const onKeyDown = (event) => {
            if (event.target instanceof HTMLElement &&
                (event.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(event.target.tagName))) return;
            if (movementKeys.includes(event.code)) {
                event.preventDefault();
                if (event.code === 'Space' && !event.repeat && jumpTime.current === null) {
                    jumpTime.current = 0;
                }
                keys.current.add(event.code);
            }
        };
        const onKeyUp = (event) => keys.current.delete(event.code);
        const clearKeys = () => keys.current.clear();
        window.addEventListener('keydown', onKeyDown);
        window.addEventListener('keyup', onKeyUp);
        window.addEventListener('blur', clearKeys);
        document.addEventListener('visibilitychange', clearKeys);
        document.addEventListener('focusin', clearKeys);
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('keyup', onKeyUp);
            window.removeEventListener('blur', clearKeys);
            document.removeEventListener('visibilitychange', clearKeys);
            document.removeEventListener('focusin', clearKeys);
            clearKeys();
        };
    }, []);

    useFrame(({ camera, controls }, delta) => {
        if (!robot.current) return;
        const dt = Math.min(delta, 0.05);
        if (jumpTime.current !== null) {
            jumpTime.current += dt;
            const progress = Math.min(jumpTime.current / jumpDuration, 1);
            // 높이 0.6의 포물선으로 뛰고 착지하면 바닥 높이로 돌아온다.
            robot.current.position.y = -1 + 4 * 0.6 * progress * (1 - progress);
            if (progress === 1) jumpTime.current = null;
        }
        const x = Number(keys.current.has('KeyD')) - Number(keys.current.has('KeyA'));
        const z = Number(keys.current.has('KeyS')) - Number(keys.current.has('KeyW'));
        const isMoving = x !== 0 || z !== 0;
        const isRunning = isMoving && (keys.current.has('ShiftLeft') || keys.current.has('ShiftRight'));
        const isFastRunning = isMoving && (keys.current.has('ControlLeft') || keys.current.has('ControlRight'));
        const nextAnimation = jumpTime.current !== null ? 'Jump'
            : isMoving ? (isFastRunning ? 'Fast Run' : isRunning ? 'Run' : 'Walk') : 'Idle';
        if (animation !== nextAnimation) setAnimation(nextAnimation);
        if (isMoving) {
            // 카메라의 좌우 방향으로 수평 이동 축을 만든다. 위에서 내려다봐도 안정적이다.
            cameraRight.current.setFromMatrixColumn(camera.matrixWorld, 0);
            cameraRight.current.y = 0;
            cameraRight.current.normalize();
            cameraForward.current.set(cameraRight.current.z, 0, -cameraRight.current.x);
            moveDirection.current.copy(cameraRight.current).multiplyScalar(x)
                .addScaledVector(cameraForward.current, -z).normalize();
            // Ctrl을 Shift보다 우선하며, 이동 속도는 걷기 2 / 달리기 4 / 고속 달리기 6이다.
            const speed = isFastRunning ? 6 : isRunning ? 4 : 2;
            const step = speed * dt;
            robot.current.position.addScaledVector(moveDirection.current, step);
            robot.current.rotation.y = Math.atan2(moveDirection.current.x, moveDirection.current.z);
        }
        if (controls) {
            followTarget.current.copy(robot.current.position);
            followTarget.current.y += 1;
            cameraShift.current.copy(followTarget.current).sub(controls.target);
            camera.position.add(cameraShift.current);
            controls.target.copy(followTarget.current);
            controls.update();
        }
        sendElapsed.current += delta;
        if (sendElapsed.current >= 0.2) {
            sendElapsed.current = 0;
            const state = {
                animationName: nextAnimation,
                position: robot.current.position.toArray(),
                rotationY: robot.current.rotation.y,
            };
            const serialized = JSON.stringify(state);
            if (socket?.connected && serialized !== lastSent.current) {
                socket.emit('update', state);
                lastSent.current = serialized;
            }
        }
    });

    useLayoutEffect(() => {
        scene.traverse((object) => {
            if (object.isMesh) object.castShadow = true;
        });
    }, [scene]);

    return <group ref={robot} position={initialPosition.current} rotation-y={initialRotation.current} dispose={null}>
        <Center top>
            <primitive object={scene} />
        </Center>
        <NameTag name={character.name} talk={character.talk} />
    </group>;
}

// 모델의 아래쪽을 바닥 높이에 맞추고 X/Z 방향으로 중앙 정렬한다.
export default function Experience({ session }) {
    return <>
        <Perf position="top-left" />
        <OrbitControls makeDefault enablePan={false} />

        <ambientLight intensity={0.3} />
        <directionalLight position={[1, 2, 3]} intensity={1.5} castShadow />

        <Suspense fallback={null}>
            <Environment files="/hdri/adamsbridge.hdr" background />
            <Model />
            {session.characters.map((character) => character.key === session.id
                ? <Robot key={character.key} character={character} socket={session.socket} />
                : <Colleague key={character.key} name={character.name} talk={character.talk}
                    animationName={character.animationName} position={character.position}
                    rotationY={character.rotationY} />)}
        </Suspense>

        <mesh receiveShadow position-y={-1} rotation-x={THREE.MathUtils.degToRad(-90)} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="#5D6D7E" />
        </mesh>
    </>
}

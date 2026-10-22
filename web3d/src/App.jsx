import { Canvas } from '@react-three/fiber';
import { Loader } from '@react-three/drei';
import { Suspense, useState } from 'react';
import './App.css';
import Experience from './experience';
import ServerConnector from './ServerConnector';
import LoginOverlay from './LoginOverlay';
import TalkOverlay from './TalkOverlay';

export default function App() {
  const [session, setSession] = useState({ socket: null, id: null, characters: [] });
  const [name, setName] = useState('');
  const joined = session.characters.some((character) => character.key === session.id);
  return (
    <>
      {name && <ServerConnector name={name} onSessionChange={setSession} />}
      <Canvas shadows camera={{ position: [4, 3, 6], fov: 45 }}>
        {/* GLB는 불러오는 동안 잠시 멈춘다. 이 Suspense가 없으면 그사이 화면이 통째로 빈다 */}
        <Suspense fallback={null}>
          <Experience session={session} />
        </Suspense>
      </Canvas>
      {/* 불러오는 동안 진행률을 보여 준다. Canvas 밖에 둬야 한다 */}
      <Loader />
      {joined ? <TalkOverlay socket={session.socket} /> : <LoginOverlay onJoin={setName} pending={Boolean(name)} />}
    </>
  );
}

# AGENTS.md

Codex가 이 저장소에서 일할 때 **매번 설명하지 않아도 되도록** 적어 두는 상설 맥락입니다.
Codex는 작업을 시작할 때 이 파일을 먼저 읽습니다.

> 오늘 배울 것 중 하나가 바로 이것입니다. **"내 환경을 먼저 말한다"를 파일로 굳혀 둔 것**이라
> 매번 "fiber 8 기준으로"라고 입력하지 않아도 됩니다.

## 이 저장소는

바이브코딩 캠프 2회차(메타버스와 CAD) 실습 저장소입니다.

- `cad/` — 오전 실습. OpenSCAD 예제. 설치 없이 브라우저 Playground에서 씁니다
- `web3d/` — 오후 실습. React Three Fiber 빈 장면 (바닥·조명·카메라·성능 패널만)

오전에 만든 GLB가 오후 장면의 재료가 됩니다.

## 환경

- 윈도우 10/11, 한국어 환경
- Node.js LTS + Vite. `npm` 명령은 **`web3d/` 안에서만** 돌립니다
- **버전을 올리지 않습니다.** 설치된 것 그대로 씁니다:

| 패키지 | 버전 |
|---|---|
| react · react-dom | 18.2.0 |
| @react-three/fiber | 8.13.4 |
| @react-three/drei | 9.77.4 |
| three | 0.153.0 |
| @react-three/rapier | 1.1.1 |
| @react-three/postprocessing | 2.15.1 |
| leva · r3f-perf | 0.9.35 · 7.1.2 |

fiber 9 · React 19 · three 0.16x 문법을 섞지 마세요. 애매하면 `web3d/package.json` 을
먼저 읽습니다.

## 규칙

- 설명은 **한국어**로, 바꾼 내용과 이유를 **3줄**로 적습니다
- 고치는 파일은 `web3d/src/experience.jsx` 입니다. 새 파일이 필요하면 먼저 말합니다
- **한 번에 기능 하나만** 바꿉니다
- **새 패키지를 설치하기 전에 먼저 물어봅니다**
- 3D 에셋은 `web3d/public/` 에 **있는 파일만** 씁니다. 파일 이름을 지어내지 않습니다
- 애니메이션·노드 이름은 **추측하지 말고 콘솔에 먼저 출력**합니다
- 되돌리기는 `git restore .` 입니다. 학생이 `public/` 에 넣은 GLB는 git이 추적하지
  않으므로 지워지지 않습니다

## `web3d/public` 에 있는 것 (이 파일들만 있습니다)

| 파일 | 내용 |
|---|---|
| `Robot.glb` | 캐릭터. 애니메이션 `Idle` `Walk` `Run` `Fast Run` `Jump` — 띄어쓰기까지 이름 그대로. drei `useAnimations` 로 재생 |
| `room-transformed.glb` | 방. 삼각형 47,402개 — `RigidBody type="fixed" colliders="trimesh"` 로 씁니다 |
| `monkey.glb` | Suzanne. 불러오기 연습용 |
| `hdri/adamsbridge.hdr` | 환경맵. drei `Environment files=` 로 씁니다 (`preset=` 은 인터넷에서 받아 오므로 망이 막히면 실패합니다) |

## 오전 — `cad/`

- `.scad` 파일은 [OpenSCAD Playground](https://ochafik.com/openscad2)에 붙여 넣어 씁니다
- 치수는 **변수로 빼** 둡니다. 나중에 말로 고치기 쉬워집니다
- `color()` 를 넣습니다. GLB에 재질로 그대로 들어가 오후에 그 색으로 보입니다
- 단위가 다릅니다: OpenSCAD는 mm, three.js는 m. 100mm가 100m로 들어오면
  `scale={0.01}` 부터 의심합니다

## 자주 쓰는 명령

```bat
cd web3d
npm ci --offline --cache ./npm-cache
npm run dev
```

```bat
git restore .
```

## 이벤트 약속

| 방향 | 이벤트 | 데이터 |
|---|---|---|
| client → server | `join` | 이름 문자열 |
| client → server | `update` | `{ animationName, position: [x, y, z], rotationY }` |
| client → server | `talk` | 메시지 문자열 |
| server → 모두 | `characters` | `[{ key, name, animationName, position, rotationY, talk }]` |

- 앞으로 이벤트 이름이나 데이터 형식을 바꿀 때는 **이 표부터 수정한 뒤** 관련 코드를 변경합니다.

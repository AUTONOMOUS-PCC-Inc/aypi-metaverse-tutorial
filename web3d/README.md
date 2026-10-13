# web3d — 오후 실습 시작점

빈 장면입니다. 바닥, 조명, 카메라 조작, 성능 패널만 있습니다.

## 실행

```bat
npm ci --offline --cache ./npm-cache
npm run dev
```

`npm-cache` 가 없으면 릴리스에서 `npm-cache.zip` 을 받아 이 폴더에 풀거나,
인터넷이 빠르면 `npm install` 을 쓰세요.

브라우저에서 터미널에 찍힌 주소(보통 http://localhost:5173)를 엽니다.
바닥과 왼쪽 위 성능 패널이 보이면 준비 완료입니다.

GLB를 넣으면 불러오는 동안 화면이 잠깐 비고 가운데에 진행률이 뜹니다. 정상입니다.

## 폴더

- `src/experience.jsx` — **여기만 고칩니다.** 장면에 물체를 추가하는 파일
- `src/RobotSample.jsx` — 읽기 연습용 코드 (처음엔 화면에 나오지 않음)
- `../AGENTS.md` — AI(Codex)가 먼저 읽는 버전과 규칙
- `public/` — 3D 파일을 두는 곳. **오전에 만든 GLB를 여기 넣으세요**

## public 에셋

| 파일 | 쓰는 곳 |
|---|---|
| `monkey.glb` | 불러오기 연습용 |
| `room-transformed.glb` | 가상공간 |
| `Robot.glb` | 심화 — 캐릭터. `Idle`/`Walk`/`Run`/`Fast Run`/`Jump` 애니메이션 포함 |
| `hdri/adamsbridge.hdr` | 배경·환경맵 |

출처와 라이선스는 [../ATTRIBUTION.md](../ATTRIBUTION.md).

## 되돌리기

```bat
git restore .
```

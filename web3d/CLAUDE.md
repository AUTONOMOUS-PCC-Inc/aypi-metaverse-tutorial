# 프로젝트 규칙
- React 18, @react-three/fiber 8, drei 9, three 0.153 기준
- 새 패키지 설치 전에 먼저 물어볼 것
- 3D 에셋은 public/ 파일만 사용
- 바꾼 내용과 이유를 3줄로 설명

# public 에셋 (이 파일들만 있다)
| 파일 | 내용 |
|---|---|
| `Robot.glb` | 캐릭터. 애니메이션 `Idle` `Walk` `Run` `Fast Run` `Jump` — drei `useAnimations` 로 재생 |
| `room-transformed.glb` | 방 |
| `monkey.glb` | Suzanne |
| `hdri/adamsbridge.hdr` | 환경맵 — drei `Environment files=` |

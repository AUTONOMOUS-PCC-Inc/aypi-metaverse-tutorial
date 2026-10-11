# 에셋 출처와 라이선스

이 저장소에 담긴 3D 에셋은 아래가 전부입니다. 각 파일의 라이선스를 확인하고,
**재배포가 허용되는 것만** 담았습니다.

## 담은 것

| 파일 | 제목 | 작성자 | 라이선스 | 원본 |
|---|---|---|---|---|
| `web3d/public/Robot.glb` | Robot | **AUTONOMOUS PCC 강사 제작** | 교육 과정 내 사용 | — |
| `web3d/public/room-transformed.glb` | Room | Anex | [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/) | [Sketchfab](https://sketchfab.com/3d-models/room-6417cbc1870a4a1691cca06912ae0369) |
| `web3d/public/monkey.glb` | Suzanne | Blender Foundation | Blender 기본 메시 | [blender.org](https://www.blender.org) |
| `web3d/public/hdri/adamsbridge.hdr` | Adams Place Bridge | Poly Haven | CC0 | [Poly Haven](https://polyhaven.com/a/adams_place_bridge) |

`room-transformed.glb` 는 **CC BY 4.0** 이므로 이 저장소를 쓰는 결과물에도
위 출처 표기를 남겨 주세요.

### `Robot.glb` 에 대해

강사가 수업용으로 만든 캐릭터입니다. **Mixamo 표준 리그**(본 이름이
`mixamorig:` 로 시작)와 Mixamo 애니메이션 클립 5개(`Idle`, `Walk`, `Run`,
`Fast Run`, `Jump`)를 사용해 Blender에서 내보냈습니다.

이 캠프 수업과 그 과제에 쓰는 것은 문제가 없습니다. 다만 **이 파일만 따로
떼어 다른 곳에 재배포하거나 에셋으로 판매하는 것은** Mixamo(Adobe) 약관에
걸릴 수 있으니 하지 마세요. 본인 프로젝트에 캐릭터가 필요하면 아래 CC0
출처에서 받는 편이 안전합니다.

## 일부러 뺀 것

원본 강의 자료에는 아래 에셋도 들어 있었지만, 라이선스 때문에 공개 저장소에
담지 않았습니다. 수업에서 필요하면 강사가 별도로 나눠 줍니다.

| 파일 | 이유 |
|---|---|
| `books_with_magnifier.glb` | **CC BY-NC-SA 4.0** — 비상업 + 동일조건변경허락 |
| `lambo.glb` | **CC BY-NC 4.0** — 비상업 |
| `TreeBoy.glb`, `gem3.glb`, `compressed.glb`, `lake_pier_4k.hdr` 등 | 이번 3시간 과정에서 쓰지 않는다 |

## 에셋을 더 받고 싶다면

재배포가 자유로운 곳입니다. 전부 CC0이라 출처 표기 없이도 쓸 수 있습니다.

- [Quaternius](https://quaternius.com) — 애니메이션 포함 캐릭터, 소품
- [Kenney](https://kenney.nl/assets) — 저폴리 모델, UI
- [Poly Haven](https://polyhaven.com) — HDRI · 텍스처 · 모델

## 코드

`web3d/` 의 소스는 AUTONOMOUS PCC 교육 과정용으로 작성된 것이고,
`cad/examples/` 의 OpenSCAD 예제도 같습니다.

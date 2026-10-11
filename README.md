<div align="center">

### 말로 만든 3D 모델을, 내가 만든 가상 공간에 놓는다.

AUTONOMOUS PCC 바이브코딩 캠프 **2회차(메타버스와 CAD)** 실습 저장소입니다.<br>
오전에 만든 모델이 오후 실습의 재료가 됩니다.

![Day](https://img.shields.io/badge/과정-2회차%20하루-0B1B2D?style=for-the-badge)
![CAD](https://img.shields.io/badge/오전-text--to--CAD-087E9C?style=for-the-badge)
![Web3D](https://img.shields.io/badge/오후-React%20Three%20Fiber-087E9C?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-LTS-16A34A?style=for-the-badge)

[**하루 흐름**](#하루-흐름) · [**오전: CAD**](#오전--text-to-cad) · [**오후: 웹 3D**](#오후--웹-3d-공간) · [**준비물**](#준비물) · [**에셋 출처**](#에셋-출처)

</div>

---

## 하루 흐름

```
오전                                    오후
──────────────────────────────         ──────────────────────────────
말로 설명한다                            내 GLB를 장면에 올린다
   ↓  Codex가 OpenSCAD 코드를 쓴다          ↓
Playground에서 Render                   조명 · 배경을 넣는다
   ↓                                      ↓
형상을 보고 고쳐 요청한다                   캐릭터를 넣고 걸어 다닌다
   ↓                                      ↓
GLB로 내보낸다  ─────────────────────▶   같은 공간에서 서로 만난다
```

오전 산출물은 보통 **10~50 KB짜리 GLB 한 개**입니다. 텍스처가 없어 아주 가볍습니다.

---

## 오전 — text-to-CAD

설치할 것이 없습니다. 브라우저만 있으면 됩니다.

1. **[OpenSCAD Playground](https://ochafik.com/openscad2)** 를 엽니다 (로그인 불필요)
2. Codex에게 만들고 싶은 형상을 **말로** 설명하고 OpenSCAD 코드를 받습니다
3. 코드를 붙여 넣고 **Render**
4. 화면을 보고 **고쳐 달라고 다시 요청**합니다 — 이게 오늘의 핵심 훈련입니다
5. 다 되면 내보내기 형식을 **GLB**로 바꾸고 Download

`cad/examples/` 에 연습용 예제가 있습니다. 순서대로 붙여 넣어 보세요.

| 파일 | 배우는 것 |
|---|---|
| `01_기본도형.scad` | 정육면체 · 구 · 원기둥, `$fn` 의 뜻 |
| `02_합치고_빼기.scad` | `difference()` 로 구멍 파기, `for` 로 반복 |
| `03_치수를_말로.scad` | 치수를 변수로 빼 두기 — AI에게 고쳐 달라고 하기 쉬워집니다 |
| `color_test.scad` | `color()` 가 GLB에 어떻게 들어가는지 확인용 |

> **왜 색을 넣나요?** `color()` 로 칠한 것이 GLB에 **재질(material)로 그대로** 들어갑니다.
> 오후에 그 색 그대로 보입니다. (검증: 색 3개 → material 3개, 텍스처 0장)

---

## 오후 — 웹 3D 공간

`web3d/` 가 시작점입니다. 빈 장면에 바닥과 조명만 있습니다.

```bat
cd web3d
npm ci --offline --cache ./npm-cache
npm run dev
```

브라우저에서 `http://localhost:5173` 을 엽니다. 바닥과 왼쪽 위 성능 패널이 보이면 준비 완료입니다.

> **`npm-cache` 폴더가 없다면** [릴리스 페이지](../../releases)에서 `npm-cache.zip` 을
> 받아 `web3d/` 안에 풀어 주세요. 이것이 있으면 **인터넷 없이 12초**에 설치됩니다.
> 인터넷이 빠르다면 그냥 `npm install` 해도 됩니다.

고칠 파일은 `web3d/src/experience.jsx` 하나입니다. 오전에 만든 GLB를
`web3d/public/` 에 넣고 AI에게 올려 달라고 시키세요.

심화에서 쓸 캐릭터는 `web3d/public/Robot.glb` 에 들어 있습니다.
`Idle` · `Walk` · `Run` · `Fast Run` · `Jump` 애니메이션이 함께 들어 있어서,
WASD로 걸릴 때 애니메이션을 바꿔 주는 것까지 해 볼 수 있습니다.

### 망쳤을 때

```bat
git restore .
```

처음 상태로 돌아옵니다. **마음껏 망치세요.** 그게 이 수업의 방식입니다.

---

## 준비물

수업 **전날까지** 끝내 두세요.

- **Node.js LTS** — https://nodejs.org (설치 중 선택 항목은 기본값)
- **Git** — https://git-scm.com
- **VS Code** 또는 익숙한 편집기
- **Codex** 로그인 (1회차에서 설치한 것 그대로)

확인:

```bat
node --version
npm --version
git --version
```

---

## 에셋 출처

`web3d/public/` 의 3D 파일은 아래 출처이며, 라이선스가 허용하는 것만 담았습니다.

| 파일 | 출처 | 라이선스 |
|---|---|---|
| `Robot.glb` | 강사 제작 (Mixamo 표준 리그 + 애니메이션 5개) | 교육 과정 내 사용 |
| `room-transformed.glb` | [Room](https://sketchfab.com/3d-models/room-6417cbc1870a4a1691cca06912ae0369) by **Anex** (Sketchfab) | **CC BY 4.0** |
| `monkey.glb` | Suzanne (Blender 기본 메시) | 공개 |
| `hdri/adamsbridge.hdr` | [Poly Haven](https://polyhaven.com) | CC0 |

자세한 내용은 [`ATTRIBUTION.md`](ATTRIBUTION.md).

---

<div align="center">
<sub><strong>AUTONOMOUS PCC, Inc.</strong> · (주)오토노머스피씨씨 — 바이브코딩 캠프 2회차 실습</sub><br>
<sub><a href="https://github.com/AUTONOMOUS-PCC-Inc">github.com/AUTONOMOUS-PCC-Inc</a></sub>
</div>

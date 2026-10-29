<div align="center">

<img src="https://raw.githubusercontent.com/AUTONOMOUS-PCC-Inc/.github/main/mirrors/assets/metaverse-banner.svg" alt="바이브코딩 캠프 3회차 — 말로 설명해 형상을 만들고, GLB로 내보내, 내가 만든 웹 3D 공간에 놓는다" width="100%">

### 말로 만든 3D 모델을, 내가 만든 가상 공간에 놓는다.

AUTONOMOUS PCC 바이브코딩 캠프 **3회차(메타버스와 CAD)** 실습 저장소입니다.<br>
오전에 말로 설명해 만든 모델이, 오후에 직접 만든 웹 3D 공간의 재료가 됩니다.

![Day](https://img.shields.io/badge/과정-3회차%20하루-0B1B33?style=for-the-badge)
![AM](https://img.shields.io/badge/오전-text--to--CAD-1E6FD9?style=for-the-badge)
![PM](https://img.shields.io/badge/오후-React%20Three%20Fiber-7C3AED?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-LTS-16A34A?style=for-the-badge)
![Offline](https://img.shields.io/badge/설치-오프라인%2011초-EAB308?style=for-the-badge)

[**시작하기**](#시작하기) · [**폴더 지도**](#폴더-지도) · [**하루 흐름**](#하루-흐름) · [**오전**](#오전--text-to-cad) · [**오후**](#오후--웹-3d-공간) · [**고치는 법**](#고치는-법) · [**자주 막히는 곳**](#자주-막히는-곳)

</div>

---

## 시작하기

> [!IMPORTANT]
> **Node.js는 수업 전에 미리 깔아 두세요.** 나머지는 당일에 해도 됩니다.
> 오전은 설치가 아예 없고, 오후 설치는 인터넷 없이 **11초**면 끝납니다.

```bat
git clone https://github.com/AUTONOMOUS-PCC-Inc/aypi-metaverse-tutorial.git
cd aypi-metaverse-tutorial
```

오전·오후가 **한 저장소**에 들어 있습니다. 받는 건 이 한 번뿐입니다.

| 준비물 | 어디서 | 언제 |
|---|---|---|
| **Node.js LTS** | https://nodejs.org (선택 항목은 전부 기본값) | **수업 전날까지** |
| **Git** | https://git-scm.com | 수업 전날까지 |
| **VS Code** 또는 익숙한 편집기 | https://code.visualstudio.com | 수업 전날까지 |
| **Codex** 로그인 | 1회차에서 쓰던 것 그대로 | — |

깔렸는지 확인:

```bat
node --version
npm --version
git --version
```

세 줄 모두 숫자가 나오면 됩니다. 하나라도 `'node'은(는) 내부 또는 외부 명령...`
이 뜨면 설치가 안 됐거나 **설치 후 터미널을 다시 열지 않은** 것입니다.

---

## 폴더 지도

받고 나면 폴더가 여럿입니다. 하루 종일 "지금 어느 폴더에 있어야 하지"가
가장 자주 막히는 지점이라, 먼저 봐 두면 좋습니다.

<div align="center">
<img src="https://raw.githubusercontent.com/AUTONOMOUS-PCC-Inc/.github/main/mirrors/assets/metaverse-layout.svg" alt="폴더 지도 — 클론에 따라오는 폴더, 직접 고치는 파일, 직접 넣는 파일, 직접 내려받는 폴더를 색으로 구분" width="100%">
</div>

기억할 것은 둘입니다. **고치는 파일은 `web3d/src/experience.jsx` 하나**,
**내 GLB를 넣는 곳은 `web3d/public/`** 입니다.

---

## 하루 흐름

<div align="center">
<img src="https://raw.githubusercontent.com/AUTONOMOUS-PCC-Inc/.github/main/mirrors/assets/metaverse-pipeline.svg" alt="6단계 흐름: 말로 설명 · 렌더 · 고쳐서 GLB 내보내기 · 장면 띄우기 · 내 모델 올리기 · 캐릭터로 걸어 다니기" width="100%">
</div>

| 단계 | 하는 일 | 결과물 |
|:--:|---|---|
| 1 | 만들고 싶은 형상을 Codex에게 **말로** 설명한다 | OpenSCAD 코드 |
| 2 | Playground에 붙여 넣고 **Render** | 화면에 뜬 형상 |
| 3 | 화면을 보고 **고쳐 달라고 다시 요청**한다 → GLB로 내보낸다 | `.glb` 한 개, 10~50 KB |
| 4 | `npm run dev` 로 빈 장면을 띄운다 | 바닥과 조명 |
| 5 | 내 GLB를 `public/` 에 넣고 장면에 올린다 | 내가 만든 물체가 공간 안에 |
| 6 | 캐릭터를 넣고 WASD로 걸어 다닌다 | 내 공간을 내가 돌아다닌다 |

**3단계가 가장 중요합니다.** AI는 한 번에 맞히지 못합니다. "구멍이 너무 크다",
"손잡이를 5mm 위로" 처럼 **화면을 보고 다시 말하는 것**이 오늘 배우는
기술이고, 오후에도 똑같은 일을 합니다.

그리고 3단계 결과물이 5단계의 입력입니다. **오전은 몸풀기가 아니라
오후의 재료를 만드는 시간**입니다.

---

## 오전 — text-to-CAD

설치할 것이 없습니다. 브라우저만 있으면 됩니다.

1. **[OpenSCAD Playground](https://ochafik.com/openscad2)** 를 엽니다 (로그인 불필요)
2. Codex에게 만들고 싶은 형상을 **말로** 설명하고 OpenSCAD 코드를 받습니다
3. 코드를 붙여 넣고 **Render**
4. 화면을 보고 **고쳐 달라고 다시 요청**합니다
5. 다 되면 내보내기 형식을 **GLB**로 바꾸고 Download

`cad/examples/` 에 연습용 예제가 있습니다. 순서대로 붙여 넣어 보세요.

| 파일 | 배우는 것 |
|---|---|
| `01_기본도형.scad` | 정육면체 · 구 · 원기둥, `$fn` 의 뜻 |
| `02_합치고_빼기.scad` | `difference()` 로 구멍 파기, `for` 로 반복 |
| `03_치수를_말로.scad` | 치수를 변수로 빼 두기 — AI에게 고쳐 달라고 하기 쉬워집니다 |
| `color_test.scad` | `color()` 가 GLB에 어떻게 들어가는지 확인용 |

> [!TIP]
> **색을 꼭 넣으세요.** `color()` 로 칠한 것이 GLB에 **재질(material)로 그대로**
> 들어가서, 오후에 그 색 그대로 보입니다. 텍스처가 아니라 재질이라 파일도
> 가볍습니다. (확인해 본 결과: 색 3개 → material 3개, 텍스처 0장)

---

## 오후 — 웹 3D 공간

`web3d/` 가 시작점입니다. 빈 장면에 바닥과 조명만 있습니다.

```bat
cd web3d
npm ci --offline --cache ./npm-cache
npm run dev
```

브라우저에서 `http://localhost:5173` 을 엽니다.
**바닥과 왼쪽 위 성능 패널**이 보이면 준비 완료입니다.

> [!NOTE]
> **`npm-cache` 폴더가 없다면** [릴리스 페이지](https://github.com/AUTONOMOUS-PCC-Inc/aypi-metaverse-tutorial/releases)에서
> `npm-cache.zip` 을 받아 `web3d/` 안에 풀어 주세요. 이게 있으면 **인터넷 없이
> 11초**에 설치됩니다. 인터넷이 빠르면 그냥 `npm install` 해도 됩니다.
> (캐시는 Windows x64용입니다. Mac이면 `npm install` 을 쓰세요.)

고칠 파일은 `web3d/src/experience.jsx` **하나**입니다. 오전에 만든 GLB를
`web3d/public/` 에 넣고 AI에게 올려 달라고 시키세요.

심화에서 쓸 캐릭터는 `web3d/public/Robot.glb` 에 들어 있습니다.
`Idle` · `Walk` · `Run` · `Fast Run` · `Jump` 애니메이션이 함께 들어 있어서,
WASD로 걸을 때 **애니메이션까지 바꿔 주는 것**을 해 볼 수 있습니다.

쓸 수 있는 에셋은 저장소 맨 위 `AGENTS.md` 에 표로 적어 두었습니다.
AI가 그 파일을 먼저 읽으니, 없는 파일 이름을 지어내지 않습니다.

---

## 고치는 법

오전과 오후에 쓰는 도구는 다르지만, **하는 일은 같습니다.**

<div align="center">
<img src="https://raw.githubusercontent.com/AUTONOMOUS-PCC-Inc/.github/main/mirrors/assets/metaverse-loop.svg" alt="같은 루프 두 번 — 말하고, 화면을 보고, 다시 말한다. 오전은 OpenSCAD로, 오후는 R3F로" width="100%">
</div>

```bat
git restore .
```

처음 상태로 돌아옵니다. `public/` 에 넣은 내 GLB는 git이 추적하지 않으니
**지워지지 않습니다.** 되돌릴 길이 있으니 **마음껏 망치세요.**
그게 이 수업의 방식입니다.

---

## 자주 막히는 곳

| 증상 | 원인과 해결 |
|---|---|
| `'node'은(는) 내부 또는 외부 명령...` | Node.js를 깔고 **터미널을 다시 열지 않았습니다.** 창을 닫고 새로 여세요. 그래도 안 되면 설치가 안 된 것입니다 |
| `npm ci` 가 한참 돌다가 실패한다 | `web3d/` **안에서** 돌려야 합니다. 저장소 맨 위에서 돌리면 `package.json` 을 못 찾습니다 |
| `npm ci --offline` 이 `ENOTCACHED` 로 멈춘다 | `npm-cache` 폴더가 없거나 엉뚱한 자리입니다. `web3d/npm-cache/` 여야 합니다. 급하면 `--offline --cache ./npm-cache` 를 빼고 그냥 `npm install` |
| 화면이 **까맣다** | 조명이 없거나 카메라가 물체 안에 들어가 있습니다. 마우스로 드래그해 돌려 보세요. 그래도 까맣으면 F12 콘솔의 빨간 줄을 AI에게 그대로 보여 주세요 |
| GLB를 넣었더니 화면이 **잠깐 통째로 빈다** | 불러오는 중입니다. 가운데 진행률 표시가 사라질 때까지 기다리세요. 3MB짜리 캐릭터는 몇 초 걸립니다 |
| GLB를 올렸는데 **안 보인다** | 가장 먼저 **크기**를 의심하세요. OpenSCAD는 mm, three.js는 m 기준이라 100mm짜리가 100m로 들어옵니다. `scale={0.01}` 을 먼저 해 보세요 |
| GLB가 **까맣게**만 보인다 | 색을 안 넣고 내보냈습니다. Playground로 돌아가 `color()` 를 넣고 다시 내보내세요 |
| AI가 고친 뒤 **화면이 아예 안 뜬다** | 코드가 깨졌습니다. `git restore .` 로 되돌리고, 한 번에 하나씩만 고쳐 달라고 하세요 |
| 저장했는데 화면이 안 바뀐다 | `npm run dev` 가 꺼졌습니다. 터미널을 보세요. 포트가 물려 있으면 주소가 `5174` 로 바뀌어 있기도 합니다 |

그래도 안 되면 **에러 메시지 전체와 F12 콘솔 화면**을 강사에게 보여 주세요.
마지막 줄만 보면 원인을 못 찾는 경우가 많습니다.

---

## 에셋 출처

`web3d/public/` 의 3D 파일은 아래 출처이며, **재배포가 허용되는 것만** 담았습니다.

| 파일 | 출처 | 라이선스 |
|---|---|---|
| `Robot.glb` | 강사 제작 (Mixamo 표준 리그 + 애니메이션 5개) | 교육 과정 내 사용 |
| `room-transformed.glb` | [Room](https://sketchfab.com/3d-models/room-6417cbc1870a4a1691cca06912ae0369) by **Anex** (Sketchfab) | **CC BY 4.0** |
| `monkey.glb` | Suzanne (Blender 기본 메시) | 공개 |
| `hdri/adamsbridge.hdr` | [Poly Haven](https://polyhaven.com/a/adams_place_bridge) | CC0 |

담은 것과 **일부러 뺀 것**, 그 이유는 [`ATTRIBUTION.md`](ATTRIBUTION.md)에 있습니다.
에셋을 더 받고 싶으면 [Quaternius](https://quaternius.com) ·
[Kenney](https://kenney.nl/assets) · [Poly Haven](https://polyhaven.com) 이
전부 CC0라 안전합니다.

---

## 만든 사람들

|     EL     |
|   :-----:   |
|   Aaron Yoon    |

<!--
EL: Aaron Yoon
-->

`cad/examples/` 의 OpenSCAD 예제와 `web3d/` 의 소스는 이 과정을 위해 쓴 것입니다.
3D 에셋은 각자 라이선스가 다르니 [`ATTRIBUTION.md`](ATTRIBUTION.md)를 보세요.

1회차 실습 저장소는 [`aypi-car-tutorial`](https://github.com/AUTONOMOUS-PCC-Inc/aypi-car-tutorial),
2회차는 [`aypi-turtlebot-tutorial`](https://github.com/AUTONOMOUS-PCC-Inc/aypi-turtlebot-tutorial) 입니다.

---

<div align="center">
<sub><strong>AUTONOMOUS PCC, Inc.</strong> · (주)오토노머스피씨씨 — 바이브코딩 캠프 3회차 실습</sub><br>
<sub><a href="https://github.com/AUTONOMOUS-PCC-Inc">github.com/AUTONOMOUS-PCC-Inc</a></sub>
</div>

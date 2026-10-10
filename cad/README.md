# cad — 오전 실습 예제

설치할 것이 없습니다. [OpenSCAD Playground](https://ochafik.com/openscad2)를
브라우저로 열고 (로그인 불필요) `examples/` 의 코드를 붙여 넣어 Render 하세요.

| 파일 | 배우는 것 |
|---|---|
| `01_기본도형.scad` | 정육면체 · 구 · 원기둥, `$fn` 의 뜻 |
| `02_합치고_빼기.scad` | `difference()` 로 구멍 파기, `for` 로 반복 |
| `03_치수를_말로.scad` | 치수를 변수로 빼 두기 |
| `color_test.scad` | `color()` 가 GLB에 재질로 들어가는지 확인 |

## GLB로 내보내기

Render 뒤에 버튼 옆 화살표를 눌러 **GLB (binary glTF)** 를 고르고 Download.
그 파일을 `../web3d/public/` 에 넣으면 오후 실습 재료가 됩니다.

## AI에게 시킬 때

- **치수를 숫자로** 말하세요. "큰 원기둥"이 아니라 "지름 16mm, 높이 24mm"
- 한 번에 완성하려 하지 말고, **렌더를 보고 고쳐 달라고** 하세요
- 색을 넣어 달라고 하세요. `color()` 는 GLB에 재질로 남습니다

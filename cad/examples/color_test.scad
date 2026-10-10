// 2회차 드라이런 검증용 모델 — OpenSCAD Playground → GLB 경로 확인
//
// 확인한 것 (2026-10-11):
//   - ochafik.com/openscad2 에서 로그인 없이 Render → Download GLB 가능
//   - color() 세 개가 GLB에 PBR material 3개로 그대로 들어간다
//     SteelBlue → baseColorFactor [0.275, 0.510, 0.706, 1]
//     Tomato    → [1, 0.388, 0.278, 1]
//     Gold      → [1, 0.843, 0, 1]
//   - 결과 46.2 KB · 삼각형 2,500 · 정점 1,256 · 텍스처 0장
//     → Arrival.Space 최적화 가이드("텍스처 1K 이하, 512 권장")를 자동으로 만족
//
// 수업에서 쓰는 법: 학생이 Codex에게 "이런 모양을 OpenSCAD로 만들어 줘"라고 시키고,
// 받은 코드를 Playground에 붙여 Render → Download GLB → Arrival.Space 업로드.

$fn = 48;

color("SteelBlue")
  cube([40, 40, 6], center = true);

color("Tomato")
  translate([0, 0, 15])
    cylinder(h = 24, r = 5, center = true);

color("Gold")
  translate([0, 0, 32])
    sphere(r = 9);

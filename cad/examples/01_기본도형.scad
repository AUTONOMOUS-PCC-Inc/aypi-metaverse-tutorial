// 01 — 기본 도형 세 가지
//
// OpenSCAD는 "코드로 형상을 쓰는" CAD입니다.
// 아래를 Playground에 붙여 넣고 Render를 눌러 보세요.

$fn = 32;              // 곡면을 몇 조각으로 쪼갤지. 클수록 매끄럽고 무겁다

cube([20, 20, 20], center = true);

translate([30, 0, 0])
  sphere(r = 10);

translate([-30, 0, 0])
  cylinder(h = 20, r = 8, center = true);

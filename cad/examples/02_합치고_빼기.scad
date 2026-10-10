// 02 — 합치고 빼기 (불리언)
//
// CAD의 핵심 동작입니다. 덩어리에서 구멍을 파내는 식으로 형상을 만듭니다.

$fn = 48;

difference() {                       // 앞의 것에서 뒤의 것들을 빼낸다
  cube([40, 40, 12], center = true);

  cylinder(h = 20, r = 8, center = true);          // 가운데 구멍

  for (x = [-14, 14], y = [-14, 14])               // 네 귀퉁이 나사 구멍
    translate([x, y, 0])
      cylinder(h = 20, r = 2.5, center = true);
}

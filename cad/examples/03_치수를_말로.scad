// 03 — 치수를 변수로 빼 두기
//
// AI에게 고쳐 달라고 할 때 "기둥을 3mm 더 굵게"처럼 말하려면
// 숫자가 코드 여기저기 흩어져 있으면 안 됩니다. 위에 모아 둡니다.

$fn = 48;

base_w   = 40;   // 받침 가로·세로 (mm)
base_h   = 6;    // 받침 두께
post_r   = 5;    // 기둥 반지름
post_h   = 24;   // 기둥 높이
ball_r   = 9;    // 공 반지름

color("SteelBlue")
  cube([base_w, base_w, base_h], center = true);

color("Tomato")
  translate([0, 0, base_h/2 + post_h/2])
    cylinder(h = post_h, r = post_r, center = true);

color("Gold")
  translate([0, 0, base_h/2 + post_h + ball_r - 1])
    sphere(r = ball_r);

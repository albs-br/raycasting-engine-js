// Import stylesheets
import './style.css';

import Player from './player.ts';

let objCanvasMap = document.getElementById('canvasMap');
let c = objCanvasMap.getContext('2d');

let objCanvasScr = document.getElementById('canvasScr');
let cs = objCanvasScr.getContext('2d');

let p = new Player();
p.c = c;
p.X = 128;
p.Y = 128;
p.Angle = 20;

const map: number[] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
];

// Game loop
window.setInterval(function () {
  DrawMap();

  DrawScreen();

  //let s = `{p.X}, {p.Y}, {p.Angle}`;
  let s2 = 'x: ' + p.X + ', y: ' + p.Y + ', a: ' + p.Angle;
  document.getElementById('debuginfo').innerHTML = s2;

  p.Draw();
}, 16); // 60fps

// Handle keyboard input
document.getElementsByTagName('body')[0].onkeydown = function (e) {
  var ev = e || event;

  // if (ev.keyCode == 70) {
  //   //&& ev.ctrlKey) {
  //   //do something...
  // }

  const STEP_SIZE = 1;
  const ANGLE_STEP = 2;

  let a = p.getAngle();
  if (ev.key == 'ArrowLeft') {
    a -= ANGLE_STEP;
    p.setAngle(a);
  }
  if (ev.key == 'ArrowRight') {
    a += ANGLE_STEP;
    p.setAngle(a);
  }

  if (ev.key == 'ArrowUp') {
    p.X = p.X + STEP_SIZE * Math.cos((a * Math.PI) / 180);

    // cap X to 8.8 fixed point precision
    //p.X = Math.round((p.X / 256) * 256);

    p.Y = p.Y + STEP_SIZE * Math.sin((a * Math.PI) / 180);
  } else if (ev.key == 'ArrowDown') {
    p.X = p.X - STEP_SIZE * Math.cos((a * Math.PI) / 180);
    p.Y = p.Y - STEP_SIZE * Math.sin((a * Math.PI) / 180);
  }
};

// let degrees = 180;
// let radians = (degrees * Math.PI) / 180;
// Math.sin(radians);

function DrawMap() {
  // Draw map
  c.clearRect(0, 0, objCanvasMap.width, objCanvasMap.height);
  c.strokeRect(0, 0, 256, 256);

  for (let y = 0; y < 16; y++) {
    for (let x = 0; x < 16; x++) {
      c.beginPath();
      if (map[y][x] == 1) {
        c.strokeStyle = 'red';
      } else {
        c.strokeStyle = 'lightgray';
      }
      c.strokeRect(x * 16, y * 16, 16, 16);
      c.closePath();
    }
  }
}

function DrawScreen() {
  const FOV = 60; // field of view
  const SCREEN_COLS = 256;

  let angle = p.getAngle() - FOV / 2;

  // Clear screen and draw ceilng/floor
  cs.clearRect(0, 0, objCanvasScr.width, objCanvasScr.height);
  cs.strokeRect(0, 0, 256, 192);

  var grd = cs.createLinearGradient(0, 96, 0, 192);
  grd.addColorStop(0, 'red');
  grd.addColorStop(1, 'white');
  cs.fillStyle = grd;
  cs.fillRect(0, 96, 256, 192);

  var grd = cs.createLinearGradient(0, 0, 0, 96);
  grd.addColorStop(0, 'white');
  grd.addColorStop(1, 'blue');
  cs.fillStyle = grd;
  cs.fillRect(0, 0, 256, 96);

  // for each screen column
  for (let col = 0; col < SCREEN_COLS; col++) {
    // cast ray from player until find a wall
    const RAY_STEP = 1;
    const MAX_DISTANCE = 256;
    let wallFound: boolean = false;
    let distance = 0;
    let rayX = p.X;
    let rayY = p.Y;

    let stepX = RAY_STEP * Math.cos((angle * Math.PI) / 180);
    let stepY = RAY_STEP * Math.sin((angle * Math.PI) / 180);

    while (!wallFound && distance < MAX_DISTANCE) {
      rayX += stepX;
      rayY += stepY;

      distance += RAY_STEP;

      // check if ray is inside map
      if (rayX < 0 || rayX >= 256 || rayY < 0 || rayY >= 256) {
        wallFound = true;
        distance = MAX_DISTANCE;
      } else {
        // check if map cell is a wall
        if (map[Math.floor(rayY / 16)][Math.floor(rayX / 16)] != 0) {
          wallFound = true;
        }
      }
    }

    let columnHeight = 192 - (distance / MAX_DISTANCE) * 192;

    let columnColor =
      '#' +
      (256 - distance).toString(16) +
      (256 - distance).toString(16) +
      (256 - distance).toString(16);

    // Draw column on screen, based on distance
    cs.beginPath();
    cs.strokeStyle = columnColor;
    cs.strokeRect(col, 192 / 2 - columnHeight / 2, 1, columnHeight);
    cs.closePath();

    angle += FOV / SCREEN_COLS;
  }
}

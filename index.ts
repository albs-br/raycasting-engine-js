// Import stylesheets
import './style.css';

import Player from './player.ts';

let objCanvasMap = document.getElementById('canvasMap');
let c = objCanvasMap.getContext('2d');

let objCanvasScr = document.getElementById('canvasScr');
let cs = objCanvasScr.getContext('2d');

let p = new Player();
p.c = c;
// p.X = 100;
// p.Y = 20;
// p.Angle = 60;
p.X = 187;
p.Y = 212;
p.Angle = 164;

// const map: number[] = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
//   [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
// ];

const map: number[] = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
];

// Game loop
window.setInterval(function () {
  ReadInput();

  DrawMap();

  DrawScreen();

  //let s = `{p.X}, {p.Y}, {p.Angle}`;
  let s2 = 'x: ' + p.X + ', y: ' + p.Y + ', a: ' + p.Angle;
  document.getElementById('debuginfo').innerHTML = s2;

  p.Draw();
}, 33); // 30fps

// Handle keyboard input
let key = [];

let objBody = document.getElementsByTagName('body')[0];
objCanvasScr.focus();
objBody.onmouseover = function () {
  objCanvasScr.focus();
};
//objCanvasScr.onkeydown = objCanvasScr.onkeyup = function (e) {
objBody.onkeydown = objBody.onkeyup = function (e) {
  e = e || event;
  key[e.code] = e.type == 'keydown';
};

const STEP_SIZE = 1;
const ANGLE_STEP = 2;

function ReadInput() {
  let a = p.getAngle();
  if (key['ArrowLeft'] || key['KeyA']) {
    if (key['KeyZ']) {
      // using Z as ALT key
      // strafe player left
      MovePlayer(p.getAngle() - 90);
    } else {
      a -= ANGLE_STEP;
      p.setAngle(a);
    }
  }

  if (key['ArrowRight'] || key['KeyD']) {
    if (key['KeyZ']) {
      // using Z as ALT key
      // strafe player right
      MovePlayer(p.getAngle() + 90);
    } else {
      a += ANGLE_STEP;
      p.setAngle(a);
    }
  }

  if (key['ArrowUp'] || key['KeyW']) {
    MovePlayer(p.getAngle());
  } else if (key['ArrowDown'] || key['KeyS']) {
    MovePlayer(p.getAngle() - 180);
  }
}

function MovePlayer(a) {
  let newX = p.X + STEP_SIZE * Math.cos((a * Math.PI) / 180);
  let newY = p.Y + STEP_SIZE * Math.sin((a * Math.PI) / 180);

  if (PositionIsValid(newX, newY)) {
    // cap X to 8.8 fixed point precision
    //p.X = Math.round((p.X / 256) * 256);

    p.X = newX;
    p.Y = newY;
  }
}

function PositionIsValid(x, y) {
  return (
    x >= 0 &&
    x < 256 &&
    y >= 0 &&
    y < 256 &&
    map[Math.floor(y / 16)][Math.floor(x / 16)] == 0
  );
}

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
  const FOV = 60; // field of view in degrees

  const SCREEN_COLS = 256;
  //const SCREEN_COLS = 64;

  const RAY_STEP = 256 / SCREEN_COLS;
  const COLUMN_WIDTH = 256 / SCREEN_COLS;
  const MAX_DISTANCE = 256;

  // set initial angle
  let angle = p.getAngle() - FOV / 2;

  //TODO: this should be done once at game init, not in game loop...
  // calc angles for current number of screen cols
  let tempAngles = [];
  let fovAngles = [];
  //for (let i = SCREEN_COLS / 2; i >= 1; i--) {
  for (let i = 1; i <= SCREEN_COLS / 2; i++) {
    let angleInRadians = Math.atan((COLUMN_WIDTH * i) / 1);

    // convert to degrees (Degrees = Radians × 180 / π)
    let angleInDegrees = (angleInRadians * 180) / Math.PI;

    // store angles, in relation to player's forward direction
    tempAngles.push(angleInDegrees);
  }
  // store the angle, in relation to player's start of FOV
  for (let i = 0; i < SCREEN_COLS; i++) {
    fovAngles.push(tempAngles[i] - tempAngles[0]);
  }
  // compute the other half of angles FOV (symetrical)
  // let j = SCREEN_COLS/2 - 1;
  // for (let i = 0; i < SCREEN_COLS; i++) {
  //   fovAngles.push(-fovAngles[j]);
  //   j--;
  // }

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
    let wallFound: boolean = false;
    let distance = 0;
    let rayX = p.X;
    let rayY = p.Y;

    // step from -0.5 to +0.5 in equal increments
    //let progress = col / SCREEN_COLS - 0.5;

    //angle += progress;

    let stepX = RAY_STEP * Math.cos((angle * Math.PI) / 180);
    let stepY = RAY_STEP * Math.sin((angle * Math.PI) / 180);

    // stepX += progress;
    // stepY += progress;

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

    // test
    // if (distance > 255) distance = 255;
    // if (distance < 0) distance = 0;

    // this is supposed to fix the "fisheye effect"
    let z = distance * Math.cos(((p.Angle - angle) * Math.PI) / 180);

    // test
    // if (z > 256) z = 256;
    // if (z < 0) z = 0;

    const MIN_COLUMN_HEIGHT = 32;
    const MAX_COLUMN_HEIGHT = 192;

    let columnHeight = 192 - (z / 256) * 192; // height on 0-192 range
    //let columnHeight = 192 * (192 / z);

    columnHeight =
      MIN_COLUMN_HEIGHT +
      (columnHeight / MAX_COLUMN_HEIGHT) *
        (MAX_COLUMN_HEIGHT - MIN_COLUMN_HEIGHT);

    let columnColor =
      'rgb(' +
      (255 - distance) +
      ', ' +
      (255 - distance) +
      ', ' +
      (255 - distance) +
      ')';

    // Draw column on screen, based on distance
    cs.beginPath();
    cs.fillStyle = columnColor;
    cs.fillRect(
      col * COLUMN_WIDTH,
      192 / 2 - columnHeight / 2,
      COLUMN_WIDTH,
      columnHeight
    );
    cs.closePath();

    angle += FOV / SCREEN_COLS;
  }
}

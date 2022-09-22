// Import stylesheets
import './style.css';

import Player from './player.ts';

let objCanvasMap = document.getElementById('canvasMap');
let c = objCanvasMap.getContext('2d');

let objCanvasScr = document.getElementById('canvasScr');
let cs = objCanvasScr.getContext('2d');

let p = new Player();
// p.X = 100;
// p.Y = 20;
// p.setAngle(60);
p.X = 187;
p.Y = 212;
p.setAngle(164);

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

const gameLoop = function () {
  ReadInput();

  DrawMap();

  DrawScreen();

  //let s = `{p.X}, {p.Y}, {p.Angle}`;
  let s2 = 'x: ' + p.X + ', y: ' + p.Y + ', a: ' + p.Angle;
  document.getElementById('debuginfo').innerHTML = s2;
};

// Game loop
window.setInterval(gameLoop, 33); // 30fps
//window.setTimeout(gameLoop, 100); // debug

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

  DrawPlayerOnMap();
}

function DrawPlayerOnMap() {
  const ARROW_SIZE = 16;

  // center of field of view vector
  let angle = p.getAngle();
  c.beginPath();
  c.strokeStyle = 'red';
  c.moveTo(p.X, p.Y);
  c.lineTo(
    p.X + ARROW_SIZE * Math.cos((angle * Math.PI) / 180),
    p.Y + ARROW_SIZE * Math.sin((angle * Math.PI) / 180)
  );
  c.stroke();
  c.closePath();

  // start of field of view vector
  angle = p.getAngle() - FOV / 2;
  c.beginPath();
  c.strokeStyle = 'black';
  c.moveTo(p.X, p.Y);
  c.lineTo(
    p.X + ARROW_SIZE * 2 * Math.cos((angle * Math.PI) / 180),
    p.Y + ARROW_SIZE * 2 * Math.sin((angle * Math.PI) / 180)
  );
  c.stroke();
  c.closePath();

  // end of field of view vector
  angle = p.getAngle() + FOV / 2;
  c.beginPath();
  c.strokeStyle = 'black';
  c.moveTo(p.X, p.Y);
  c.lineTo(
    p.X + ARROW_SIZE * 2 * Math.cos((angle * Math.PI) / 180),
    p.Y + ARROW_SIZE * 2 * Math.sin((angle * Math.PI) / 180)
  );
  c.stroke();
  c.closePath();

  //c.strokeRect(this.X, this.Y, 100 * Math.sin((this.Angle * Math.PI) / 180), 100);
  c.strokeRect(p.X, p.Y, 1, 1);
}

const FOV = 60; // field of view in degrees

const SCREEN_COLS = 256;
//const SCREEN_COLS = 64;

const RAY_STEP = 256 / SCREEN_COLS;
const COLUMN_WIDTH = 256 / SCREEN_COLS;
const MAX_DISTANCE = 256;

function DrawScreen() {
  // -------------------------------------------

  //TODO: this should be done once at game init, not in game loop...

  // calc angles for current number of screen cols
  let tempAngles = [];
  let fovAngles = [];

  // convert to radians (Radians = Degrees × π / 180)
  let d = SCREEN_COLS / 2 / Math.tan(((FOV / 2) * Math.PI) / 180); // fixed value (distance from player to viewplane, at forward direction)

  // debug:
  //console.log(d);
  // d = adj = 221.7
  // oposite = 128 (half of SCREEN_COLS)
  // tg(a) = oposite / adj = 128 / 221.7 = 0.57
  // tg(30) = 0.57

  for (let i = SCREEN_COLS / 2; i >= 1; i--) {
    //for (let i = 1; i <= SCREEN_COLS / 2; i++) {
    let angleInRadians = Math.atan((COLUMN_WIDTH * i) / d);

    //console.log(angleInRadians);

    // convert to degrees (Degrees = Radians × 180 / π)
    let angleInDegrees = (angleInRadians * 180) / Math.PI;

    // store angles, in relation to player's forward direction (which is perpendicular to the view plane)
    tempAngles.push(angleInDegrees);

    //console.log(angleInDegrees);
  }

  //console.log(tempAngles.length);

  // store the angle, in relation to player's start of FOV
  fovAngles.push(0);
  for (let i = 0; i < SCREEN_COLS / 2 - 1; i++) {
    let t = tempAngles[i] - tempAngles[i + 1];
    fovAngles.push(t);

    //console.log(t);
  }

  // compute the other half of angles FOV (symetrical)
  let j = SCREEN_COLS / 2 - 1;
  for (let i = 0; i < SCREEN_COLS / 2; i++) {
    fovAngles.push(fovAngles[j]);
    j--;
  }

  //console.log(fovAngles.length);
  //console.log(fovAngles);

  // ------------------------------------------------

  // Clear screen and draw ceiling/floor
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

  // ------------------------------------------------

  // set initial to start of FOV
  let angle = p.getAngle() - FOV / 2;

  // for each screen column
  for (let col = 0; col < SCREEN_COLS; col++) {
    //angle += fovAngles[col];

    // cast ray from player until find a wall
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

    // test
    // if (distance > 255) distance = 255;
    // if (distance < 0) distance = 0;

    // this is supposed to fix the "fisheye effect"
    let z = distance * Math.cos(((p.Angle - angle) * Math.PI) / 180);
    //let z = distance;

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

  //-----------------------------------------------

  // cover top and bottom of screen
  cs.beginPath();
  cs.fillStyle = 'white';
  cs.fillRect(0, 0, 256, 32);
  cs.closePath();

  cs.beginPath();
  cs.fillStyle = 'white';
  cs.fillRect(0, 192 - 32, 256, 32);
  cs.closePath();
}

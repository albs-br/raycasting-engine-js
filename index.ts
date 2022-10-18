// Import stylesheets
import './style.css';

import Player from './player.ts';

const FOV = 64; // field of view in degrees

//const SCREEN_COLS = 256;
//const SCREEN_COLS = 64;
const SCREEN_COLS = 32;

const FPS = 20; // suggested values: 10, 20, 30, 60
const TIME_PER_FRAME = 1000 / FPS; // time per frame in ms

const RAY_STEP = 1;
const COLUMN_WIDTH = 256 / SCREEN_COLS;
const MAX_DISTANCE = 256;

const STEP_SIZE = 1 * (60 / FPS);
const ANGLE_STEP = 2 * (60 / FPS);

let objCanvasMap = document.getElementById('canvasMap');
let c = objCanvasMap.getContext('2d');

let objCanvasScr = document.getElementById('canvasScr');
let cs = objCanvasScr.getContext('2d');

//
let p = new Player();
// p.X = 100;
// p.Y = 20;
// p.setAngle(60);
// p.X = 187;
// p.Y = 212;
// p.setAngle(164);
// p.X = 100;
// p.Y = 40;
// p.setAngle(90);
p.X = 138;
p.Y = 139;
p.setAngle(245);

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

// const map: number[] = [
//   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
//   [1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
//   [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
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
  [1, 0, 0, 0, 0, 0, 2, 0, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1],
];

const gameLoop = function () {
  ReadInput();

  DrawMap();

  DrawScreen();

  //let s = `{p.X}, {p.Y}, {p.Angle}`;
  let s2 =
    'SCR_COLS: ' +
    SCREEN_COLS +
    ', FPS: ' +
    FPS +
    ', STEP_SIZE: ' +
    STEP_SIZE +
    ', ANGLE_STEP: ' +
    ANGLE_STEP +
    ', a: ' +
    p.Angle +
    ', x: ' +
    p.X +
    ', y: ' +
    p.Y;
  document.getElementById('debuginfo').innerHTML = s2;
};

// Game loop
window.setInterval(gameLoop, TIME_PER_FRAME);
//window.setTimeout(gameLoop, 1000); // debug

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

function ReadInput() {
  let a = p.getAngle();

  if (key['KeyO']) {
    document.getElementById('canvasMap').style.display = 'none';
  }
  if (key['KeyP']) {
    document.getElementById('canvasMap').style.display = 'block';
  }

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

    // cap to int (0-255)
    newX = Math.round(newX);
    newY = Math.round(newY);

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
        c.strokeRect(x * 16, y * 16, 16, 16);
        c.fillStyle = 'pink';
        c.fillRect(x * 16, y * 16, 16, 16);
      } else if (map[y][x] == 2) {
        c.fillStyle = 'lightblue';
        c.fillRect(x * 16, y * 16, 16, 16);
      } else {
        c.strokeStyle = 'lightgray';
        c.strokeRect(x * 16, y * 16, 16, 16);
      }
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

// -------------------------------------------

// calc angles for current number of screen cols
// these pre calc angles may or may not be used (it doesn't semm to make a big difference)

let tempAngles = [];
let fovAngles = [];

// convert to radians (Radians = Degrees × π / 180)
//let d = SCREEN_COLS / 2 / Math.tan(((FOV / 2) * Math.PI) / 180); // fixed value (distance from player to viewplane, at forward direction)
let d = 256 / 2 / Math.tan(((FOV / 2) * Math.PI) / 180); // fixed value (distance from player to viewplane, at forward direction)

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

function DrawScreen() {
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

  // set initial angle to start of FOV
  let angle = p.getAngle() - FOV / 2;

  let objectFound: boolean = false;
  let arrayObjectsFound = [];

  // for each screen column
  for (let col = 0; col < SCREEN_COLS; col++) {
    // // using precalculated fovAngles
    // angle += fovAngles[col];

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
        // check if map cell is a wall/object
        let mapCell = map[Math.floor(rayY / 16)][Math.floor(rayX / 16)];
        if (mapCell == 1) {
          wallFound = true;
        } else if (mapCell == 2 && !objectFound) {
          objectFound = true;

          // TODO: fix code repetition
          let z = distance * Math.cos(((p.Angle - angle) * Math.PI) / 180);
          z = z * 1.5; // adjust to make walls look smaller
          let columnHeight = 1 / (0.0001 * z);

          let newObject = {
            X: col * COLUMN_WIDTH,
            Y: 192 / 2,
            Width: columnHeight / 2 / 2,
            Height: columnHeight / 2,
          };
          arrayObjectsFound.push(newObject);
        }
      }
    }

    // test
    // if (distance > 255) distance = 255;
    // if (distance < 0) distance = 0;

    // fix the "fisheye effect"
    let z = distance * Math.cos(((p.Angle - angle) * Math.PI) / 180);
    //let z = distance;

    z = z * 1.5; // adjust to make walls look smaller

    // test
    // if (z > 256) z = 256;
    // if (z < 0) z = 0;

    // const MIN_COLUMN_HEIGHT = 32;
    // const MAX_COLUMN_HEIGHT = 192;

    // let columnHeight = 192 - (z / 256) * 192; // height on 0-192 range
    // //let columnHeight = 192 * (192 / z);

    // columnHeight =
    //   MIN_COLUMN_HEIGHT +
    //   (columnHeight / MAX_COLUMN_HEIGHT) *
    //     (MAX_COLUMN_HEIGHT - MIN_COLUMN_HEIGHT);

    let columnHeight = 1 / (0.0001 * z);

    let colorFactor = 256 / 8; // only 6 shades of gray + white and black

    let columnColor =
      'rgb(' +
      Math.round((255 - distance) / colorFactor) * colorFactor +
      ', ' +
      Math.round((255 - distance) / colorFactor) * colorFactor +
      ', ' +
      Math.round((255 - distance) / colorFactor) * colorFactor +
      ')';

    // Draw column on screen, based on distance
    cs.beginPath();
    cs.fillStyle = columnColor;
    //if (!halfHeightWall) {
    cs.fillRect(
      col * COLUMN_WIDTH,
      192 / 2 - columnHeight / 2,
      COLUMN_WIDTH,
      columnHeight
    );
    // } else {
    //   cs.fillRect(col * COLUMN_WIDTH, 192 / 2, COLUMN_WIDTH, columnHeight / 2);
    // }
    cs.closePath();

    // using fixed angles
    angle += FOV / SCREEN_COLS;
  }

  //-----------------------------------------------

  // // cover top and bottom of screen
  // cs.beginPath();
  // cs.fillStyle = 'white';
  // cs.fillRect(0, 0, 256, 32);
  // cs.closePath();

  // cs.beginPath();
  // cs.fillStyle = 'white';
  // cs.fillRect(0, 192 - 32, 256, 32);
  // cs.closePath();

  //-----------------------------------------------

  // draw objects
  for (let i = 0; i < arrayObjectsFound.length; i++) {
    cs.beginPath();
    cs.strokeStyle = 'blue';
    cs.strokeRect(
      arrayObjectsFound[i].X,
      arrayObjectsFound[i].Y,
      arrayObjectsFound[i].Width,
      arrayObjectsFound[i].Height
    );
    // } else {
    //   cs.fillRect(col * COLUMN_WIDTH, 192 / 2, COLUMN_WIDTH, columnHeight / 2);
    // }
    cs.closePath();
  }
}

// Import stylesheets
import './style.css';

import Player from './player.ts';

let objCanvasMap = document.getElementById('canvasMap');
let c = objCanvasMap.getContext('2d');
//c.moveTo(0, 0);
//c.lineTo(255, 191);
//c.stroke();

c.strokeRect(0, 0, 256, 256);

c.strokeRect(16, 32, 16, 16);
c.strokeRect(16, 16, 16, 16);

let p = new Player();
p.c = c;
p.X = 128;
p.Y = 128;
p.Angle = 15;

window.setInterval(function () {
  //console.info('dd');
  c.clearRect(0, 0, objCanvasMap.width, objCanvasMap.height);

  //let s = `{p.X}, {p.Y}, {p.Angle}`;
  let s2 = 'x: ' + p.X + ', y: ' + p.Y + ', a: ' + p.Angle;
  document.getElementById('debuginfo').innerHTML = s2;

  p.Draw();
}, 16); // 60fps

// console.log('test');

// window.addEventListener('load', function() {
//   console.log('All assets are loaded')
// })

// //window.onload = function () {
// document.addEventListener("DOMContentLoaded", function(event) {
//   console.log('onload');
// });

document.getElementsByTagName('body')[0].onkeydown = function (e) {
  var ev = e || event;

  //console.log(ev);

  // if (ev.keyCode == 70) {
  //   //&& ev.ctrlKey) {
  //   //do something...
  // }
  if (ev.key == 'ArrowLeft') {
    p.Angle--;
  } else if (ev.key == 'ArrowRight') {
    p.Angle++;
  }
};

// $(function () {
//   console.log('jquery');
// });

// let degrees = 180;
// let radians = (degrees * Math.PI) / 180;
// Math.sin(radians);

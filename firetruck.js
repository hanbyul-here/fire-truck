var mainCanvas = document.getElementById('mainCanvas');
var mainCtx = mainCanvas.getContext('2d');

var bangPositions = [];
var chaPositions = [];

mainCanvas.addEventListener("mousemove", throttle(function (e) {
    findxy('move', e)
}, 10) , false);
mainCanvas.addEventListener("mousedown", function (e) {
    findxy('down', e)
}, false);
mainCanvas.addEventListener("mouseup", function (e) {
    findxy('up', e)
}, false);
mainCanvas.addEventListener("mouseout", function (e) {
    findxy('out', e)
}, false);

var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false;

function findxy(res, e) {
  if (res == 'down') {
    prevX = currX;
    prevY = currY;
    currX = e.clientX - mainCanvas.offsetLeft;
    currY = e.clientY - mainCanvas.offsetTop;
    flag = true;
    dot_flag = true;
    if (dot_flag) {
      chaPositions.push({
        x: currX,
        y: currY
      })
      // mainCtx.beginPath();
      // mainCtx.ellipse(prevX, prevY, 10, 10, 45 * Math.PI/180, 0, 2 * Math.PI);
      // mainCtx.fill();
      // mainCtx.stroke();
      // mainCtx.closePath();
      // dot_flag = false;
    }
  }
  if (res == 'up' || res == "out") {
      flag = false;
  }
  if (res == 'move') {
    if (flag) {
      prevX = currX;
      prevY = currY;
      currX = e.clientX - mainCanvas.offsetLeft;
      currY = e.clientY - mainCanvas.offsetTop;
      draw();
    }
  }
}

function draw() {
  chaPositions.push({
    x: currX,
    y: currY
  })
  // mainCtx.beginPath();
  // mainCtx.strokeStyle = imageColor;
  // mainCtx.ellipse(currX, currY, 10, 10, 45 * Math.PI/180, 0, 2 * Math.PI);
  // mainCtx.fill();
  // mainCtx.stroke();
  // mainCtx.closePath();
}



function drawCha() {
  for (var i = 0; i < chaPositions.length; i++) {
    mainCtx.beginPath();
    mainCtx.strokeStyle = imageColor;
    mainCtx.ellipse(chaPositions[i].x, chaPositions[i].y, 10, 10, 45 * Math.PI/180, 0, 2 * Math.PI);
    mainCtx.fill();
    mainCtx.stroke();
    mainCtx.closePath();
  }
}

function throttle(fn, threshhold, scope) {
  threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +new Date,
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

// Settting up canvas resolution only with css makes content expanding problem
var width = mainCanvas.width = window.innerWidth;
var height = mainCanvas.height = window.innerHeight;


var originImage = new Image();
originImage.src = "./asset/bang.svg";
var originImageloaded = false;
originImage.onload = function () {
  originImageloaded = true;
}

var backgroundColor = 'black'
var imageColor = 'white'

// array of functions for the rendering loop
var onRenderFcts= [];

function drawBackground () {
  mainCtx.fillStyle = backgroundColor;
  mainCtx.fillRect(0, 0, width, height);
}

var bottomRadius = 80;
var zSkew = 0.6;
var radius = 17;

var rotatingRadius = 57;
var startAng = 0;

//110, 150, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI
var pointO = {
  x: 210,
  y: 150,
  rad: radius
}

var bottomO = {
  x: 210,
  y: 175,
  angle: 0,
  rad: bottomRadius,
  height: 45
}

var leftSiot = {
  x: pointO.x + rotatingRadius*Math.cos( startAng + 185 * Math.PI/180),
  y: pointO.y + rotatingRadius*Math.sin( startAng + 185 * Math.PI/180),
  angle: Math.PI*13.5/16,
  rad: radius,
  height: 105
}

var rightSiot = {
  x: pointO.x + rotatingRadius*Math.cos( startAng -5 * Math.PI/180),
  y: pointO.y + rotatingRadius*Math.sin( startAng -5 * Math.PI/180),
  angle: -Math.PI*13.5/16,
  rad: radius,
  height: 85
}

function drawSo () {

  // Bottom part
  drawFakeCylinder(bottomO.x, bottomO.y, bottomO.angle, bottomO.rad, bottomO.height);

  mainCtx.beginPath();
  mainCtx.lineWidth = 2;
  mainCtx.strokeStyle = imageColor;
  mainCtx.ellipse(pointO.x, pointO.y, pointO.rad, pointO.rad, 45 * Math.PI/180, 0, 2 * Math.PI);
  mainCtx.fill();
  mainCtx.stroke();
  mainCtx.closePath();

  //drawLeftFakeShadow(60, 140, Math.PI*13.5/16, radius, 105);
  drawFakeCylinder(rightSiot.x, rightSiot.y, rightSiot.angle, rightSiot.rad, rightSiot.height);
  // Left diagonal line
  drawFakeCylinder(leftSiot.x, leftSiot.y, leftSiot.angle, leftSiot.rad, leftSiot.height);



  mainCtx.beginPath();
  mainCtx.lineWidth = 2;
  mainCtx.strokeStyle = imageColor;
  mainCtx.ellipse(pointO.x, pointO.y - 80, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI);
  mainCtx.fill();
  mainCtx.stroke();
  mainCtx.closePath();

  drawFakeDash(bottomO.x, bottomO.y, bottomO.angle, bottomO.rad, bottomO.height);
  drawFakeDash(rightSiot.x, rightSiot.y, rightSiot.angle, rightSiot.rad, rightSiot.height);
  drawFakeDash(leftSiot.x, leftSiot.y, leftSiot.angle, leftSiot.rad, leftSiot.height);
}

function drawLeftFakeShadow (x, y, angle, radius, height) {
  mainCtx.save();
  mainCtx.transform(1,0.2, -0.5,0.35,x,y);
  mainCtx.beginPath();
  mainCtx.fillStyle = 'rgba( 255,255,255,0.2)';
  mainCtx.fillRect(-radius,0,radius*2,-height);
  mainCtx.closePath();
  mainCtx.restore();
}

function drawFakeCylinder (x, y, angle, radius, height) {

  mainCtx.save();
  //mainCtx.translate(x, y);
  mainCtx.transform(1,  Math.sin(angle)/3, -Math.sin(angle), 0.6, x ,y);

  mainCtx.beginPath();
  mainCtx.strokeStyle = imageColor;
  mainCtx.lineWidth = 2;
  mainCtx.ellipse(0, 0, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI);
  mainCtx.fill();
  mainCtx.stroke();
  mainCtx.closePath();

  mainCtx.beginPath();
  mainCtx.fillRect(-radius,0,radius*2, -height);
  mainCtx.closePath();

  mainCtx.moveTo(-radius,0);
  mainCtx.lineTo(-radius,-height);


  mainCtx.moveTo(radius,0);
  mainCtx.lineTo(radius,-height);
  mainCtx.stroke();

  mainCtx.beginPath();
  mainCtx.lineWidth = 2;
  mainCtx.ellipse(0, -height, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI);
  mainCtx.fill();
  mainCtx.stroke();
  mainCtx.closePath();

  mainCtx.restore();
}



function drawFakeDash(x, y, angle, radius, height) {

  mainCtx.save();
  //mainCtx.translate(x, y);
  mainCtx.transform(1,  Math.sin(angle)/3, -Math.sin(angle), 0.6, x ,y);

  mainCtx.beginPath();
  mainCtx.setLineDash([5, 3]);
  mainCtx.lineWidth = 1;
  mainCtx.strokeStyle = imageColor;
  mainCtx.ellipse(0, 0, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI);
  mainCtx.stroke();
  mainCtx.closePath();

  mainCtx.beginPath();
  mainCtx.setLineDash([5, 3]);
  mainCtx.lineWidth = 1;
  mainCtx.ellipse(0, -height, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI);
  mainCtx.stroke();
  mainCtx.closePath();
  mainCtx.restore();
}


var imageOriginX = 0;
var imageOriginY = 0;

for (var i = 0; i < 60; i++) {
  bangPositions.push({
    x: i + i*0.7,
    y: i + i*0.5
  })
}

function drawBang () {
   drawBackground();
   drawCha();
  if(originImageloaded) {
    mainCtx.save();
    mainCtx.transform(0.95,-0.1,0,1,0,0);
    mainCtx.translate(30, 180);

    for( var i = 0; i < bangPositions.length; i++) {
      mainCtx.drawImage(originImage, bangPositions[i].x, bangPositions[i].x, 200, 200);
    }
    mainCtx.restore();
    // if(imageOriginX < 42) imageOriginX += 0.7;
    // if(imageOriginY < 30) imageOriginY += 0.5;
    // else {mainCtx.restore();
      drawSo();
       startAng += Math.PI/180;
      // This is really lame calculation for oval
      leftSiot.x = pointO.x + rotatingRadius*Math.cos( startAng + 185 * Math.PI/180);
      leftSiot.y = pointO.y + rotatingRadius*5/8*Math.sin( startAng + 185 * Math.PI/180);
      rightSiot.x = pointO.x + rotatingRadius*Math.cos( startAng - 5 * Math.PI/180);
      rightSiot.y = pointO.y + rotatingRadius*5/8*Math.sin( startAng - 5 * Math.PI/180);
    }
    mainCtx.restore();
  }
//}
//drawSo();
drawBackground();

function drawEverything () {
  //drawBackground();
  drawBang();
  return window.setTimeout(drawEverything.bind(this), 20);
}


drawEverything();

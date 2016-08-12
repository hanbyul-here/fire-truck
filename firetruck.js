var mainCanvas = document.getElementById('mainCanvas');
var mainCtx = mainCanvas.getContext('2d');
// Settting up canvas resolution only with css makes content expanding problem
var width = mainCanvas.width = window.innerWidth;
var height = mainCanvas.height = window.innerHeight;

var backgroundColor = 'black'
var imageColor = 'white'



function drawBackground () {
  mainCtx.fillStyle = backgroundColor;
  mainCtx.fillRect(0, 0, width, height);
}


var so = (function () {

  //110, 150, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI

  var _startAng = 0;
  var _bottomRadius = 80;
  var _radius = 17;
  var _rotatingRadius = 57;

  var _pointO = {
    x: 210,
    y: 150,
    rad: _radius
  }

  var _bottomO = {
    x: 210,
    y: 175,
    angle: 0,
    rad: _bottomRadius,
    height: 45
  }
  var _leftSiot = {
    x: _pointO.x + _rotatingRadius*Math.cos( _startAng + 185 * Math.PI/180),
    y: _pointO.y + _rotatingRadius*Math.sin( _startAng + 185 * Math.PI/180),
    angle: Math.PI*13.5/16,
    rad: _radius,
    height: 105
  }

  var _rightSiot = {
    x: _pointO.x + _rotatingRadius*Math.cos( _startAng -5 * Math.PI/180),
    y: _pointO.y + _rotatingRadius*Math.sin( _startAng -5 * Math.PI/180),
    angle: -Math.PI*13.5/16,
    rad: _radius,
    height: 85
  }


  var _drawPoint = function (x, y, rad) {
    mainCtx.beginPath();
    mainCtx.lineWidth = 2;
    mainCtx.strokeStyle = imageColor;
    mainCtx.ellipse(x, y, rad, rad, 45 * Math.PI/180, 0, 2 * Math.PI);
    mainCtx.fill();
    mainCtx.stroke();
    mainCtx.closePath();
  }

  var _drawFakeCylinder = function (x, y, angle, radius, height) {
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

  var _drawFakeDash = function (x, y, angle, radius, height) {

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

  var draw = function () {
    // Bottom part
    _drawFakeCylinder(_bottomO.x, _bottomO.y, _bottomO.angle, _bottomO.rad, _bottomO.height);

    _drawPoint(_pointO.x, _pointO.y, _radius);

    //drawLeftFakeShadow(60, 140, Math.PI*13.5/16, radius, 105);
    _drawFakeCylinder(_rightSiot.x, _rightSiot.y, _rightSiot.angle, _rightSiot.rad, _rightSiot.height);
    // Left diagonal line
    _drawFakeCylinder(_leftSiot.x, _leftSiot.y, _leftSiot.angle, _leftSiot.rad, _leftSiot.height);

    _drawPoint(_pointO.x, _pointO.y - 80, _radius)

    _drawFakeDash(_bottomO.x, _bottomO.y, _bottomO.angle, _bottomO.rad, _bottomO.height);
    _drawFakeDash(_rightSiot.x, _rightSiot.y, _rightSiot.angle, _rightSiot.rad, _rightSiot.height);
    _drawFakeDash(_leftSiot.x, _leftSiot.y, _leftSiot.angle, _leftSiot.rad, _leftSiot.height);
  }
  var animate = function () {
    _startAng += Math.PI/180;
    // This is really lame calculation for oval
    _leftSiot.x = _pointO.x + _rotatingRadius*Math.cos( _startAng + 185 * Math.PI/180);
    _leftSiot.y = _pointO.y + _rotatingRadius*5/8*Math.sin( _startAng + 185 * Math.PI/180);
    _rightSiot.x = _pointO.x + _rotatingRadius*Math.cos( _startAng - 5 * Math.PI/180);
    _rightSiot.y = _pointO.y + _rotatingRadius*5/8*Math.sin( _startAng - 5 * Math.PI/180);
  }
  return {
    animate: animate,
    draw: draw
  }
})()

var bang = (function () {


  var originImage = new Image();
  originImage.src = "./asset/bang.svg";

  var outlineImage = new Image();
  outlineImage.src = "./asset/empty-bang.svg"

  var blackImage = new Image();
  blackImage.src = "./asset/black-bang.svg"

  var originImageloaded = false;
  var outlineImageloaded = false;
  var blackImageloaded = false;

  originImage.onload = function () {
    originImageloaded = true;
  }
  outlineImage.onload = function () {
    outlineImageloaded = true;
  }
  blackImage.onload = function () {
    blackImageloaded = true;
  }

  var imageOriginX = 0;
  var imageOriginY = 0;

  var bangPositions = [];

  for (var i = 0; i < 70; i++) {
    bangPositions.push({
      x: i + i*0.7,
      y: i + i*0.5
    })
  }

  var draw = function () {
    if(originImageloaded) {
      mainCtx.save();
      mainCtx.transform(0.95,-0.1,0,1,0,0);
      mainCtx.translate(85, 110);

      for( var i = 0; i < bangPositions.length; i++) {
        mainCtx.drawImage(originImage, bangPositions[i].x, bangPositions[i].x, 200, 200);
      }
      mainCtx.restore();
    } else {
      return window.setTimeout(draw, 100);
    }
    mainCtx.restore();
  }

  var drawOutline = function () {
    if(outlineImageloaded) {
      mainCtx.save();
      mainCtx.transform(0.97,-0.09,0,1,0,0);
      mainCtx.translate(85, 110);
      mainCtx.drawImage(outlineImage, bangPositions[bangPositions.length-1].x, bangPositions[bangPositions.length-1].x, 200, 200);
      mainCtx.restore();
    } else {
      return window.setTimeout(drawOutline, 100);
    }
  }

  var drawLastOne = function () {
    if(blackImageloaded) {
      mainCtx.save();
      mainCtx.transform(0.95,-0.1,0,1,0,0);
      mainCtx.translate(85, 110);
      mainCtx.drawImage(blackImage, bangPositions[bangPositions.length-1].x, bangPositions[bangPositions.length-1].x, 200, 200);

      mainCtx.restore();
    } else {
      return window.setTimeout(drawLastOne, 100);
    }
    mainCtx.restore();
  }
  return {
    draw: draw,
    drawLastOne: drawLastOne,
    drawOutline: drawOutline
  }

})()

var cha = (function () {

  var chaPositions = [];
  var radius = 13;

  var canvas, ctx, flag = false,
      prevX = 0,
      currX = 0,
      prevY = 0,
      currY = 0,
      dot_flag = false;

  var pushPositions = function() {
    chaPositions.push({
      x: currX,
      y: currY
    })
  }

  var findxy = function(res, e) {
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
        pushPositions();
      }
    }
  }

  var draw = function () {
    for (var i = 0; i < chaPositions.length; i++) {
      mainCtx.beginPath();
      mainCtx.strokeStyle = imageColor;
      mainCtx.ellipse(chaPositions[i].x, chaPositions[i].y, radius, radius, 45 * Math.PI/180, 0, 2 * Math.PI);
      mainCtx.fill();
      mainCtx.stroke();
      mainCtx.closePath();
    }
  }

  var _addEvents = function () {
    mainCanvas.addEventListener("mousemove", function (e) {
        findxy('move', e)} , false);
    mainCanvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    mainCanvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    mainCanvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
  }

  _addEvents();

  return {
    draw: draw
  }
})()



function drawEverything () {
  drawBackground();
  bang.draw();
  so.draw();
  so.animate();

  cha.draw();
  bang.drawLastOne();
  bang.drawOutline();
  // animate
  return window.setTimeout(drawEverything.bind(this), 20);
}


drawEverything();




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


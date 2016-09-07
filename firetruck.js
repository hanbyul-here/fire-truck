var mainCanvas = document.getElementById('mainCanvas');
var mainCtx = mainCanvas.getContext('2d');
// Settting up canvas resolution only with css makes content expanding problem
var width = mainCanvas.width = window.innerWidth;
var height = mainCanvas.height = window.innerHeight;

var scale = map(width, 300, 2000, 0.8, 1.2);

var backgroundColor = 'black'
var imageColor = 'white'



function drawBackground () {
  mainCtx.fillStyle = backgroundColor;
  mainCtx.fillRect(-width/2, -height/2, width, height);
}

function map (value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

var so = (function () {

  var _startAng = 0;
  var _bottomRadius = 80;
  var _radius = 17;
  var _rotatingRadius = 57 ;

  var _pointO = {
    x: -15*scale,
    y: -100*scale,
    rad: _radius
  }

  var _bottomO = {
    x: _pointO.x,
    y: _pointO.y + 25,
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

  var rotate = function (x) {
    var rot = x - width/2;
    var mappedValue = map(rot, -width/2, width/2, -Math.PI/4, Math.PI/4);
    animate(mappedValue);
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
  var animate = function (ang) {
    _startAng = ang;//Math.PI/180;
    // This is really lame calculation for oval
    _leftSiot.x = _pointO.x + _rotatingRadius*Math.cos( _startAng + 185 * Math.PI/180);
    _leftSiot.y = _pointO.y + _rotatingRadius*5/8*Math.sin( _startAng + 185 * Math.PI/180);
    _rightSiot.x = _pointO.x + _rotatingRadius*Math.cos( _startAng - 5 * Math.PI/180);
    _rightSiot.y = _pointO.y + _rotatingRadius*5/8*Math.sin( _startAng - 5 * Math.PI/180);
  }
  return {
    animate: animate,
    draw: draw,
    rotate: rotate
  }
})()


var boom = ( function () {
  var pos = {
    x: -100,
    y: -120
  };

  var draw = function () {
    mainCtx.save();
    mainCtx.scale(0.7, 0.7);
    _drawFirstShape(mainCtx, pos.x, pos.y);
    mainCtx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    mainCtx.fill();
    mainCtx.translate(0, 20);
    _drawSecondShape(mainCtx, pos.x, pos.y);
    mainCtx.fillStyle = 'rgb(0, 0, 0)';
    mainCtx.fill();
    mainCtx.restore();
  }

  // used http://www.victoriakirst.com/beziertool/ to get rough shape
  var _drawFirstShape = function (ctx, xoff, yoff) {
    ctx.beginPath();
    ctx.moveTo(272 + xoff, 106 + yoff);
    ctx.bezierCurveTo(267 + xoff, 247 + yoff, 410 + xoff, 139 + yoff, 399 + xoff, 149 + yoff);
    ctx.bezierCurveTo(283 + xoff, 262 + yoff, 426 + xoff, 197 + yoff, 413 + xoff, 204 + yoff);
    ctx.bezierCurveTo(288 + xoff, 269 + yoff, 418 + xoff, 332 + yoff, 404 + xoff, 326 + yoff);
    ctx.bezierCurveTo(285 + xoff, 278 + yoff, 293 + xoff, 301 + yoff, 363 + xoff, 430 + yoff);
    ctx.bezierCurveTo(370 + xoff, 443 + yoff, 271 + xoff, 283 + yoff, 161 + xoff, 434 + yoff);
    ctx.bezierCurveTo(152 + xoff, 446 + yoff, 277 + xoff, 282 + yoff, 123 + xoff, 274 + yoff);
    ctx.bezierCurveTo(104 + xoff, 273 + yoff, 243 + xoff, 264 + yoff, 163 + xoff, 164 + yoff);
    ctx.bezierCurveTo(154 + xoff, 152 + yoff, 276 + xoff, 262 + yoff, 273 + xoff, 108 + yoff);
    ctx.closePath();

  }
  var _drawSecondShape = function (ctx, xoff, yoff) {
    ctx.beginPath();
    ctx.moveTo(237 + xoff, 233 + yoff);
    ctx.bezierCurveTo(257 + xoff, 263 + yoff, 324 + xoff, 237 + yoff, 309 + xoff, 236 + yoff);
    ctx.bezierCurveTo(272 + xoff, 269 + yoff, 286 + xoff, 293 + yoff, 307 + xoff, 299 + yoff);
    ctx.bezierCurveTo(309 + xoff, 304 + yoff, 255 + xoff, 280 + yoff, 239 + xoff, 300 + yoff);
    ctx.bezierCurveTo(239 + xoff, 285 + yoff, 265 + xoff, 261 + yoff, 236 + xoff, 238 + yoff);
    ctx.closePath();
  }
  return {
    draw: draw
  }
})();
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
  var xPosition = -130*scale;
  var yPosition = -150*scale;

  for (var i = 0; i < 70; i++) {
    bangPositions.push({
      x: i + i*0.7,
      y: i + i*0.2
    })
  }

  var ready = function () {
    if(originImageloaded && outlineImageloaded && blackImageloaded) return true;
    else return false;
  }

  var draw = function () {
    if(originImageloaded) {
      mainCtx.save();

      mainCtx.translate(xPosition, yPosition);
      mainCtx.transform(0.95,-0.1,0,1,0,0);
      for( var i = 0; i < bangPositions.length; i++) {
        mainCtx.drawImage(originImage, bangPositions[i].x, bangPositions[i].y, 200, 200);
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

      mainCtx.translate(xPosition, yPosition);
      mainCtx.transform(0.97,-0.09,0,1,0,0);
      mainCtx.drawImage(outlineImage, bangPositions[bangPositions.length-1].x, bangPositions[bangPositions.length-1].y, 200, 200);
      mainCtx.restore();
    } else {
      return window.setTimeout(drawOutline, 100);
    }
  }

  var drawLastOne = function () {
    if(blackImageloaded) {
      mainCtx.save();
      mainCtx.translate(xPosition, yPosition);
      mainCtx.transform(0.95,-0.1,0,1,0,0);
      mainCtx.drawImage(blackImage, bangPositions[bangPositions.length-1].x, bangPositions[bangPositions.length-1].y, 200, 200);

      mainCtx.restore();
    } else {
      return window.setTimeout(drawLastOne, 100);
    }
    mainCtx.restore();
  }
  return {
    draw: draw,
    drawLastOne: drawLastOne,
    drawOutline: drawOutline,
    ready: ready
  }

})()

var cha = (function () {

  var chaPositions = [];
  var radius = 11;

  var canvas, ctx, flag = false,
      prevX = 0,
      currX = 0,
      prevY = 0,
      currY = 0,
      dot_flag = false;

  var _pushPositions = function(currX, currY) {
    chaPositions.push({
      x: (currX - width/2)/scale,
      y: (currY - height/2)/scale
    })
  }
  var _getDistance = function (x1, y1, x2, y2) {
    var x = x1-x2;
    var y = y1-y2;
    return Math.sqrt(x*x + y*y);
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
        _pushPositions(currX, currY);
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
        var distance = _getDistance(prevX, prevY, currX, currY)
        if( distance > 30) {
          // rough interpolation
          var xGap = currX - prevX;
          var yGap = currY - prevY;
          var newX = prevX;
          var newY = prevY;
          while (_getDistance(prevX, prevY, newX, newY) < distance) {
            newX += xGap/5;
            newY += yGap/5;
            _pushPositions(newX, newY);
          }

        } else {
          _pushPositions(currX, currY);
        }
      } else {
        so.rotate(e.clientX);
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

    // mobile
    mainCanvas.addEventListener("touchstart", function (e) {
      findxy('down', e.touches[0])} , false);
    mainCanvas.addEventListener("touchend", function (e) {
      findxy('up', e.touches[0])} , false);
    mainCanvas.addEventListener("touchcancel", function (e) {
      findxy('out', e.touches[0])} , false);
    mainCanvas.addEventListener("touchmove", function (e) {
      findxy('move', e.touches[0])} , false);
  }

  _addEvents();

  return {
    draw: draw
  }
})()



function drawEverything () {

  drawBackground();
  if(bang.ready()) {
    boom.draw();
    bang.draw();
    so.draw();
    //so.animate();

    cha.draw();
    bang.drawLastOne();
    bang.drawOutline();
  }
  // animate
  window.requestAnimationFrame(drawEverything);
}

function scaleEverything () {
  mainCtx.scale(scale,scale);
}
mainCtx.translate(width/2, height/2);
scaleEverything();
drawEverything();
window.requestAnimationFrame(drawEverything);




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


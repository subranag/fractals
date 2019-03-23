class Shapes {
  constructor(context) {
    this.ctx = context;
  }

  clearRect(ptA, ptB) {
    this.ctx.clearRect(ptA.x, ptA.y, ptB.x, ptB.y);
  }

  fillRect(ptA, ptB, fillStyle = "black") {
    this.ctx.rect(ptA.x, ptA.y, ptB.x, ptB.y);
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }

  drawTriangle(ptA, ptB, ptC, fillStyle = "white") {
    this.ctx.beginPath();
    this.ctx.moveTo(ptA.x, ptA.y);
    this.ctx.lineTo(ptB.x, ptB.y);
    this.ctx.lineTo(ptC.x, ptC.y);
    this.ctx.closePath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }

  drawQad(ptA, ptB, ptC, ptD, fillStyle = "black") {
    this.ctx.beginPath();
    this.ctx.moveTo(ptA.x, ptA.y);
    this.ctx.lineTo(ptB.x, ptB.y);
    this.ctx.lineTo(ptC.x, ptC.y);
    this.ctx.lineTo(ptD.x, ptD.y);
    this.ctx.closePath();
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }

  drawLine(ptA, ptB, strokeStyle = "black") {
    this.ctx.beginPath();
    this.ctx.moveTo(ptA.x, ptA.y);
    this.ctx.lineTo(ptB.x, ptB.y);
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.stroke();
  }

  drawCircle(pt, radius, strokeStyle = "black") {
    this.ctx.beginPath();
    this.ctx.arc(pt.x, pt.y, radius, 0, 2 * Math.PI, false);
    this.ctx.strokeStyle = strokeStyle;
    this.ctx.lineWidth = 1;
    this.ctx.stroke();
  }

  drawPoint(pt, size = 5, fillStyle = "black") {
    this.ctx.beginPath();
    this.ctx.arc(pt.x, pt.y, size, 0, 2 * Math.PI);
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }

  magentaBlueRedGradient(ptA, ptB) {
    var grad1 = this.ctx.createLinearGradient(ptA.x, ptA.y, ptB.x, ptB.y);
    grad1.addColorStop(0, "#9400D3");
    grad1.addColorStop(1 * 0.142, "#4B0082");
    grad1.addColorStop(2 * 0.142, "#0000FF");
    grad1.addColorStop(3 * 0.142, "#00FF00");
    grad1.addColorStop(4 * 0.142, "#FFFF00");
    grad1.addColorStop(5 * 0.142, "#FF7F00");
    grad1.addColorStop(6 * 0.142, "#FF0000");
    return grad1;
  }
}

var gradientTexture = function(width, height, colors) {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  canvas.height = height;
  canvas.width = width;
  var grd = ctx.createLinearGradient(0, 0, 0, height);
  for (var i in colors) {
    grd.addColorStop(i / (colors.length - 1), colors[i]);
  }

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, width, height);

  return new PIXI.Texture.fromCanvas(canvas);
};

var midPoint = function(ptA, ptB) {
  return {
    x: (ptA.x + ptB.x) / 2,
    y: (ptA.y + ptB.y) / 2,
  };
}

var distance = function(ptA, ptB) {
  var a = ptB.x - ptA.x;
  var b = ptB.y - ptA.y;
  return Math.sqrt(a * a + b * b);
}

var add = function(ptA, ptB) {
  return {
    x: ptA.x + ptB.x,
    y: ptA.y + ptB.y
  };
}

var rgba = function(r, g, b, opacity = 1) {
  return 'rgba(' + r + ',' + g + ',' + b + ',' + opacity + ')';
}

var randRange = function(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

var randomJitter = function(pt, maxJitter) {
  var sign = 1;
  if (Math.random() < 0.5 && maxJitter > 0) {
    sign *= -1;
  }

  return {
    x: pt.x + (sign * randRange(maxJitter)),
    y: pt.y + (sign * randRange(maxJitter))
  }
}

var angleToPoint = function(angle, scale) {
  return {
    x: Math.cos(angle) * scale,
    y: Math.sin(angle) * scale
  }
}

var angleToPointFrom = function(pt, angle, scale) {
  return {
    x: pt.x + Math.cos(angle) * scale,
    y: pt.y + Math.sin(angle) * scale
  }
}

/*
Keyboard Stuff
*/
var onKeyPressed = function(keyMap) {
  document.addEventListener('keyup', function(event) {
    var key = event.key || event.keyCode;
    // now call function
    if (key in keyMap) {
      keyMap[key]();
    }
  });
}
/*
Animation stuff
*/
function FpsCtrl(fps, callback) {

  var delay = 1000 / fps, // calc. time per frame
    time = null, // start time
    frame = -1, // frame count
    tref; // rAF time reference

  function loop(timestamp) {
    if (time === null) time = timestamp; // init start time
    var seg = Math.floor((timestamp - time) / delay); // calc frame no.
    if (seg > frame) { // moved to next frame?
      frame = seg; // update
      callback({ // callback function
        time: timestamp,
        frame: frame
      })
    }
    tref = requestAnimationFrame(loop)
  }

  // play status
  this.isPlaying = false;

  // set frame-rate
  this.frameRate = function(newfps) {
    if (!arguments.length) return fps;
    fps = newfps;
    delay = 1000 / fps;
    frame = -1;
    time = null;
  };

  // enable starting/pausing of the object
  this.start = function() {
    if (!this.isPlaying) {
      this.isPlaying = true;
      tref = requestAnimationFrame(loop);
    }
  };

  this.pause = function() {
    if (this.isPlaying) {
      cancelAnimationFrame(tref);
      this.isPlaying = false;
      time = null;
      frame = -1;
    }
  };
}

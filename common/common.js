class Shapes {
  constructor(context) {
    this.ctx = context;
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

  drawLine(ptA, ptB, fillStyle = "black") {
    this.ctx.beginPath();
    this.ctx.moveTo(ptA.x, ptA.y);
    this.ctx.lineTo(ptB.x, ptB.y);
    this.ctx.fillStyle = fillStyle;
    this.ctx.stroke();
  }

  drawPoint(pt, size = 5, fillStyle = "black") {
    this.ctx.beginPath();
    this.ctx.arc(pt.x, pt.y, size, 0, 2 * Math.PI);
    this.ctx.fillStyle = fillStyle;
    this.ctx.fill();
  }
}

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

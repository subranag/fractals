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

class VizApp {
  constructor() {
    this.app = new PIXI.Application({
      autoResize: true,
      resolution: devicePixelRatio,
      antialias: true,
      forceFXAA: true
    });
    document.body.appendChild(this.app.view);
    this.graphics = {};
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // setup resize
    window.addEventListener('resize', this.resize);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  rainBowBackgroud(graphics) {
    var container = new PIXI.Container();
    const gradientSprite = rainbowSprite(this.width, this.height);
    container.addChild(gradientSprite);
    container.mask = graphics;
    this.app.stage.addChild(container);
  }

  getGraphics(name, center = null) {
    if (center == null) {
      center = {};
      center.x = this.width / 2;
      center.y = this.height / 2 + 100;
    }
    if (!(name in this.graphics)) {
      var g = new PIXI.Graphics();
      g.x = center.x;
      g.y = center.y;
      this.rainBowBackgroud(g);
      this.graphics[name] = new Graf(g);
      this.app.stage.addChild(this.graphics[name].getPixiGraphics());
    }
    return this.graphics[name];
  }
}

class Graf {
  constructor(graphics) {
    this.pixiGraphics = graphics;
  }

  getPixiGraphics() {
    return this.pixiGraphics;
  }

  drawTriangle(ptA, ptB, ptC, fillColor = null, alpha = 1.0) {
    if (fillColor) {
      this.pixiGraphics.beginFill(fillColor, alpha);
    } else {
      this.pixiGraphics.lineStyle(1, 0xFFFFFF, 0.5);
    }
    this.pixiGraphics.moveTo(ptA.x, ptA.y);
    this.pixiGraphics.lineTo(ptB.x, ptB.y);
    this.pixiGraphics.lineTo(ptC.x, ptC.y);
    this.pixiGraphics.lineTo(ptA.x, ptA.y);
    if (fillColor) {
      this.pixiGraphics.endFill();
    }
  }

  clear() {
    this.pixiGraphics.clear();
  }
}

var rainbowSprite = function(width, height) {
  const colors = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];
  return new PIXI.Sprite(gradientTexture(width, height, colors));
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

window.onload = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;

  const app = new PIXI.Application({
    autoResize: true,
    resolution: devicePixelRatio,
    antialias: true
  });
  document.body.appendChild(app.view);

  var graphics = new PIXI.Graphics();
  graphics.blendMode = PIXI.BLEND_MODES.DIFFERENCE;
  graphics.x = width / 2;
  graphics.y = height / 2 + 100;

  var drawTriangle = function(ptA, ptB, ptC, fillColor = null, alpha = 1.0) {

    if (fillColor) {
      graphics.beginFill(fillColor, alpha);
    } else {
      graphics.lineStyle(1, 0x000000, 0.5);
    }
    graphics.moveTo(ptA.x, ptA.y);
    graphics.lineTo(ptB.x, ptB.y);
    graphics.lineTo(ptC.x, ptC.y);
    graphics.lineTo(ptA.x, ptA.y);
    if (fillColor) {
      graphics.endFill();
    }
  }

  var sierPinski = function(ptA, ptB, ptC, depth) {
    if (depth == 0) {
      drawTriangle(ptA, ptB, ptC, fillColor = 0x8cff66, alpha = 0.2);
    } else {
      // recurse with three more triangles
      // midpoint of AB, BC, CA
      var ptABm = midPoint(ptA, ptB);
      var ptBCm = midPoint(ptB, ptC);
      var ptCAm = midPoint(ptC, ptA);
      drawTriangle(ptABm, ptBCm, ptCAm, fillColor = 0xFF0000, alpha = 1 / depth);

      // now draw three triangles
      sierPinski(ptA, ptABm, ptCAm, depth - 1);
      sierPinski(ptABm, ptB, ptBCm, depth - 1);
      sierPinski(ptCAm, ptBCm, ptC, depth - 1);
    }
  }

  var angle = -Math.PI / 2;
  var scaleFactor = 500;
  var maxDepth = 0;
  var ptA = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptB = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptC = angleToPoint(angle, scaleFactor);
  app.stage.addChild(graphics);

  sierPinski(ptA, ptB, ptC, depth = maxDepth);

  // ticker
  const ticker = new PIXI.ticker.Ticker();
  ticker.stop();
  var elapsedTime = 0;
  ticker.add((deltaTime) => {
    elapsedTime += ticker.elapsedMS;
    if (elapsedTime >= 300) {
      maxDepth = ((maxDepth + 1) % 8);
      graphics.clear();
      sierPinski(ptA, ptB, ptC, depth = maxDepth);
      elapsedTime = 0;
    }
  });
  ticker.start();

  // Listen for window resize events
  window.addEventListener('resize', resize);

  // Resize function window
  function resize() {
    // Resize the renderer
    app.renderer.resize(window.innerWidth, window.innerHeight);
  }

  resize();
}

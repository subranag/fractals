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
      drawTriangle(ptA, ptB, ptC, fillColor = 0x000000);
    } else {
      // recurse with three more triangles
      // midpoint of AB, BC, CA
      var ptABm = randomJitter(midPoint(ptA, ptB), 3);
      var ptBCm = randomJitter(midPoint(ptB, ptC), 3);
      var ptCAm = randomJitter(midPoint(ptC, ptA), 3);
      drawTriangle(ptABm, ptBCm, ptCAm, fillColor = 0xFF0000, alpha = 1 / depth * 2);

      // now draw three triangles
      sierPinski(ptA, ptABm, ptCAm, depth - 1);
      sierPinski(ptABm, ptB, ptBCm, depth - 1);
      sierPinski(ptCAm, ptBCm, ptC, depth - 1);
    }
  }

  var angle = -Math.PI / 2;
  var scaleFactor = 500;
  var maxDepth = 6;
  var ptA = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptB = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptC = angleToPoint(angle, scaleFactor);



  app.stage.addChild(graphics);

  app.ticker.add(function(delta) {
    graphics.clear();
    sierPinski(ptA, ptB, ptC, depth = maxDepth);
  });

  // Listen for window resize events
  window.addEventListener('resize', resize);

  // Resize function window
  function resize() {
    // Resize the renderer
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // You can use the 'screen' property as the renderer visible
    // area, this is more useful than view.width/height because
    // it handles resolution
    rect.position.set(app.screen.width, app.screen.height);
  }

  resize();
}

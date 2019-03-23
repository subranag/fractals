window.onload = function() {

  var vizApp = new VizApp();
  var graphics = vizApp.getGraphics("nshape", center = {
    x: 0,
    y: 0
  });

  var origin = vizApp.center();

  var translateBy = 240;
  var angle = 0;
  var size = 480;
  var maxDepth = 0;

  var drawFractal = function(origin, depth, size, translate, drawShape) {
    if (depth == 0) {
      drawShape(origin, size);
    } else {
      // compute 3 origin for smaller Shapes
      var angle = 0;
      var pt1 = angleToPointFrom(origin, angle, translate);
      drawShape(pt1, size / 2);
      angle += (2 * Math.PI / 3);
      var pt2 = angleToPointFrom(origin, angle, translate);
      drawShape(pt2, size / 2);
      angle += (2 * Math.PI / 3);
      var pt3 = angleToPointFrom(origin, angle, translate);
      drawShape(pt3, size / 2);

      drawFractal(pt1, depth - 1, size / 2, translate / 2, drawShape);
      drawFractal(pt2, depth - 1, size / 2, translate / 2, drawShape);
      drawFractal(pt3, depth - 1, size / 2, translate / 2, drawShape);
    }
  }

  var drawShapeCircle = function(origin, size) {
    graphics.drawCircle(origin, size, lineWidth = 3);
  }

  // ticker
  const ticker = new PIXI.ticker.Ticker();
  ticker.stop();
  var elapsedTime = 0;
  ticker.add((deltaTime) => {
    elapsedTime += ticker.elapsedMS;
    if (elapsedTime >= 400) {
      maxDepth = ((maxDepth + 1) % 8);
      graphics.clear();
      drawShapeCircle(origin, size);
      drawFractal(origin, maxDepth, size, translateBy, drawShape = drawShapeCircle);
      elapsedTime = 0;
    }
  });
  ticker.start();

  vizApp.resize();
}

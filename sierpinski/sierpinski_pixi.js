window.onload = function() {

  var vizApp = new VizApp();
  var graphics = vizApp.getGraphics("sierpinski");

  var sierPinski = function(ptA, ptB, ptC, depth) {
    if (depth == 0) {
      graphics.drawTriangle(ptA, ptB, ptC);
    } else {
      // recurse with three more triangles
      // midpoint of AB, BC, CA
      var ptABm = midPoint(ptA, ptB);
      var ptBCm = midPoint(ptB, ptC);
      var ptCAm = midPoint(ptC, ptA);
      graphics.drawTriangle(ptABm, ptBCm, ptCAm, fillColor = 0xFFFFFF);

      // now draw three triangles
      sierPinski(ptA, ptABm, ptCAm, depth - 1);
      sierPinski(ptABm, ptB, ptBCm, depth - 1);
      sierPinski(ptCAm, ptBCm, ptC, depth - 1);
    }
  }

  var angle = -Math.PI / 2;
  var scaleFactor = 570;
  var maxDepth = 0;
  var ptA = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptB = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptC = angleToPoint(angle, scaleFactor);

  sierPinski(ptA, ptB, ptC, depth = maxDepth);

  // ticker
  const ticker = new PIXI.ticker.Ticker();
  ticker.stop();
  var elapsedTime = 0;
  ticker.add((deltaTime) => {
    elapsedTime += ticker.elapsedMS;
    if (elapsedTime >= 400) {
      maxDepth = ((maxDepth + 1) % 8);
      graphics.clear();
      sierPinski(ptA, ptB, ptC, depth = maxDepth);
      elapsedTime = 0;
    }
  });
  ticker.start();

  vizApp.resize();
}

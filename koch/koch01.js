window.onload = function() {

  var vizApp = new VizApp();
  var graphics = vizApp.getGraphics("koch");

  var drawPattern = function(maxDepth) {
    var koch = function(ptA, ptB, depth) {
      var dist = distance(ptA, ptB);
      var split = dist / 3;
      var dy = ptB.y - ptA.y;
      var dx = ptB.x - ptA.x;
      var angle = Math.atan2(dy, dx);


      var ptAp = angleToPointFrom(ptA, angle, split);
      ptAp = randomJitter(ptAp, randJitter);

      var ptAc = angleToPointFrom(ptAp, angle - Math.PI / 3, split);
      ptAc = randomJitter(ptAc, randJitter);

      var ptAcm = angleToPointFrom(ptAp, angle + Math.PI / 3, split);
      ptAcm = randomJitter(ptAcm, randJitter);

      var ptBp = angleToPointFrom(ptA, angle, 2 * split);
      ptBp = randomJitter(ptBp, randJitter);

      graphics.drawPolygon([ptAp, ptAc, ptBp, ptAcm], fillColor = 0xFFFFFF);
      graphics.drawTriangle(ptA, ptAp, ptAcm, fillColor = 0xFFFFFF);
      graphics.drawTriangle(ptBp, ptB, ptAcm, fillColor = 0xFFFFFF);

      if (depth == 0) {
        graphics.drawLine(randomJitter(ptA, randJitter), randomJitter(ptAp, randJitter));
        graphics.drawLine(randomJitter(ptAp, randJitter), randomJitter(ptAc, randJitter));
        graphics.drawLine(randomJitter(ptAc, randJitter), randomJitter(ptBp, randJitter));
        graphics.drawLine(randomJitter(ptBp, randJitter), randomJitter(ptB, randJitter));
      } else {
        koch(ptA, ptAp, depth - 1);
        koch(ptAp, ptAc, depth - 1);
        koch(ptAc, ptBp, depth - 1);
        koch(ptBp, ptB, depth - 1);
      }
    }

    var pt0 = {
      x: 0.3 * vizApp.width,
      y: 0.3 * vizApp.height
    };

    var pt1 = {
      x: 0.70 * vizApp.width,
      y: 0.3 * vizApp.height
    };

    var dist = distance(pt1, pt0);

    var pt2 = angleToPointFrom(pt0, Math.PI / 3, dist);

    koch(pt0, pt1, depth = maxDepth);
    koch(pt1, pt2, depth = maxDepth);
    koch(pt2, pt0, depth = maxDepth);
  }

  var randJitter = 0;

  // start the animation
  var maxDepth = 0;
  const anim = new Animation(() => {
    maxDepth = ((maxDepth + 1) % 5);
    graphics.clear();
    drawPattern(maxDepth);
  });
  anim.start();

  vizApp.resize();
}

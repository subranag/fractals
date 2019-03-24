window.onload = function () {

  var vizApp = new VizApp();
  var graphics = vizApp.getGraphics("cycloid");

  var origin = vizApp.center();

  var steps = 500;
  var times = 2;
  var range = 0;

  var inc = (2 * Math.PI) / steps;
  var radius = (vizApp.height / 2) * 0.9;

  var cycloidPoints = [];
  for (var angle = -1 * Math.PI; angle <= Math.PI; angle += inc) {
    var pt = angleToPointFrom(origin, angle, radius);
    graphics.drawPoint(pt, pointSize = 2);
    cycloidPoints.push(pt);
  }

  var drawCycloid = function (times, cycloidPoints, range) {
    graphics.drawCircle(origin, radius);
    var source = range;
    var target = ((range * times) - 1) % steps;
    if (target < 0) {
      target = 0;
    }
    graphics.drawLine(cycloidPoints[source], cycloidPoints[target]);
  }

  onKeyPressed({
    "+": function () {
      times += 1;
      range = 0;
      graphics.clear();
    },
    "-": function () {
      times = times - 1;
      if (times < 2) {
        times = 2;
      }
      range = 0;
      graphics.clear();
    }
  });

  const anim = new Animation(() => {
    range = ((range + 1) % steps);
    drawCycloid(times, cycloidPoints, range);
    if (range == (steps - 1)) {
      graphics.clear();
    }
  }, tickAfterMillis = 1);
  anim.start();

  vizApp.resize();
}
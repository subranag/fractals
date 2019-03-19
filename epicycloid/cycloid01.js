window.onload = function() {

  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  var shape = new Shapes(context = context);

  var origin = {
    x: width / 2,
    y: height / 2
  };
  var steps = 500;
  var inc = (2 * Math.PI) / steps;
  var radius = (height / 2) * 0.9;

  var gradient = shape.magentaBlueRedGradient({
    x: (origin.x - radius),
    y: (origin.y - radius)
  }, {
    x: (origin.x + radius),
    y: (origin.y - radius)
  });
  // draw circle
  shape.fillRect({
    x: 0,
    y: 0
  }, {
    x: width,
    y: height
  });
  shape.drawCircle(origin, radius, strokeStyle = gradient);

  var cycloidPoints = [];
  for (var angle = -1 * Math.PI; angle <= Math.PI; angle += inc) {
    var pt = angleToPointFrom(origin, angle, radius);
    shape.drawPoint(pt, size = 1);
    cycloidPoints.push(pt);
  }

  var drawCycloid = function(times, cycloidPoints) {
    for (var range = 0; range < steps; range++) {
      var source = range;
      var target = ((range * times) - 1) % steps;
      if (target < 0) {
        target = 0;
      }
      shape.drawLine(cycloidPoints[source], cycloidPoints[target], strokeStyle = gradient);
    }
  }

  drawCycloid(86, cycloidPoints);
}

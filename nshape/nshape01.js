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

  var translateBy = 200;
  var angle = 0;
  var size = 400;

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
    shape.drawCircle(origin, size, strokeStyle = "white");
  }

  // background black
  shape.fillRect({
    x: 0,
    y: 0
  }, {
    x: width,
    y: height
  });

  drawShapeCircle(origin, size);
  drawFractal(origin, 8, size, translateBy, drawShape = drawShapeCircle);
}

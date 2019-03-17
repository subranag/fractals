window.onload = function() {

  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  context.translate(width / 2, height / 2 + 100);
  var shape = new Shapes(context = context);

  var sierPinski = function(ptA, ptB, ptC, depth, color = {
    r: 255,
    g: 0,
    b: 0
  }) {
    if (depth == 0) {
      shape.drawTriangle(ptA, ptB, ptC);
    } else {
      // recurse with three more triangles
      // midpoint of AB, BC, CA
      var ptABm = randomJitter(midPoint(ptA, ptB), 0);
      var ptBCm = randomJitter(midPoint(ptB, ptC), 0);
      var ptCAm = randomJitter(midPoint(ptC, ptA), 0);
      shape.drawTriangle(ptABm, ptBCm, ptCAm, fillStyle = rgba(color.r, color.g, color.b, depth * 0.3));

      // now draw three triangles
      sierPinski(ptA, ptABm, ptCAm, depth - 1, color);
      sierPinski(ptABm, ptB, ptBCm, depth - 1, color);
      sierPinski(ptCAm, ptBCm, ptC, depth - 1, color);
    }
  }

  var angle = -Math.PI / 2;
  var scaleFactor = 550;
  var maxDepth = 6;
  var ptA = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptB = angleToPoint(angle, scaleFactor);
  angle += (2 * Math.PI / 3);
  var ptC = angleToPoint(angle, scaleFactor);

  sierPinski(ptA, ptB, ptC, depth = maxDepth, color = {
    r: 150,
    g: 0,
    b: 0
  });
}

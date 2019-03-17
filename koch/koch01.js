window.onload = function() {

  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  var shape = new Shapes(context = context);
  var drawPattern = function() {
    var koch = function(ptA, ptB, depth) {
      var dist = distance(ptA, ptB);
      var split = dist / 3;
      var dy = ptB.y - ptA.y;
      var dx = ptB.x - ptA.x;
      var angle = Math.atan2(dy, dx);

      var ptAp = {
        x: ptA.x + Math.cos(angle) * split,
        y: ptA.y + Math.sin(angle) * split
      };

      ptAp = randomJitter(ptAp, randJitter);

      var ptAc = {
        x: ptAp.x + Math.cos(angle - Math.PI / 3) * split,
        y: ptAp.y + Math.sin(angle - Math.PI / 3) * split
      }

      ptAc = randomJitter(ptAc, randJitter);

      var ptAcm = {
        x: ptAp.x + Math.cos(angle + Math.PI / 3) * split,
        y: ptAp.y + Math.sin(angle + Math.PI / 3) * split
      }

      ptAcm = randomJitter(ptAcm, randJitter);

      var ptBp = {
        x: ptA.x + 2 * Math.cos(angle) * split,
        y: ptA.y + 2 * Math.sin(angle) * split
      };

      ptBp = randomJitter(ptBp, randJitter);

      var color1 = rgba(200, 0, 0, 1 / depth);
      var color2 = rgba(200, 100, 100, 1 / depth);
      shape.drawQad(ptAp, ptAc, ptBp, ptAcm, fillStyle = color1);
      shape.drawTriangle(ptA, ptAp, ptAcm, fillStyle = color2);
      shape.drawTriangle(ptBp, ptB, ptAcm, fillStyle = color2);

      if (depth == 0) {
        shape.drawLine(randomJitter(ptA, randJitter), randomJitter(ptAp, randJitter));
        shape.drawLine(randomJitter(ptAp, randJitter), randomJitter(ptAc, randJitter));
        shape.drawLine(randomJitter(ptAc, randJitter), randomJitter(ptBp, randJitter));
        shape.drawLine(randomJitter(ptBp, randJitter), randomJitter(ptB, randJitter));
      } else {
        koch(ptA, ptAp, depth - 1);
        koch(ptAp, ptAc, depth - 1);
        koch(ptAc, ptBp, depth - 1);
        koch(ptBp, ptB, depth - 1);
      }
    }

    var pt0 = {
      x: 0.33 * width,
      y: 0.3 * height
    };

    var pt1 = {
      x: 0.66 * width,
      y: 0.3 * height
    };

    var dist = distance(pt1, pt0);

    var pt2 = {
      x: pt0.x + Math.cos(Math.PI / 3) * dist,
      y: pt0.y + Math.sin(Math.PI / 3) * dist
    };

    koch(pt0, pt1, depth = 5);
    koch(pt1, pt2, depth = 5);
    koch(pt2, pt0, depth = 5);
  }

  // animation
  var randJitter = 0;
  drawPattern();
}

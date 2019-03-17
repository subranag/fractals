window.onload = function() {

  var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;

  var shape = new Shapes(context = context);

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

    var ptAc = {
      x: ptAp.x + Math.cos(angle - Math.PI / 3) * split,
      y: ptAp.y + Math.sin(angle - Math.PI / 3) * split
    }

    var ptBp = {
      x: ptA.x + 2 * Math.cos(angle) * split,
      y: ptA.y + 2 * Math.sin(angle) * split
    };

    if (depth == 0) {
      shape.drawLine(ptA, ptAp);
      shape.drawLine(ptAp, ptAc);
      shape.drawLine(ptAc, ptBp);
      shape.drawLine(ptBp, ptB);
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
    x : pt0.x + Math.cos(Math.PI/3) * dist,
    y : pt0.y + Math.sin(Math.PI/3) * dist
  };

  koch(pt0, pt1, depth = 2);
  koch(pt1, pt2, depth = 2);
  koch(pt2, pt0, depth = 2);
}

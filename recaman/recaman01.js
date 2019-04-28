window.onload = function () {
    const vizApp = new VizApp();
    const graphics = vizApp.getGraphics("eckerman");

    const start = {
        x: vizApp.width * 0.03,
        y: vizApp.height * 0.5
    };

    const end = {
        x: vizApp.width * 0.97,
        y: vizApp.height * 0.5
    };

    const splits = 250;
    //const splits = 10;
    const splitDistance = distance(start, end) / splits;
    var pointTracking = [];

    var point = {
        x: start.x,
        y: start.y
    };
    var xDistnace = point.x;
    pointTracking.push({
        used: false,
        point: point
    });
    for (var i = 0; i < splits; i++) {
        xDistnace += splitDistance;
        var nextPoint = {
            used: false,
            point: {
                x: xDistnace,
                y: start.y
            }
        };
        pointTracking.push(nextPoint);
    }

    var drawShape = function (startIndex, endIndex, flipper) {
        var mid = midPoint(pointTracking[startIndex].point, pointTracking[endIndex].point);
        var radius = distance(pointTracking[startIndex].point, pointTracking[endIndex].point) / 2;
        if (endIndex < startIndex) {
            graphics.drawArc(mid, radius, 2 * Math.PI, Math.PI, !flipper, 3);
        } else {
            graphics.drawArc(mid, radius, Math.PI, 2 * Math.PI, flipper, 3);
        }
    }

    const hops = splits + 1;
    var currPointIndex = 0;
    pointTracking[0].used = true;
    var flipper = true;
    for (var hop = 1; hop <= hops; hop++) {
        var backIndex = currPointIndex - hop;
        var forwardIndex = currPointIndex + hop;

        var canJumpBack = backIndex > 0 && !pointTracking[backIndex].used;
        if (canJumpBack) {
            console.log([currPointIndex, backIndex]);
            drawShape(currPointIndex, backIndex, flipper);
            pointTracking[backIndex].used = true;
            currPointIndex = backIndex;
        } else {
            if (forwardIndex > (pointTracking.length - 1)) {
                break;
            }
            // draw forward circle
            console.log([currPointIndex, forwardIndex]);
            drawShape(currPointIndex, forwardIndex, flipper);
            pointTracking[forwardIndex].used = true;
            currPointIndex = forwardIndex;
        }
        flipper = !flipper;
    }
    vizApp.resize();
}
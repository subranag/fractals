window.onload = function () {
    const vizApp = new VizApp();
    const graphics = vizApp.getGraphics("ulam");

    var start = vizApp.center();

    var drawGridShape = function (point, size) {
        graphics.drawRectWithCenter(point, 1.5, 1.5);
    };

    var allPoints = [];
    var sqSize = 3;
    drawGridShape(start, sqSize);
    allPoints.push(start);

    for (var iter = 1; iter < 620; iter += 2) {
        var angle = 0;
        nextPoint = {
            x: start.x + sqSize,
            y: start.y
        };
        allPoints.push(nextPoint);

        angle += (Math.PI / 2);
        nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
        allPoints.push(nextPoint);
        for (var r = 1; r < iter; r++) {
            nextPoint = {
                x: nextPoint.x,
                y: nextPoint.y + sqSize
            };
            allPoints.push(nextPoint);
        }

        angle += (Math.PI / 2);
        nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
        allPoints.push(nextPoint);
        for (var b = 1; b < (iter + 1); b++) {
            nextPoint = {
                x: nextPoint.x - sqSize,
                y: nextPoint.y
            };
            allPoints.push(nextPoint);
        }

        angle += (Math.PI / 2);
        nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
        allPoints.push(nextPoint);
        for (var l = 1; l < (iter + 1); l++) {
            nextPoint = {
                x: nextPoint.x,
                y: nextPoint.y - sqSize
            };
            allPoints.push(nextPoint);
        }

        angle += (Math.PI / 2);
        nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
        allPoints.push(nextPoint);
        for (var t = 1; t < (iter + 1); t++) {
            nextPoint = {
                x: nextPoint.x + sqSize,
                y: nextPoint.y
            };
            allPoints.push(nextPoint);
        }
        start = nextPoint;
    }

    var primeSiev = function (num) {
        primes = [];
        for (var i = 0; i < num; i++) {
            primes.push(true);
        }
        primes[0] = primes[1] = false;

        for (var i = 0; i < num; i++) {
            if (primes[i]) {
                for (var j = i * i; j < num; j += i) {
                    primes[j] = false;
                }
            }
        }
        return primes;
    }

    primes = primeSiev(384400);

    for (var i = 0; i < 384400; i++) {
        if (primes[i]) {
            drawGridShape(allPoints[i], sqSize);
        }
    }

    vizApp.resize();
}
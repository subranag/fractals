window.onload = function () {
    const vizApp = new VizApp();
    const graphics = vizApp.getGraphics("ulam");

    const start = vizApp.center();

    var sqSize = 5;
    graphics.drawRectWithCenter(start, sqSize, sqSize);

    var angle = 0;
    var nextPoint = angleToPointFrom(start, angle, sqSize);
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);
    
    angle += (Math.PI / 2);
    nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);

    angle += (Math.PI / 2);
    nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);
    nextPoint = {x : nextPoint.x - sqSize, y : nextPoint.y};
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);

    angle += (Math.PI / 2);
    nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);
    nextPoint = {x : nextPoint.x, y : nextPoint.y - sqSize};
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);

    angle += (Math.PI / 2);
    nextPoint = angleToPointFrom(nextPoint, angle, sqSize);
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);
    nextPoint = {x : nextPoint.x + sqSize, y: nextPoint.y};
    graphics.drawRectWithCenter(nextPoint, sqSize, sqSize);

    vizApp.resize();
}
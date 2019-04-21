window.onload = function () {
    const vizApp = new VizApp();
    const graphics = vizApp.getGraphics("ifs-tree");

    const base = {
        x: vizApp.width / 2,
        y: vizApp.height * 0.9
    };

    var drawTree = function (base, angle, scale, step) {

        var stem = angleToPointFrom(base, angle - (Math.PI / 2), scale);

        if (step == 0) {

            graphics.drawLine(base, stem);
            // draw branches
            var rAngle = angle - (Math.PI / 4);
            var rBranch = angleToPointFrom(stem, rAngle, scale);
            graphics.drawLine(stem, rBranch);

            var lAngle = rAngle - (Math.PI / 2);
            var lBranch = angleToPointFrom(stem, lAngle, scale);
            graphics.drawLine(stem, lBranch);
            return;
        } else {
            graphics.drawLine(base, stem);
            drawTree(stem, angle - (Math.PI / 4), scale / 1.6, step - 1);
            drawTree(stem, angle + (Math.PI / 4), scale / 1.6, step - 1);
        }
    };

    drawTree(base, 0, vizApp.height * 0.4, 10);

    vizApp.resize();
}
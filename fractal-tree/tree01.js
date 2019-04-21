window.onload = function () {
    const vizApp = new VizApp();
    const graphics = vizApp.getGraphics("ifs-tree");

    const base = {
        x: vizApp.width / 2,
        y: vizApp.height * 0.97
    };

    var drawBranchShape = function (base, stem) {
        // graphics.drawLine(base, stem);
        graphics.drawCircle(midPoint(base, stem), distance(base, stem) / 2);
    };

    var drawLeafShape = function (base, stem) {
        drawBranchShape(base, stem);
        graphics.drawPoint(stem, size = 1);
    };

    var drawTree = function (base, angle, scale, step) {

        const rotAngle = Math.PI / 4;
        var stem = angleToPointFrom(base, angle - (Math.PI / 2), scale);

        if (step == 0) {

            drawBranchShape(base, stem);

            // draw branches
            var rAngle = angle - rotAngle;
            var rBranch = angleToPointFrom(stem, rAngle, scale);
            drawLeafShape(stem, rBranch);


            var lAngle = rAngle - (2 * rotAngle);
            var lBranch = angleToPointFrom(stem, lAngle, scale);
            drawLeafShape(stem, lBranch);
            return;
        } else {
            drawBranchShape(base, stem);
            drawTree(stem, angle - rotAngle, scale / 1.7, step - 1);
            drawTree(stem, angle + rotAngle, scale / 1.7, step - 1);
        }
    };

    drawTree(base, 0, vizApp.height * 0.4, 10);
    drawTree(base, Math.PI / 4, vizApp.height * 0.4, 10);
    drawTree(base, -Math.PI / 4, vizApp.height * 0.4, 10);

    vizApp.resize();
}
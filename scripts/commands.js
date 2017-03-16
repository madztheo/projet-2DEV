"use strict";
var turtle_1 = require("./turtle");
var Commands = (function () {
    function Commands() {
        this.turtle = new turtle_1.Turtle();
    }
    Commands.prototype.moveForward = function (pixels) {
        this.turtle.move(0, pixels);
    };
    return Commands;
}());
exports.Commands = Commands;
//# sourceMappingURL=commands.js.map
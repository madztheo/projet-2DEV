define(["require", "exports", "./turtle"], function (require, exports, turtle_1) {
    "use strict";
    var CommandManager = (function () {
        function CommandManager() {
            this.turtle = new turtle_1.Turtle();
        }
        CommandManager.prototype.moveForward = function (pixels) {
            this.turtle.move(0, -pixels);
        };
        return CommandManager;
    }());
    exports.CommandManager = CommandManager;
});
//# sourceMappingURL=commands.js.map
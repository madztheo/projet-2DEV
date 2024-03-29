define(["require", "exports", "./turtle", "./command"], function (require, exports, turtle_1, command_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandManager = (function () {
        function CommandManager() {
            this.turtle = new turtle_1.Turtle();
        }
        CommandManager.prototype.getCommandName = function (cmd) {
            var regex = /^\s*[A-Z]*/g;
            return (regex.exec(cmd)[0]).trim();
        };
        CommandManager.prototype.executeCommand = function (cmd) {
            var cmdName = this.getCommandName(cmd);
            var cmdToExecute;
            for (var _i = 0, cmdClasses_1 = command_1.cmdClasses; _i < cmdClasses_1.length; _i++) {
                var cmdClass = cmdClasses_1[_i];
                var command = new cmdClass();
                if (cmdName == command.cmdName) {
                    cmdToExecute = command;
                }
            }
            if (cmdToExecute != null) {
                return cmdToExecute.execute(cmd, this.turtle);
            }
            else {
                return false;
            }
        };
        return CommandManager;
    }());
    exports.CommandManager = CommandManager;
});
//# sourceMappingURL=command-manager.js.map
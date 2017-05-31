define(["require", "exports", "./turtle", "./command"], function (require, exports, turtle_1, command_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommandManager = (function () {
        function CommandManager() {
            this.turtle = new turtle_1.Turtle();
        }
        CommandManager.prototype.getCommandName = function (cmd) {
            var regex = /^[A-Z]*/g;
            return regex.exec(cmd)[0];
        };
        CommandManager.prototype.executeCommand = function (cmd) {
            var cmdName = this.getCommandName(cmd);
            var cmdToExecute;
            for (var _i = 0, cmdList_1 = command_1.cmdList; _i < cmdList_1.length; _i++) {
                var command = cmdList_1[_i];
                if (cmdName == command.cmdName) {
                    cmdToExecute = Object.create(command);
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
define(["require", "exports", "./turtle", "./command"], function (require, exports, turtle_1, command_1) {
    "use strict";
    var CommandManager = (function () {
        function CommandManager() {
            this.turtle = new turtle_1.Turtle();
        }
        CommandManager.prototype.getCommandName = function (cmd) {
            cmd = cmd.trim();
            var cmdParts = cmd.split(" ");
            cmdParts.forEach(function (x) { return x = x.trim(); });
            if (cmdParts.length == 0) {
                return "";
            }
            return cmdParts[0];
        };
        CommandManager.prototype.executeCommand = function (cmd) {
            var cmdName = this.getCommandName(cmd);
            switch (cmdName) {
                case "AV":
                    var avCmd = new command_1.AVCmd();
                    avCmd.execute(cmd, this.turtle);
                    break;
            }
            return true;
        };
        return CommandManager;
    }());
    exports.CommandManager = CommandManager;
});
//# sourceMappingURL=command-manager.js.map
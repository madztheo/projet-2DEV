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
            var cmdToExecute;
            switch (cmdName) {
                case "AV":
                    cmdToExecute = new command_1.AVCmd();
                    break;
                case "RE":
                    cmdToExecute = new command_1.RECmd();
                    break;
                case "TD":
                    cmdToExecute = new command_1.TDCmd();
                    break;
                case "TG":
                    cmdToExecute = new command_1.TGCmd();
                    break;
                case "FCC":
                    cmdToExecute = new command_1.FCCCmd();
                    break;
                case "LC":
                    cmdToExecute = new command_1.LCCmd();
                    break;
                case "BC":
                    cmdToExecute = new command_1.BCCmd();
                    break;
                case "VE":
                    cmdToExecute = new command_1.VECmd();
                    break;
                case "CT":
                    cmdToExecute = new command_1.CTCmd();
                    break;
                case "MT":
                    cmdToExecute = new command_1.MTCmd();
                    break;
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
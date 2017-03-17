var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    /**
     * Class representing the basic structure of a LOGO command
     */
    var Command = (function () {
        function Command() {
        }
        /**
         * Analyze the command and if it is correct retrieve all the arguments from it
         * @param command The command to be analyzed
         */
        Command.prototype.check = function (command) {
            command = command.trim(); //Get rid of the eventual spaces at the beginning and end of the command
            var cmdParts = command.split(" "); //Split the command into an array to get the name and arguments
            cmdParts.forEach(function (x) { return x = x.trim(); }); //Make sure to get rid of the spaces in every elements of the array
            //Check if all the necessary have been given
            if (cmdParts.length <= this.expectedArgs.length || cmdParts.length > this.expectedArgs.length + 1) {
                return false;
            }
            //First check if the name of the command is the right one
            var cmdName = cmdParts[0];
            if (cmdName != this.cmdName) {
                return false;
            }
            cmdParts.shift(); //Take out the command's name from the array
            this.args = cmdParts; //Update the array of arguments with the arguments retrieved from the command
            //Check if the arguments passed match with the expected arguments
            for (var i = 0; i < this.args.length; i++) {
                if (this.expectedArgs[i].type == "number") {
                    var nb = parseInt(this.args[i]);
                    if (isNaN(nb)) {
                        return false;
                    }
                    this.args[i] = nb;
                }
                else if (this.expectedArgs[i].type != typeof this.args[i]) {
                    return false;
                }
            }
            return true;
        };
        /**
         * Check if the command can be executed and if so, executes it
         * @param cmd The command to be executed
         * @param turtle The turtle object to modified in consequence
         */
        Command.prototype.execute = function (cmd, turtle) {
            return this.check(cmd);
        };
        return Command;
    }());
    exports.Command = Command;
    /**
     * The AV command to move the turtle forward on the screen
     */
    var AVCmd = (function (_super) {
        __extends(AVCmd, _super);
        function AVCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "AV";
            _this.expectedArgs = [
                { name: "position", type: "number" }
            ];
            return _this;
        }
        AVCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.move(0, -this.args[0]);
            return true;
        };
        return AVCmd;
    }(Command));
    exports.AVCmd = AVCmd;
});
//# sourceMappingURL=command.js.map
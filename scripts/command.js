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
    /**
     * The RE command to move the turtle backward on the screen
     */
    var RECmd = (function (_super) {
        __extends(RECmd, _super);
        function RECmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "RE";
            _this.expectedArgs = [
                { name: "position", type: "number" }
            ];
            return _this;
        }
        RECmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.move(0, this.args[0]);
            return true;
        };
        return RECmd;
    }(Command));
    exports.RECmd = RECmd;
    /**
     * The TD command to turn the turtle to the right
     */
    var TDCmd = (function (_super) {
        __extends(TDCmd, _super);
        function TDCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "TD";
            _this.expectedArgs = [
                { name: "degrees", type: "number" }
            ];
            return _this;
        }
        TDCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.rotate(this.args[0]);
            return true;
        };
        return TDCmd;
    }(Command));
    exports.TDCmd = TDCmd;
    /**
     * The TG command to turn the turtle to the left
     */
    var TGCmd = (function (_super) {
        __extends(TGCmd, _super);
        function TGCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "TG";
            _this.expectedArgs = [
                { name: "degrees", type: "number" }
            ];
            return _this;
        }
        TGCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.rotate(-this.args[0]);
            return true;
        };
        return TGCmd;
    }(Command));
    exports.TGCmd = TGCmd;
    /**
     * The FCC command to to change the trace's color
     */
    var FCCCmd = (function (_super) {
        __extends(FCCCmd, _super);
        function FCCCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "FCC";
            _this.expectedArgs = [
                { name: "color", type: "string" }
            ];
            return _this;
        }
        FCCCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            return true;
        };
        return FCCCmd;
    }(Command));
    exports.FCCCmd = FCCCmd;
    /**
     * The LC command to hide the trace
     */
    var LCCmd = (function (_super) {
        __extends(LCCmd, _super);
        function LCCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "LC";
            _this.expectedArgs = [];
            return _this;
        }
        LCCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.setTraceStatus(false);
            return true;
        };
        return LCCmd;
    }(Command));
    exports.LCCmd = LCCmd;
    /**
     * The BC command to show the trace
     */
    var BCCmd = (function (_super) {
        __extends(BCCmd, _super);
        function BCCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "BC";
            _this.expectedArgs = [];
            return _this;
        }
        BCCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.setTraceStatus(true);
            return true;
        };
        return BCCmd;
    }(Command));
    exports.BCCmd = BCCmd;
    /**
     * The VE command to clear the screen and reset the position of the turtle
     */
    var VECmd = (function (_super) {
        __extends(VECmd, _super);
        function VECmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "VE";
            _this.expectedArgs = [];
            return _this;
        }
        VECmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.resetTurtle();
            return true;
        };
        return VECmd;
    }(Command));
    exports.VECmd = VECmd;
    /**
     * The CT command to hide the turtle
     */
    var CTCmd = (function (_super) {
        __extends(CTCmd, _super);
        function CTCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "CT";
            _this.expectedArgs = [];
            return _this;
        }
        CTCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.setVisibility(false);
            return true;
        };
        return CTCmd;
    }(Command));
    exports.CTCmd = CTCmd;
    /**
     * The MT command to show the turtle
     */
    var MTCmd = (function (_super) {
        __extends(MTCmd, _super);
        function MTCmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "MT";
            _this.expectedArgs = [];
            return _this;
        }
        MTCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.setVisibility(true);
            return true;
        };
        return MTCmd;
    }(Command));
    exports.MTCmd = MTCmd;
    /**
     * The REPETE command to repete another command a certain number of times
     */
    var REPETECmd = (function (_super) {
        __extends(REPETECmd, _super);
        function REPETECmd() {
            var _this = _super.call(this) || this;
            _this.cmdName = "REPETE";
            _this.expectedArgs = [
                { name: "times", type: "number" },
                { name: "commands", type: "command" }
            ];
            ;
            return _this;
        }
        REPETECmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            return true;
        };
        return REPETECmd;
    }(Command));
    exports.REPETECmd = REPETECmd;
});
//# sourceMappingURL=command.js.map
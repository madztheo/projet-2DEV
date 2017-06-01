var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Class representing the basic structure of a LOGO command
     */
    var Command = (function () {
        function Command() {
            this.args = [];
        }
        Command.prototype.buildRegEx = function () {
            var strRegex = "^\\s*" + this.cmdName;
            for (var _i = 0, _a = this.expectedArgs; _i < _a.length; _i++) {
                var arg = _a[_i];
                if (arg.type == "number") {
                    strRegex += "\\s*[0-9]+";
                }
                else if (arg.type == "hexadecimal") {
                    strRegex += "\\s*#?[0-9A-Fa-f]+";
                }
                else {
                    strRegex += "\\s*#?\\w+";
                }
            }
            return new RegExp(strRegex + "\\s*$");
        };
        /**
         * Analyze the command and if it is correct retrieve all the arguments from it
         * @param command The command to be analyzed
         */
        Command.prototype.check = function (command) {
            var regex = this.buildRegEx();
            if (!regex.test(command)) {
                return false;
            }
            command = command.replace(this.cmdName, ""); //We take out the name of the command
            this.args = command.match(/#?\w+/g); //Update the array of arguments with the arguments retrieved from the command
            if (this.args != null) {
                //Check if the arguments passed match with the expected arguments types
                for (var i = 0; i < this.args.length; i++) {
                    if (this.expectedArgs[i].type == "number") {
                        var nb = parseInt(this.args[i]);
                        if (isNaN(nb)) {
                            return false;
                        }
                        this.args[i] = nb;
                    }
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
            turtle.move(-this.args[0]);
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
            turtle.move(this.args[0]);
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
                { name: "color", type: "hexadecimal" }
            ];
            return _this;
        }
        FCCCmd.prototype.execute = function (cmd, turtle) {
            var success = _super.prototype.execute.call(this, cmd, turtle);
            if (!success) {
                return false;
            }
            turtle.setTraceColor(this.args[0]);
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
            _this.subcommands = [];
            _this.subcommands = [];
            _this.cmdName = "REPETE";
            _this.expectedArgs = [
                { name: "times", type: "number" },
                { name: "commands", type: "commands" }
            ];
            ;
            return _this;
        }
        REPETECmd.prototype.buildRegEx = function () {
            return /^\s*REPETE\s*[0-9]+\s*\[(#?(\w|\s))+\]\s*$/;
        };
        REPETECmd.prototype.getSubCommands = function () {
            var currentCmdStr = "";
            var currentCmd = null;
            for (var i = 1; i < this.args.length; i++) {
                var arg = this.args[i];
                var newCmd = false;
                for (var _i = 0, cmdClasses_1 = exports.cmdClasses; _i < cmdClasses_1.length; _i++) {
                    var cmdClass = cmdClasses_1[_i];
                    var cmd = new cmdClass();
                    if (cmd.cmdName == arg) {
                        if (currentCmd != null) {
                            if (currentCmd.check(currentCmdStr)) {
                                this.subcommands.push({
                                    literalCmd: currentCmdStr, command: currentCmd
                                });
                            }
                            else {
                                return false;
                            }
                        }
                        currentCmd = cmd;
                        newCmd = true;
                        currentCmdStr = arg;
                        break;
                    }
                }
                if (!newCmd) {
                    currentCmdStr += " " + arg;
                }
            }
            if (currentCmd != null) {
                if (currentCmd.check(currentCmdStr)) {
                    this.subcommands.push({
                        literalCmd: currentCmdStr, command: currentCmd
                    });
                }
                else {
                    return false;
                }
            }
            console.log(this.subcommands);
            return true;
        };
        REPETECmd.prototype.check = function (command) {
            var regex = this.buildRegEx();
            if (!regex.test(command)) {
                return false;
            }
            command = command.replace(this.cmdName, ""); //We take out the name of the command
            this.args = command.match(/#?\w+/g); //Update the array of arguments with the arguments retrieved from the command
            if (this.args != null) {
                //Check if the arguments passed match with the expected arguments
                for (var i = 0; i < this.args.length; i++) {
                    if (i < this.expectedArgs.length && this.expectedArgs[i].type == "number") {
                        var nb = parseInt(this.args[i]);
                        if (isNaN(nb)) {
                            return false;
                        }
                        this.args[i] = nb;
                    }
                }
            }
            return this.getSubCommands();
        };
        REPETECmd.prototype.execute = function (cmd, turtle) {
            var _this = this;
            var success = this.check(cmd);
            if (!success) {
                return false;
            }
            for (var i = 0; i < this.args[0]; i++) {
                setTimeout(function () {
                    for (var _i = 0, _a = _this.subcommands; _i < _a.length; _i++) {
                        var cmd_1 = _a[_i];
                        cmd_1.command.execute(cmd_1.literalCmd, turtle);
                    }
                }, 100 * (i + 1));
            }
            return true;
        };
        return REPETECmd;
    }(Command));
    exports.REPETECmd = REPETECmd;
    exports.cmdClasses = [
        AVCmd, RECmd, CTCmd, BCCmd, FCCCmd, LCCmd, MTCmd, TDCmd, TGCmd,
        VECmd, REPETECmd
    ];
});
//# sourceMappingURL=command.js.map
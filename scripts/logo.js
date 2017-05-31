define(["require", "exports", "./command-manager"], function (require, exports, command_manager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var commandManager = new command_manager_1.CommandManager();
    var commandHistory = [];
    exports.screen = $("#graphicPart");
    var currentCommandIndex = -1;
    $("#consoleInput").keydown(function (event) {
        if (event.which == 13) {
            checkInput($(this).val());
        }
        else if (event.which == 38) {
            if (commandHistory.length > 0 && currentCommandIndex >= 0) {
                $("#consoleInput").val(commandHistory[currentCommandIndex]);
                currentCommandIndex--;
            }
        }
        else if (event.which == 40) {
            if (commandHistory.length > 0 && currentCommandIndex <= commandHistory.length - 1) {
                currentCommandIndex++;
                $("#consoleInput").val(commandHistory[currentCommandIndex]);
            }
        }
    });
    function checkInput(input) {
        updateCommandHistory(input);
        $("#consoleInput").val("");
        var success = commandManager.executeCommand(input);
        if (!success) {
            alert("The command couldn't be executed");
        }
    }
    function updateCommandHistory(cmd) {
        commandHistory.push(cmd);
        currentCommandIndex = commandHistory.length - 1;
        $("#cmdHistoryList").css("display", "block");
        $("#cmdHistoryList li:nth-child(2)").text(commandHistory[commandHistory.length - 1]);
        $("#cmdHistoryList li:nth-child(2)").css("display", "block");
        if (commandHistory.length > 1) {
            $("#cmdHistoryList li:first").text(commandHistory[commandHistory.length - 2]);
            $("#cmdHistoryList li:first").css("display", "block");
        }
    }
});
/*let i = 0;
setInterval(() => {
    i++;
}, 500);*/ 
//# sourceMappingURL=logo.js.map
define(["require", "exports", "./command-manager"], function (require, exports, command_manager_1) {
    "use strict";
    var commandManager = new command_manager_1.CommandManager();
    var commandHistory = [];
    exports.screen = $("#graphicPart");
    $("#consoleInput").keydown(function (event) {
        if (event.which == 13) {
            checkInput($(this).val());
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
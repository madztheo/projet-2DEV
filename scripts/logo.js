define(["require", "exports", "./commands"], function (require, exports, commands_1) {
    "use strict";
    var commands = new commands_1.Commands();
    exports.screen = $("#graphicPart");
    $("#consoleInput").change(function () {
        checkInput($(this).val());
    });
    function checkInput(input) {
        switch (input) {
            case "move":
                commands.moveForward(20);
                break;
        }
    }
});
/*let i = 0;
setInterval(() => {
    i++;
}, 500);*/ 
//# sourceMappingURL=logo.js.map
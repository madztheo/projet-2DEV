import { CommandManager } from "./command-manager";
import { Turtle } from "./turtle";

let commandManager = new CommandManager();

let commandHistory : string[] = [];

export const screen = $("#graphicPart");

$("#consoleInput").keydown(function(event : JQueryKeyEventObject){
    if(event.which == 13){//Enter
        checkInput($(this).val());
    } 
});

function checkInput(input : string){
    updateCommandHistory(input);
    $("#consoleInput").val("");
    let success = commandManager.executeCommand(input);
    if(!success){
        alert("The command coudln't be executed");
    }
}

function updateCommandHistory(cmd : string){
    commandHistory.push(cmd);
    $("#cmdHistoryList").css("display", "block");
    $("#cmdHistoryList li:nth-child(2)").text(commandHistory[commandHistory.length-1]);
    $("#cmdHistoryList li:nth-child(2)").css("display", "block");
    if(commandHistory.length > 1){
        $("#cmdHistoryList li:first").text(commandHistory[commandHistory.length-2]);
        $("#cmdHistoryList li:first").css("display", "block");
    }
}

/*let i = 0;
setInterval(() => {
    i++;
}, 500);*/
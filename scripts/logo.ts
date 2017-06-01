import { CommandManager } from "./command-manager";
import { Turtle } from "./turtle";

let commandManager = new CommandManager();

let commandHistory : string[] = [];

export const screen = $("#graphicPart");

let currentCommandIndex = -1;


$(window).keydown(function(){
    $("#consoleInput").focus();
});

$("#consoleInput").focus();

$("#consoleInput").keydown(function(event : JQueryKeyEventObject){
    if(event.which == 13){//Enter
        checkInput($(this).val());
    } 
    else if(event.which == 38){ //Top arrow key
        if(commandHistory.length > 0 && currentCommandIndex >= 0){
            $("#consoleInput").val(commandHistory[currentCommandIndex]);
            currentCommandIndex--;
        }
    }
    else if(event.which == 40){ //Down arrow key
        if(commandHistory.length > 0 && currentCommandIndex <= commandHistory.length - 1){
            currentCommandIndex++;
            $("#consoleInput").val(commandHistory[currentCommandIndex]);
        }
    }
});

function checkInput(input : string){
    updateCommandHistory(input);
    $("#consoleInput").val("");
    let success = commandManager.executeCommand(input);
    if(!success){
        alert("The command couldn't be executed");
    }
}

function updateCommandHistory(cmd : string){
    commandHistory.push(cmd);
    currentCommandIndex = commandHistory.length - 1;
    $("#cmdHistoryList").css("display", "block");
    $("#cmdHistoryList li:nth-child(2)").text(commandHistory[commandHistory.length-1]);
    $("#cmdHistoryList li:nth-child(2)").css("display", "block");
    if(commandHistory.length > 1){
        $("#cmdHistoryList li:first").text(commandHistory[commandHistory.length-2]);
        $("#cmdHistoryList li:first").css("display", "block");
    }
}
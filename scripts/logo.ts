import { Commands } from "./commands";
import { Turtle } from "./turtle";

let commands = new Commands();

export const screen = $("#graphicPart");

$("#consoleInput").change(function(){
    checkInput($(this).val());
});

function checkInput(input : string){
    switch(input)
    {
        case "move":
        commands.moveForward(20);
        break;
    }
}

/*let i = 0;
setInterval(() => {
    i++;
}, 500);*/
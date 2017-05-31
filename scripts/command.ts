import { Turtle } from './turtle';

/**
 * Describe a command's argument
 */
interface CommandArgument{
    name : string;
    type : string;
}

/**
 * Class representing the basic structure of a LOGO command
 */
export abstract class Command{
    public cmdName : string; //The name of the command
    protected expectedArgs : CommandArgument[]; //Describe the expected arguments and their type
    protected args : any[]; //The actual arguments

    protected buildRegEx() : RegExp {
        let strRegex = "^[A-Z]+";
        for(let arg of this.expectedArgs){
            if(arg.type == "number"){
                strRegex += " [0-9]+";
            } else {
                strRegex + " #?\w+";
            }
        }
        return new RegExp(strRegex);
    }

    /**
     * Analyze the command and if it is correct retrieve all the arguments from it
     * @param command The command to be analyzed
     */
    check(command : string) : boolean {
        command = command.trim(); //Get rid of the eventual spaces at the beginning and end of the command

        const regex = this.buildRegEx();

        if(!regex.test(command)){
            return false;
        }

        command = command.replace(/^[A-Z]+/, "");//We take out the name of the command

        this.args = command.match(/#?\w+/g); //Update the array of arguments with the arguments retrieved from the command
        
        if(this.args != null){
            //Check if the arguments passed match with the expected arguments types
            for(let i = 0; i < this.args.length; i++){
                if(this.expectedArgs[i].type == "number"){
                    let nb = parseInt(this.args[i]);
                    if(isNaN(nb)){
                        return false;
                    }
                    this.args[i] = nb;
                } else if(this.expectedArgs[i].type != typeof this.args[i]){
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Check if the command can be executed and if so, executes it 
     * @param cmd The command to be executed
     * @param turtle The turtle object to modified in consequence
     */
    execute(cmd : string, turtle : Turtle) : boolean{
        return this.check(cmd);
    }
}

/**
 * The AV command to move the turtle forward on the screen
 */
export class AVCmd extends Command {

    constructor(){
        super();
        this.cmdName = "AV";
        this.expectedArgs = [
            { name : "position", type : "number" }
        ];
    }

    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.move(-this.args[0]);
        return true;
    }
}

/**
 * The RE command to move the turtle backward on the screen
 */
export class RECmd extends Command{

    constructor(){
        super();
        this.cmdName = "RE";
        this.expectedArgs = [
            { name : "position", type : "number" }
        ];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.move(this.args[0]);
        return true;
    }
}

/**
 * The TD command to turn the turtle to the right
 */
export class TDCmd extends Command{
    constructor(){
        super();
        this.cmdName = "TD";
        this.expectedArgs = [
            { name : "degrees", type : "number" }
        ];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.rotate(this.args[0]);
        return true;
    }
}

/**
 * The TG command to turn the turtle to the left
 */
export class TGCmd extends Command{
    constructor(){
        super();
        this.cmdName = "TG";
        this.expectedArgs = [
            { name : "degrees", type : "number" }
        ];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.rotate(-this.args[0]);
        return true;
    }
}

/**
 * The FCC command to to change the trace's color
 */
export class FCCCmd extends Command{
    constructor(){
        super();
        this.cmdName = "FCC";
        this.expectedArgs = [
            { name : "color", type : "string" }
        ];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }
        turtle.setTraceColor(this.args[0]);
        return true;
    }
}


/**
 * The LC command to hide the trace
 */
export class LCCmd extends Command{
    constructor(){
        super();
        this.cmdName = "LC";
        this.expectedArgs = [];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.setTraceStatus(false);
        return true;
    }
}

/**
 * The BC command to show the trace
 */
export class BCCmd extends Command{
    constructor(){
        super();
        this.cmdName = "BC";
        this.expectedArgs = [];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.setTraceStatus(true);
        return true;
    }
}

/**
 * The VE command to clear the screen and reset the position of the turtle
 */
export class VECmd extends Command{
    constructor(){
        super();
        this.cmdName = "VE";
        this.expectedArgs = [];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.resetTurtle();
        return true;
    }
}

/**
 * The CT command to hide the turtle
 */
export class CTCmd extends Command{
    constructor(){
        super();
        this.cmdName = "CT";
        this.expectedArgs = [];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.setVisibility(false);
        return true;
    }
}

/**
 * The MT command to show the turtle
 */
export class MTCmd extends Command{
    constructor(){
        super();
        this.cmdName = "MT";
        this.expectedArgs = [];
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = super.execute(cmd, turtle);
        if(!success){
            return false;
        }

        turtle.setVisibility(true);
        return true;
    }
}

interface SubCommand{
    literalCmd : string;
    command : Command;
}

/**
 * The REPETE command to repete another command a certain number of times
 */
export class REPETECmd extends Command{
    subcommands : SubCommand[] = [];

    constructor(){
        super();
        this.cmdName = "REPETE";
        this.expectedArgs = [
            { name : "times", type : "number" },
            { name : "commands", type : "commands" }
        ];;
    }

    getSubCommands() {
        let currentCmdStr = "";
        let currentCmd : Command = null;
        for(let i = 1; i < this.args.length; i++){
            let arg = this.args[i];
            let newCmd = false;
            for(let cmd of cmdList){
                if(cmd.cmdName == arg)
                {
                    if(currentCmd != null){
                        console.log("Command : ");
                        console.log(currentCmd);
                        if(currentCmd.check(currentCmdStr)){
                            this.subcommands.push({ 
                                literalCmd : currentCmdStr, command : currentCmd
                            });
                        }
                    }
                    currentCmd = Object.create(cmd);
                    newCmd = true;
                    currentCmdStr = arg;
                    break;
                }
            }
            if(!newCmd){
                currentCmdStr += " " + arg;
            }
        }
        if(currentCmd != null){
            console.log("Command : ");
            console.log(currentCmd);
            if(currentCmd.check(currentCmdStr)){
                this.subcommands.push({ 
                    literalCmd : currentCmdStr, command : currentCmd
                });
            }
        }
    }

    check(command: string) : boolean {
        command = command.trim(); //Get rid of the eventual spaces at the beginning and end of the command

        const regex = this.buildRegEx();

        if(!regex.test(command)){
            return false;
        }

        command = command.replace(/^[A-Z]+/, "");//We take out the name of the command

        this.args = command.match(/#?\w+/g); //Update the array of arguments with the arguments retrieved from the command
        
        if(this.args != null){
            //Check if the arguments passed match with the expected arguments
            for(let i = 0; i < this.args.length; i++){
                if(i < this.expectedArgs.length && this.expectedArgs[i].type == "number"){
                    let nb = parseInt(this.args[i]);
                    if(isNaN(nb)){
                        return false;
                    }
                    this.args[i] = nb;
                }
            }
        }

        this.getSubCommands();
        return true;
    }
        
    execute(cmd : string, turtle : Turtle) : boolean{
        let success = this.check(cmd);
        if(!success){
            return false;
        }

        for(let i = 0; i < this.args[0]; i++){
            setTimeout(() => {
                for(let cmd of this.subcommands){
                    cmd.command.execute(cmd.literalCmd, turtle);
                }
            }, 100 * (i + 1));
        }
        return true;
    }
}

export const cmdList : Command[] = [
    new AVCmd(), new RECmd(), new CTCmd(), new BCCmd(), 
    new FCCCmd(), new LCCmd(), new MTCmd(), new TDCmd(), new TGCmd(), 
    new VECmd(), new REPETECmd()
];
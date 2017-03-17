import { Turtle } from "./turtle";
import { AVCmd, Command, RECmd, TDCmd, TGCmd } from './command';

export class CommandManager{
    turtle : Turtle;

    constructor(){
        this.turtle = new Turtle();
    }

    private getCommandName(cmd: string){
        cmd = cmd.trim();
        let cmdParts = cmd.split(" ");
        cmdParts.forEach(x => x = x.trim());
        if(cmdParts.length == 0){
            return "";
        }
        return cmdParts[0];
    }

    executeCommand(cmd : string) : boolean {
        let cmdName = this.getCommandName(cmd);
        let cmdToExecute : Command;
        switch(cmdName){
            case "AV":
            cmdToExecute = new AVCmd();
            break;

            case "RE":
            cmdToExecute = new RECmd();
            break;

            case "TD":
            cmdToExecute = new TDCmd();
            break;

            case "TG":
            cmdToExecute = new TGCmd();
            break;
            
        }
        
        if(cmdToExecute != null){
            return cmdToExecute.execute(cmd, this.turtle);
        } else{
            return false;
        }
  
    }
}

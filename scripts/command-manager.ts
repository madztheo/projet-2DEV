import { Turtle } from "./turtle";
import { AVCmd, BCCmd, Command, CTCmd, FCCCmd, LCCmd, MTCmd, RECmd, REPETECmd, TDCmd, TGCmd, VECmd, cmdClasses } from './command';

export class CommandManager{
    turtle : Turtle;

    constructor(){
        this.turtle = new Turtle();
    }

    private getCommandName(cmd: string){
        var regex = /^\s*[A-Z]*/g;
        return (regex.exec(cmd)[0]).trim();
    }

    executeCommand(cmd : string) : boolean {
        let cmdName = this.getCommandName(cmd);
        let cmdToExecute : Command;
        for(let cmdClass of cmdClasses){
            let command = new cmdClass();
            if(cmdName == command.cmdName){
                cmdToExecute = command;
            }
        }
        
        if(cmdToExecute != null){
            return cmdToExecute.execute(cmd, this.turtle);
        } else{
            return false;
        }
  
    }
}

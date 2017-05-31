import { Turtle } from "./turtle";
import { AVCmd, BCCmd, Command, CTCmd, FCCCmd, LCCmd, MTCmd, RECmd, REPETECmd, TDCmd, TGCmd, VECmd, cmdList } from './command';

export class CommandManager{
    turtle : Turtle;

    constructor(){
        this.turtle = new Turtle();
    }

    private getCommandName(cmd: string){
        var regex = /^[A-Z]*/g;
        return regex.exec(cmd)[0];
    }

    executeCommand(cmd : string) : boolean {
        let cmdName = this.getCommandName(cmd);
        let cmdToExecute : Command;
        for(let command of cmdList){
            if(cmdName == command.cmdName){
                cmdToExecute = Object.create(command);
            }
        }
        
        if(cmdToExecute != null){
            return cmdToExecute.execute(cmd, this.turtle);
        } else{
            return false;
        }
  
    }
}

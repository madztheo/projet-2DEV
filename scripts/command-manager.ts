import { Turtle } from "./turtle";
import { AVCmd } from "./command";

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
        switch(cmdName){
            case "AV":
            let avCmd = new AVCmd();
            avCmd.execute(cmd, this.turtle);
            break;
        }
        return true;
    }
}

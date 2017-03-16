import { Turtle } from "./turtle";

export class Commands{
    turtle : Turtle;

    constructor(){
        this.turtle = new Turtle();
    }

    moveForward(pixels : number){
        this.turtle.move(0, -pixels);
    }
}

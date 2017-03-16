export class Turtle{
    x : number;
    y : number;
    rotation : number;
    traceColor : string;
    isTraceActive : boolean;
    isVisible : boolean;
    htmlRepresentation : JQuery;

    constructor(){
        this.htmlRepresentation = $("#turtle");
        this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
    }

    private draw(){
        this.htmlRepresentation.css({
            'left' : `${this.x}px`,
            'top' : `${this.y}px`
        });
    }

    placeAt(posX : number, posY : number){
        this.x = posX;
        this.y = posY;
        this.draw();
    }

    move(posX : number, posY : number){
        this.x += posX;
        this.y += posY;
        this.draw();
    }

    rotate(degrees : number){
        this.rotation += degrees % 360;
        this.draw();
    }

    setRotation(degrees : number){
        this.rotation = degrees % 360;
        this.draw();
    }
}
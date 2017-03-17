export class Turtle{
    private x : number;
    private y : number;
    private rotation : number = 0; 
    private traceColor : string = "#FFFFFF";
    private isTraceActive : boolean;
    private isVisible : boolean;
    private htmlRepresentation : JQuery;

    constructor(){
        this.htmlRepresentation = $("#turtle");  
        this.resetTurtle();
    }

    private drawTrace(){
        
    }

    private drawTurtle(){
        this.htmlRepresentation.css({
            'left' : `${this.x}px`,
            'top' : `${this.y}px`,
            'transform' :  `rotate(${this.rotation}deg)`,
            '-webkit-transform' :  `rotate(${this.rotation}deg)`,
            '-ms-transform' :  `rotate(${this.rotation}deg)`,
        });
    }

    resetTurtle(){
        this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
    }

    placeAt(posX : number, posY : number){
        this.x = posX;
        this.y = posY;
        this.drawTurtle();
    }

    move(posX : number, posY : number){
        this.x += posX;
        this.y += posY;
        this.drawTurtle();
    }

    rotate(degrees : number){
        this.rotation = (this.rotation + degrees) % 360
        this.drawTurtle();
    }

    setRotation(degrees : number){
        this.rotation = degrees % 360;
        this.drawTurtle();
    }

    setTraceStatus(value : boolean){
        this.isTraceActive = value;
    }

    getTraceStatus() : boolean {
        return this.isTraceActive;
    }

    setVisibility(value : boolean){
        this.isVisible = value;
    }

    getVisibility() : boolean{
        return this.isVisible;
    }
}
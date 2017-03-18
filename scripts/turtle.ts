export class Turtle{
    private x : number;
    private y : number;
    private rotation : number = 0; 
    private traceColor : string = "#FFFFFF";
    private isTraceActive : boolean = true;
    private isVisible : boolean = true;
    private htmlRepresentation : JQuery;
    private vector : number[] = [0,1];

    constructor(){
        this.htmlRepresentation = $("#turtle");  
        this.resetTurtle();
    }

    private drawTrace(oldX : number, oldY : number){
        let trace = $(`
            <div class="turtle-trace">
            </div>
        `);
        let distanceY = oldY - this.y;
        let distanceX = oldX - this.x;
        console.log(distanceY);
        trace.css({
            "height" : distanceY == 0 ? "2px" : `${Math.abs(distanceY)}px`,
            "width" : distanceX == 0 ? "2px" : `${Math.abs(distanceX)}px`,
            'left' : `${this.x + 4}px`,
            /*'transform' :  `rotate(${this.rotation}deg)`,
            '-webkit-transform' :  `rotate(${this.rotation}deg)`,
            '-ms-transform' :  `rotate(${this.rotation}deg)`,*/
            'top' : distanceY < 0 ? `${this.y + distanceY}px` : `${this.y + 10}px`,
            'background-color' : `${this.traceColor}`
        });
        $("#graphicPart").append(trace);

    }

    private drawTurtle(){
        this.htmlRepresentation.css({
            'left' : `${this.x}px`,
            'top' : `${this.y}px`,
            'transform' :  `rotate(${this.rotation}deg)`,
            '-webkit-transform' :  `rotate(${this.rotation}deg)`,
            '-ms-transform' :  `rotate(${this.rotation}deg)`,
            'display' : this.isVisible ? "block" : "none"
        });
    }

    resetTurtle(){
        this.rotation = 0;
        this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
        $(".turtle-trace").remove();
    }

    placeAt(posX : number, posY : number){
        this.x = posX;
        this.y = posY;
        this.drawTurtle();
    }

    move(posX : number, posY : number){
        let oldX = this.x;
        let oldY = this.y;
        this.x += this.vector[0] * posX;
        this.y += this.vector[1] * posY;
        if(this.isTraceActive){
            this.drawTrace(oldX, oldY);
        }
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
        this.drawTurtle();
    }

    getVisibility() : boolean{
        return this.isVisible;
    }

    setTraceColor(color : string){
        this.traceColor = color;
    }
}
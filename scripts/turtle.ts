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
        let distance = Math.sqrt(Math.pow(oldX - this.x, 2) + Math.pow(oldY - this.y, 2));
        let transform = this.y < oldY || this.x < oldX || (this.y >= oldY && this.x >= oldX) ? `rotate(${this.rotation + 90}deg) translate(${distance}px,0)` : `rotate(${this.rotation + 90}deg) translate(0px,0)`;
        console.log("old X : " + oldX + ", current X : " + this.x);
        console.log("old Y : " + oldY + ", current Y : " + this.y);
        //console.log(distance);
        trace.css({
            "height" : "2px",
            "width" : `${distance}px`,
            //We need to compensate as the rotation of the div doesn't change the actual position of it
            'left' : `${this.getTurtlesBottomEdge()[0] - distance/2  - ((distance/2)*this.vector[0])}px`,
            'transform' :  transform,
            '-webkit-transform' :  transform,
            '-ms-transform' :  transform,
            'top' : `${this.getTurtlesBottomEdge()[1] - ((distance/2)*this.vector[1])}px`,
            'background-color' : `${this.traceColor}`
        });
        let positiveRotation : number;
        if(this.rotation >= 0){
            positiveRotation = this.rotation;
        }else{
            positiveRotation = 360 + this.rotation;
        }
        $("#graphicPart").append(trace);

    }

    private getTurtlesBottomEdge() : number[]{
        return [(this.x + 5) + (5 * this.vector[0]),
        (this.y + 5) + (5 * this.vector[1])];
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
        this.vector[0] = 0;
        this.vector[1] = 1;
        this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
        $(".turtle-trace").remove();
    }

    placeAt(posX : number, posY : number){
        this.x = posX;
        this.y = posY;
        this.drawTurtle();
    }

    move(pos : number){
        let oldX = this.x;
        let oldY = this.y;
        this.x += this.vector[0] * pos;
        this.y += this.vector[1] * pos;
        if(this.isTraceActive){
            this.drawTrace(oldX, oldY);
        }
        this.drawTurtle();
    }

    private updateVector(){
        //We add 90 degrees to recalibrate to our plan which has as origin the upward direction
        let rotationRad = ((this.rotation + 90) * Math.PI) / 180;
        this.vector[0] = Math.cos(rotationRad);
        this.vector[1] = Math.sin(rotationRad);
    }

    rotate(degrees : number){
        this.rotation = (this.rotation + degrees) % 360;
        this.updateVector();
        this.drawTurtle();
    }

    setRotation(degrees : number){
        this.rotation = degrees % 360;
        this.updateVector();
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
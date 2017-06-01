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
            <line x1="${oldX}" y1="${oldY}" x2="${this.x}" y2="${this.y}" class="turtle-trace"
             style="fill:${this.traceColor};stroke:${this.traceColor};stroke-width:1"/>
        `);
        $("#drawingCanvas").append(trace);
        //To force the visual update of the svg
        $("#drawingCanvas").html($("#drawingCanvas").html());
    }
    
    private drawTurtle(){
        this.htmlRepresentation.attr('points', `${this.x-5},${this.y} ${this.x},${this.y-10} ${this.x+5},${this.y}`);
        this.htmlRepresentation.attr('transform', `rotate(${this.rotation} ${this.x} ${this.y})`);
        $("#turtle").remove();
        $("#drawingCanvas").html($("#drawingCanvas").html());
        if(this.isVisible){
            $("#drawingCanvas").append(this.htmlRepresentation);
            $("#drawingCanvas").html($("#drawingCanvas").html());
        }

    }

    resetTurtle(){
        this.rotation = 0;
        this.vector[0] = 0;
        this.vector[1] = 1;
        this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
        $(".turtle-trace").remove();
        $("#drawingCanvas").html($("#drawingCanvas").html());
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
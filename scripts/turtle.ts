export class Turtle{
    x : number;
    y : number;
    rotation : number;
    traceColor : string;
    isTraceActive : boolean;
    isVisible : boolean;
    htmlRepresentation : JQuery;

    constructor(){
        if($("#graphicPart").find("#turtle") == null)
        {
            $("#graphicPart").append(`
                <div id="turtle">
                </div>
            `);
        }
        this.htmlRepresentation = $("#turtle");
    }

    private draw(){
        this.htmlRepresentation.css({
            
        });
    }

    placeAt(posX : number, posY : number){
        this.x = posX;
        this.y = posY;
    }

    move(posX : number, posY : number){
        this.x += posX;
        this.y += posY;
    }

    rotate(degrees : number){
        this.rotation += degrees % 360;
    }

    setRotation(degrees : number){
        this.rotation = degrees % 360;
    }
}
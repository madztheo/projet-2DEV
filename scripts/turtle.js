define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Turtle = (function () {
        function Turtle() {
            this.rotation = 0;
            this.traceColor = "#FFFFFF";
            this.isTraceActive = true;
            this.isVisible = true;
            this.vector = [0, 1];
            this.htmlRepresentation = $("#turtle");
            this.resetTurtle();
        }
        Turtle.prototype.drawTrace = function (oldX, oldY) {
            var trace = $("\n            <line x1=\"" + oldX + "\" y1=\"" + oldY + "\" x2=\"" + this.x + "\" y2=\"" + this.y + "\" class=\"turtle-trace\"\n             style=\"fill:" + this.traceColor + ";stroke:" + this.traceColor + ";stroke-width:1\"/>\n        ");
            $("#drawingCanvas").append(trace);
            //To force the visual update of the svg
            $("#drawingCanvas").html($("#drawingCanvas").html());
        };
        Turtle.prototype.drawTurtle = function () {
            this.htmlRepresentation.attr('points', this.x - 5 + "," + this.y + " " + this.x + "," + (this.y - 10) + " " + (this.x + 5) + "," + this.y);
            this.htmlRepresentation.attr('transform', "rotate(" + this.rotation + " " + this.x + " " + this.y + ")");
            $("#turtle").remove();
            $("#drawingCanvas").html($("#drawingCanvas").html());
            if (this.isVisible) {
                $("#drawingCanvas").append(this.htmlRepresentation);
                $("#drawingCanvas").html($("#drawingCanvas").html());
            }
        };
        Turtle.prototype.resetTurtle = function () {
            this.rotation = 0;
            this.vector[0] = 0;
            this.vector[1] = 1;
            this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
            $(".turtle-trace").remove();
            $("#drawingCanvas").html($("#drawingCanvas").html());
        };
        Turtle.prototype.placeAt = function (posX, posY) {
            this.x = posX;
            this.y = posY;
            this.drawTurtle();
        };
        Turtle.prototype.move = function (pos) {
            var oldX = this.x;
            var oldY = this.y;
            this.x += this.vector[0] * pos;
            this.y += this.vector[1] * pos;
            if (this.isTraceActive) {
                this.drawTrace(oldX, oldY);
            }
            this.drawTurtle();
        };
        Turtle.prototype.updateVector = function () {
            //We add 90 degrees to recalibrate to our plan which has as origin the upward direction
            var rotationRad = ((this.rotation + 90) * Math.PI) / 180;
            this.vector[0] = Math.cos(rotationRad);
            this.vector[1] = Math.sin(rotationRad);
        };
        Turtle.prototype.rotate = function (degrees) {
            this.rotation = (this.rotation + degrees) % 360;
            this.updateVector();
            this.drawTurtle();
        };
        Turtle.prototype.setRotation = function (degrees) {
            this.rotation = degrees % 360;
            this.updateVector();
            this.drawTurtle();
        };
        Turtle.prototype.setTraceStatus = function (value) {
            this.isTraceActive = value;
        };
        Turtle.prototype.getTraceStatus = function () {
            return this.isTraceActive;
        };
        Turtle.prototype.setVisibility = function (value) {
            this.isVisible = value;
            this.drawTurtle();
        };
        Turtle.prototype.getVisibility = function () {
            return this.isVisible;
        };
        Turtle.prototype.setTraceColor = function (color) {
            this.traceColor = color;
        };
        return Turtle;
    }());
    exports.Turtle = Turtle;
});
//# sourceMappingURL=turtle.js.map
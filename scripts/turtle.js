define(["require", "exports"], function (require, exports) {
    "use strict";
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
            var trace = $("\n            <div class=\"turtle-trace\">\n            </div>\n        ");
            var distance = Math.sqrt(Math.pow(oldX - this.x, 2) + Math.pow(oldY - this.y, 2));
            var transform = oldX > this.x || oldY > this.y ? "rotate(" + (this.rotation + 90) + "deg) translate(" + (distance + 5) + "px,0)" : "rotate(" + (this.rotation + 90) + "deg) translate(5px,0)";
            console.log(distance);
            trace.css({
                "height": "2px",
                "width": distance + "px",
                //We need to compensate as the rotation of the div doesn't change the actual position of it
                'left': this.x + 5 - distance / 2 - ((distance / 2) * this.vector[0]) + "px",
                'transform': transform,
                '-webkit-transform': transform,
                '-ms-transform': transform,
                'top': this.y + 5 - ((distance / 2) * this.vector[1]) + "px",
                'background-color': "" + this.traceColor
            });
            $("#graphicPart").append(trace);
        };
        Turtle.prototype.getTurtlesBottomEdge = function () {
        };
        Turtle.prototype.drawTurtle = function () {
            this.htmlRepresentation.css({
                'left': this.x + "px",
                'top': this.y + "px",
                'transform': "rotate(" + this.rotation + "deg)",
                '-webkit-transform': "rotate(" + this.rotation + "deg)",
                '-ms-transform': "rotate(" + this.rotation + "deg)",
                'display': this.isVisible ? "block" : "none"
            });
        };
        Turtle.prototype.resetTurtle = function () {
            this.rotation = 0;
            this.vector[0] = 0;
            this.vector[1] = 1;
            this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
            $(".turtle-trace").remove();
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
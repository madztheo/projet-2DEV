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
            var distanceY = oldY - this.y;
            var distanceX = oldX - this.x;
            console.log(distanceY);
            trace.css({
                "height": distanceY == 0 ? "2px" : Math.abs(distanceY) + "px",
                "width": distanceX == 0 ? "2px" : Math.abs(distanceX) + "px",
                'left': this.x + 4 + "px",
                /*'transform' :  `rotate(${this.rotation}deg)`,
                '-webkit-transform' :  `rotate(${this.rotation}deg)`,
                '-ms-transform' :  `rotate(${this.rotation}deg)`,*/
                'top': distanceY < 0 ? this.y + distanceY + "px" : this.y + 10 + "px",
                'background-color': "" + this.traceColor
            });
            $("#graphicPart").append(trace);
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
            this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
            $(".turtle-trace").remove();
        };
        Turtle.prototype.placeAt = function (posX, posY) {
            this.x = posX;
            this.y = posY;
            this.drawTurtle();
        };
        Turtle.prototype.move = function (posX, posY) {
            var oldX = this.x;
            var oldY = this.y;
            this.x += this.vector[0] * posX;
            this.y += this.vector[1] * posY;
            if (this.isTraceActive) {
                this.drawTrace(oldX, oldY);
            }
            this.drawTurtle();
        };
        Turtle.prototype.rotate = function (degrees) {
            this.rotation = (this.rotation + degrees) % 360;
            this.drawTurtle();
        };
        Turtle.prototype.setRotation = function (degrees) {
            this.rotation = degrees % 360;
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
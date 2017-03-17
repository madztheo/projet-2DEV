define(["require", "exports"], function (require, exports) {
    "use strict";
    var Turtle = (function () {
        function Turtle() {
            this.rotation = 0;
            this.traceColor = "#FFFFFF";
            this.htmlRepresentation = $("#turtle");
            this.resetTurtle();
        }
        Turtle.prototype.drawTrace = function () {
        };
        Turtle.prototype.drawTurtle = function () {
            this.htmlRepresentation.css({
                'left': this.x + "px",
                'top': this.y + "px",
                'transform': "rotate(" + this.rotation + "deg)",
                '-webkit-transform': "rotate(" + this.rotation + "deg)",
                '-ms-transform': "rotate(" + this.rotation + "deg)",
            });
        };
        Turtle.prototype.resetTurtle = function () {
            this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
        };
        Turtle.prototype.placeAt = function (posX, posY) {
            this.x = posX;
            this.y = posY;
            this.drawTurtle();
        };
        Turtle.prototype.move = function (posX, posY) {
            this.x += posX;
            this.y += posY;
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
        };
        Turtle.prototype.getVisibility = function () {
            return this.isVisible;
        };
        return Turtle;
    }());
    exports.Turtle = Turtle;
});
//# sourceMappingURL=turtle.js.map
define(["require", "exports"], function (require, exports) {
    "use strict";
    var Turtle = (function () {
        function Turtle() {
            this.htmlRepresentation = $("#turtle");
            this.placeAt($(window).width() / 2, $(window).height() / 2 - (($(window).height() / 10) * 2));
        }
        Turtle.prototype.draw = function () {
            this.htmlRepresentation.css({
                'left': this.x + "px",
                'top': this.y + "px"
            });
        };
        Turtle.prototype.placeAt = function (posX, posY) {
            this.x = posX;
            this.y = posY;
            this.draw();
        };
        Turtle.prototype.move = function (posX, posY) {
            this.x += posX;
            this.y += posY;
            this.draw();
        };
        Turtle.prototype.rotate = function (degrees) {
            this.rotation += degrees % 360;
            this.draw();
        };
        Turtle.prototype.setRotation = function (degrees) {
            this.rotation = degrees % 360;
            this.draw();
        };
        return Turtle;
    }());
    exports.Turtle = Turtle;
});
//# sourceMappingURL=turtle.js.map
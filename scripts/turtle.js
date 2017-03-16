"use strict";
var Turtle = (function () {
    function Turtle() {
        if ($("#graphicPart").find("#turtle") == null) {
            $("#graphicPart").append("\n                <div id=\"turtle\">\n                </div>\n            ");
        }
        this.htmlRepresentation = $("#turtle");
    }
    Turtle.prototype.draw = function () {
        this.htmlRepresentation.css({});
    };
    Turtle.prototype.placeAt = function (posX, posY) {
        this.x = posX;
        this.y = posY;
    };
    Turtle.prototype.move = function (posX, posY) {
        this.x += posX;
        this.y += posY;
    };
    Turtle.prototype.rotate = function (degrees) {
        this.rotation += degrees % 360;
    };
    Turtle.prototype.setRotation = function (degrees) {
        this.rotation = degrees % 360;
    };
    return Turtle;
}());
exports.Turtle = Turtle;
//# sourceMappingURL=turtle.js.map
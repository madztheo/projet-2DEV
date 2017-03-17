define(["require", "exports"], function (require, exports) {
    "use strict";
    var AVCmd = (function () {
        function AVCmd() {
            this.name = "AV";
            this.arguments = [
                {
                    pixels: 0
                }
            ];
        }
        return AVCmd;
    }());
    exports.AVCmd = AVCmd;
});
//# sourceMappingURL=command-list.js.map
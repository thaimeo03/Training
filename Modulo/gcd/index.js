"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GCDCalculator = void 0;
var GCDCalculator = /** @class */ (function () {
    function GCDCalculator() {
    }
    GCDCalculator.prototype.gcd = function (a, b) {
        if (b === 0) {
            return a;
        }
        return this.gcd(b, a % b);
    };
    GCDCalculator.prototype.extendGcd = function (a, b) {
        if (b === 0) {
            return [a, 0, 1];
        }
        else {
            var _a = this.extendGcd(b, a % b), d = _a[0], x = _a[1], y = _a[2];
            return [d, y - Math.floor(a / b) * x, x];
        }
    };
    return GCDCalculator;
}());
exports.GCDCalculator = GCDCalculator;

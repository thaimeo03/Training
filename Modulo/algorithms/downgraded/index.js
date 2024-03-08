"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModDownGraded = void 0;
var ModDownGraded = /** @class */ (function () {
    function ModDownGraded(_a) {
        var a = _a.a, m = _a.m, n = _a.n;
        this.a = a;
        this.m = m;
        this.n = n;
    }
    ModDownGraded.prototype.recursive = function (m) {
        if (m === 1)
            return this.a % this.n;
        if (m % 2 === 0)
            return (Math.pow(this.recursive(m / 2), 2)) % this.n;
        else
            return (this.recursive(m - 1) * this.a) % this.n;
    };
    ModDownGraded.prototype.downgraded = function () {
        return this.recursive(this.m);
    };
    return ModDownGraded;
}());
exports.ModDownGraded = ModDownGraded;

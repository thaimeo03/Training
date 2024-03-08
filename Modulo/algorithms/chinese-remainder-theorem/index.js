"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModEquation = void 0;
var mod_inverse_1 = require("../mod-inverse");
var ModEquation = /** @class */ (function () {
    function ModEquation(_a) {
        var m1 = _a.m1, m2 = _a.m2, m3 = _a.m3, a1 = _a.a1, a2 = _a.a2, a3 = _a.a3;
        this.m1 = m1;
        this.m2 = m2;
        this.m3 = m3;
        this.a1 = a1;
        this.a2 = a2;
        this.a3 = a3;
    }
    ModEquation.prototype.chineseRemainderTheorem = function () {
        var m = this.m1 * this.m2 * this.m3;
        var M1 = this.m2 * this.m3;
        var M2 = this.m1 * this.m3;
        var M3 = this.m1 * this.m2;
        // yi = Mi^-1 mod mi
        var y1 = new mod_inverse_1.ModInverse({ a: M1, n: this.m1 }).moduloInverseByExtendedEuclideanAlgorithm();
        var y2 = new mod_inverse_1.ModInverse({ a: M2, n: this.m2 }).moduloInverseByExtendedEuclideanAlgorithm();
        var y3 = new mod_inverse_1.ModInverse({ a: M3, n: this.m3 }).moduloInverseByExtendedEuclideanAlgorithm();
        var x = (M1 * y1 * this.a1 + M2 * y2 * this.a2 + M3 * y3 * this.a3) % m;
        return x;
    };
    return ModEquation;
}());
exports.ModEquation = ModEquation;

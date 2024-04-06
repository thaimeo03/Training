"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModInverse = void 0;
var gcd_1 = require("../gcd");
var ModInverse = /** @class */ (function () {
    function ModInverse(_a) {
        var a = _a.a, n = _a.n;
        this.a = a;
        this.n = n;
    }
    // Inverse Modulo by definition
    ModInverse.prototype.moduloInverseByDefinition = function () {
        var isValid = this.checkModuloInverse({ isExtendMod: false });
        if (isValid) {
            for (var i = 1; i < this.n; i++) {
                if (i * this.a % this.n === 1) {
                    return i;
                }
            }
        }
        return 'Inverse Modulo does not exist';
    };
    // Inverse Modulo by Extended Euclidean Algorithm
    ModInverse.prototype.moduloInverseByExtendedEuclideanAlgorithm = function () {
        var _a = this.checkModuloInverse({ isExtendMod: true }), d = _a[0], _ = _a[1], y = _a[2];
        if (d === 1) {
            return (y % this.n + this.n) % this.n;
        }
        else {
            return 'Inverse Modulo does not exist';
        }
    };
    // Check inverse modulo exists (GCD)
    ModInverse.prototype.checkModuloInverse = function (_a) {
        var isExtendMod = _a.isExtendMod;
        var gcdCal = new gcd_1.GCDCalculator();
        var res = isExtendMod ? gcdCal.extendGcd(this.a, this.n) : gcdCal.gcd(this.a, this.n);
        return res;
    };
    return ModInverse;
}());
exports.ModInverse = ModInverse;

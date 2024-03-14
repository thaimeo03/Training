"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrimitiveRootMo = void 0;
var downgraded_1 = require("../downgraded");
var euler_1 = require("../euler");
var PrimitiveRootMo = /** @class */ (function () {
    function PrimitiveRootMo(_a) {
        var a = _a.a, n = _a.n;
        this.a = a;
        this.n = n;
    }
    PrimitiveRootMo.prototype.subMultiply = function () {
        var eulerValue = new euler_1.Euler({ n: this.n }).eulerValue();
        var subs = [];
        for (var i = 1; i <= Math.round(eulerValue / 2); i++) {
            if (eulerValue % i === 0) {
                subs.push(i);
            }
        }
        return subs;
    };
    PrimitiveRootMo.prototype.isPrimitiveRoot = function () {
        var subs = this.subMultiply();
        for (var _i = 0, subs_1 = subs; _i < subs_1.length; _i++) {
            var sub = subs_1[_i];
            var modDowngraded = new downgraded_1.ModDownGraded({ a: this.a, m: sub, n: this.n });
            if (modDowngraded.downgraded() === 1) {
                return false;
            }
        }
        return true;
    };
    return PrimitiveRootMo;
}());
exports.PrimitiveRootMo = PrimitiveRootMo;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Euler = void 0;
var gcd_1 = require("../../gcd");
var downgraded_1 = require("../downgraded");
var Euler = /** @class */ (function () {
    function Euler(_a) {
        var a = _a.a, m = _a.m, n = _a.n;
        this.a = a;
        this.m = m;
        this.n = n;
    }
    Euler.prototype.eulerValue = function () {
        var visited = {};
        var temp = this.n;
        for (var i = 2; i <= this.n; i++) {
            while (temp % i === 0) {
                temp = temp / i;
                visited[i] = visited[i] ? visited[i] + 1 : 1;
            }
        }
        var value = 1;
        Object.keys(visited).forEach(function (key) {
            value *= Math.pow(+key, visited[key]) - Math.pow(+key, visited[key] - 1);
        });
        return value;
    };
    Euler.prototype.isActive = function () {
        if (!this.a || !this.m) {
            throw new Error('a and m are required');
        }
        var gcdCal = new gcd_1.GCDCalculator();
        return gcdCal.gcd(this.a, this.n) === 1;
    };
    Euler.prototype.eulerPower = function () {
        if (!this.a || !this.m) {
            throw new Error('a and m are required');
        }
        if (!this.isActive()) {
            throw new Error('Can not calculate power if a and n are not co-prime');
        }
        var eulerValue = this.eulerValue();
        var newPower = this.m % eulerValue;
        var downgraded = new downgraded_1.ModDownGraded({ a: this.a, m: newPower, n: this.n });
        return downgraded.downgraded();
    };
    return Euler;
}());
exports.Euler = Euler;

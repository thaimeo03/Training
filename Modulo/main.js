"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chinese_remainder_theorem_1 = require("./algorithms/chinese-remainder-theorem");
var mod_inverse_1 = require("./algorithms/mod-inverse");
var main = function () {
    // ---------- 2. x = a^-1 (mod n) --------------
    var _a = { a: 1885, n: 6563 }, a = _a.a, n = _a.n;
    var modInverse = new mod_inverse_1.ModInverse({ a: a, n: n });
    // console.log(modInverse.moduloInverseByDefinition());
    console.log("Modulo Inverse by Extended Euclidean Algorithm:", modInverse.moduloInverseByExtendedEuclideanAlgorithm());
    // Chinese Remainder Theorem
    var _b = { m1: 17, m2: 19, m3: 11, a1: 5, a2: 16, a3: 3 }, m1 = _b.m1, m2 = _b.m2, m3 = _b.m3, a1 = _b.a1, a2 = _b.a2, a3 = _b.a3;
    var modEquation = new chinese_remainder_theorem_1.ModEquation({ m1: m1, m2: m2, m3: m3, a1: a1, a2: a2, a3: a3 });
    console.log("Chinese Remainder Theorem:", modEquation.chineseRemainderTheorem());
};
main();

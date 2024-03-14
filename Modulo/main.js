"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
<<<<<<< HEAD
=======
var primitive_root_mo_1 = require("./algorithms/primitive-root-mo");
>>>>>>> a1c347df7f8ca2a1fcca937d187382e0ba554268
var main = function () {
    // ---------- 2. x = a^-1 (mod n) --------------
    // const {a, n} = {a: 1885, n: 6563}
    // const modInverse = new ModInverse({a, n})
    // console.log(modInverse.moduloInverseByDefinition());
    // console.log("Modulo Inverse by Extended Euclidean Algorithm:", modInverse.moduloInverseByExtendedEuclideanAlgorithm());
    // Chinese Remainder Theorem
    // const {m1, m2, m3, a1, a2, a3} = {m1: 23, m2: 37, m3: 71, a1: 4, a2: 16, a3: 1}
    // const modEquation = new ModEquation({m1, m2, m3, a1, a2, a3})
    // console.log("Chinese Remainder Theorem:", modEquation.chineseRemainderTheorem());
    // Downgraded
<<<<<<< HEAD
    // s
=======
    // const {a, m, n} = {a: 227, m: 80, n: 60421}
    // const modDowngraded = new ModDownGraded({a, m, n})
    // console.log("Downgraded:", modDowngraded.downgraded());
    // Euler Value
    // const n = 395
    // const euler = new Euler({n})
    // console.log("Euler value:", euler.eulerValue())
    // Euler Power
    // const {a, m, n} = {a: 23, m: 3885, n: 395}
    // const euler = new Euler({a, m, n})
    // console.log("Euler:", euler.eulerPower());
    // Primitive Root modulo
    var _a = { a: 3, n: 499 }, a = _a.a, n = _a.n;
    var primitiveRoot = new primitive_root_mo_1.PrimitiveRootMo({ a: a, n: n });
    console.log("Is primitive root:", primitiveRoot.isPrimitiveRoot());
>>>>>>> a1c347df7f8ca2a1fcca937d187382e0ba554268
};
main();

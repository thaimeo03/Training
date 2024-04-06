"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var downgraded_1 = require("./downgraded");
var main = function () {
    // Diffie-Hellman
    var _a = { a: 5, q: 6947, xA: 395, xB: 338 }, a = _a.a, q = _a.q, xA = _a.xA, xB = _a.xB;
    var yA = new downgraded_1.ModDownGraded({ a: a, m: xA, n: q }).downgraded();
    var yB = new downgraded_1.ModDownGraded({ a: a, m: xB, n: q }).downgraded();
    var keyA = new downgraded_1.ModDownGraded({ a: yB, m: xA, n: q }).downgraded();
    var keyB = new downgraded_1.ModDownGraded({ a: yA, m: xB, n: q }).downgraded();
    console.log("yA: ".concat(yA));
    console.log("yB: ".concat(yB));
    console.log("keyA: ".concat(keyA));
    console.log("keyB: ".concat(keyB));
    // RSA
    // const {p, q, e} = {p: 43, q: 47, e: 67}
    // const M = 59 // used for cipher
    // const n = p*q;
    // const euler = new Euler({n, a: e})
    // const eulerValue = euler.eulerValue()
    // const modInverse = new ModInverse({a: e, n: eulerValue})
    // const d = modInverse.moduloInverseByExtendedEuclideanAlgorithm()
    // const cipherText = new ModDownGraded({a: M, m: e, n: n}).downgraded()
    // const plainText = new ModDownGraded({a: cipherText, m: d as number, n: n}).downgraded()
    // console.log(`PU ({e, n}): {${e}, ${n}}`)
    // console.log(`PR ({d, n}): {${d}, ${n}}`)
    // console.log(`C: ${cipherText}`);
    // console.log(`M: ${plainText}`);
    // ElGamal
    // const {a, q, xA} = {a: 10, q: 19, xA: 5}
    // const plainText = 17
    // const k=6 // random
    // const yA = new ModDownGraded({a, m: xA, n: q}).downgraded()
    // const K = new ModDownGraded({a: yA, m: k, n: q}).downgraded()
    // const C1 = new ModDownGraded({a, m: k, n: q}).downgraded()
    // const C2 = (K * plainText) % q
    // console.log(`PU ({q, a, yA}): {${q}, ${a}, ${yA}}`)
    // console.log(`PR (C1, C2): (${C1}, ${C2})`);
};
main();

"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyExpansion = void 0;
var constants_1 = require("../../constants");
var constants_2 = require("../../constants");
var utils_1 = require("../../utils");
// AES Key Expansion Function
function keyExpansion(key) {
    var w = [];
    for (var i = 0; i < 4; i++) {
        w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
    }
    (0, utils_1.decorate)(1);
    w.map(function (w, index) {
        var wHex = (0, utils_1.transformNumberArrayToHexString)(w);
        console.log("w".concat(index, ": ").concat(wHex));
        return wHex;
    });
    for (var i = 4; i < 44; i++) {
        var temp = __spreadArray([], w[i - 1], true);
        if (i % 4 === 0) {
            temp = [
                temp[1],
                temp[2],
                temp[3],
                temp[0]
            ];
            if (i === 4) {
                (0, utils_1.decorate)(2);
                console.log("rw (Rot word): " + (0, utils_1.transformNumberArrayToHexString)(temp));
            }
            temp = [
                constants_2.sBox[temp[0] >> 4][temp[0] & 0x0f],
                constants_2.sBox[temp[1] >> 4][temp[1] & 0x0f],
                constants_2.sBox[temp[2] >> 4][temp[2] & 0x0f],
                constants_2.sBox[temp[3] >> 4][temp[3] & 0x0f]
            ];
            if (i === 4) {
                (0, utils_1.decorate)(3);
                console.log("sw (Sub word): " + (0, utils_1.transformNumberArrayToHexString)(temp));
            }
            temp[0] ^= constants_1.rCon[i / 4 - 1];
            if (i === 4) {
                (0, utils_1.decorate)(4);
                console.log("x (Xor): " + (0, utils_1.transformNumberArrayToHexString)(temp));
            }
        }
        w[i] = [
            w[i - 4][0] ^ temp[0],
            w[i - 4][1] ^ temp[1],
            w[i - 4][2] ^ temp[2],
            w[i - 4][3] ^ temp[3]
        ];
    }
    (0, utils_1.decorate)(5);
    w.forEach(function (w, index) {
        if ([4, 5, 6, 7].some(function (i) { return i === index; })) {
            var wHex = (0, utils_1.transformNumberArrayToHexString)(w);
            console.log("w".concat(index, ": ").concat(wHex));
            return wHex;
        }
    });
    // K1 -> K10
    var res = [];
    for (var i = 0; i < 10; i++) {
        res[i] = __spreadArray(__spreadArray(__spreadArray(__spreadArray([], w[i * 4 + 4], true), w[i * 4 + 5], true), w[i * 4 + 6], true), w[i * 4 + 7], true);
    }
    console.log("Keys:");
    var keys = res.map(function (w, index) {
        var wHex = (0, utils_1.transformNumberArrayToHexString)(w);
        console.log("k".concat(index + 1, ": ").concat(wHex));
        return w;
    });
    return keys;
}
exports.keyExpansion = keyExpansion;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorate = exports.transformNumberArrayToHexString = exports.transformHexToHexArray = void 0;
function transformHexToHexArray(hexString) {
    var hexArray = [];
    for (var i = 0; i < hexString.length; i += 2) {
        var hexByte = hexString.slice(i, i + 2);
        hexArray.push(parseInt(hexByte, 16));
    }
    return hexArray;
}
exports.transformHexToHexArray = transformHexToHexArray;
function transformNumberArrayToHexString(arr) {
    return arr.map(function (byte) { return byte.toString(16); }).join(' ');
}
exports.transformNumberArrayToHexString = transformNumberArrayToHexString;
function decorate(number) {
    console.log("\nStage ".concat(number, ".----------------------------------------------------\n"));
}
exports.decorate = decorate;

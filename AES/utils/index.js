"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decorate = exports.prettyPrintBin = exports.transformHexToBinary = exports.transformNumberArrayToHexString = exports.transformHexToHexArray = void 0;
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
// Convert hex string to binary string
function transformHexToBinary(hex) {
    var binary = "";
    for (var i = 0; i < hex.length; i++) {
        var digit = parseInt(hex.charAt(i), 16).toString(2);
        // Đảm bảo mỗi ký tự hex được biểu diễn bằng 4 bits
        while (digit.length < 4) {
            digit = "0" + digit;
        }
        binary += digit;
    }
    return binary;
}
exports.transformHexToBinary = transformHexToBinary;
function prettyPrintBin(bin) {
    var result = "";
    for (var i = 0; i < bin.length; i += 4) {
        result += bin.substring(i, i + 4) + " ";
    }
    return result;
}
exports.prettyPrintBin = prettyPrintBin;
function decorate(number) {
    console.log("\nStage ".concat(number, ".----------------------------------------------------\n"));
}
exports.decorate = decorate;

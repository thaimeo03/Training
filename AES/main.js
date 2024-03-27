"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var encrypt_1 = require("./functions/encrypt");
var expansion_1 = require("./functions/expansion");
var utils_1 = require("./utils");
function main() {
    // Main
    // const firstKey = "6704C20E086B3F537AE5721F486DC559"
    // const firstPlaintext = "4AEB5D62EC3B55DBF5D5A87708E2FF1E"
    var firstKey = "2b7e151628aed2a6abf7158809cf4f3c";
    var firstPlaintext = "3243f6a8885a308d313198a2e0370734";
    var key = (0, utils_1.transformHexToHexArray)(firstKey);
    var plaintext = (0, utils_1.transformHexToHexArray)(firstPlaintext);
    var keysRound = (0, expansion_1.keyExpansion)(key);
    var cipherText = (0, encrypt_1.aesEncrypt)(plaintext, key, keysRound);
    (0, utils_1.decorate)(11);
    console.log("Cipher text: " + (0, utils_1.transformNumberArrayToHexString)(cipherText));
}
main();

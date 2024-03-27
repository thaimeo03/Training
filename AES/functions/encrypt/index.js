"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aesEncrypt = void 0;
var constants_1 = require("../../constants");
var utils_1 = require("../../utils");
// Perform AES encryption
function aesEncrypt(plaintext, key, keysRound) {
    var state = plaintext;
    // console.log(key);
    // Initial round: AddRoundKey
    state = addRoundKey(state, key);
    (0, utils_1.decorate)(6);
    console.log("Add round key: " + (0, utils_1.transformNumberArrayToHexString)(state));
    // Main rounds (9 rounds)
    for (var round = 0; round < 9; round++) {
        state = subBytes(state);
        if (round === 0) {
            (0, utils_1.decorate)(7);
            console.log("SubByte: " + (0, utils_1.transformNumberArrayToHexString)(state));
        }
        state = shiftRows(state);
        if (round === 0) {
            (0, utils_1.decorate)(8);
            console.log("ShiftRows: " + (0, utils_1.transformNumberArrayToHexString)(state));
        }
        state = mixColumns(state);
        if (round === 0) {
            (0, utils_1.decorate)(9);
            console.log("MixColumns: " + (0, utils_1.transformNumberArrayToHexString)(state));
        }
        state = addRoundKey(state, keysRound[round]);
        if (round === 0) {
            (0, utils_1.decorate)(10);
        }
        console.log("State (round ".concat(round + 1, "): ") + (0, utils_1.transformNumberArrayToHexString)(state));
    }
    // // Final round
    state = subBytes(state);
    state = shiftRows(state);
    state = addRoundKey(state, keysRound[9]);
    return state;
}
exports.aesEncrypt = aesEncrypt;
// AddRoundKey operation
function addRoundKey(state, roundKey) {
    var newState = [];
    for (var i = 0; i < state.length; i++) {
        newState.push(state[i] ^ roundKey[i]);
    }
    return newState;
}
// SubBytes operation
function subBytes(state) {
    var newState = [];
    for (var i = 0; i < state.length; i++) {
        var row = state[i] >> 4;
        var column = state[i] & 0x0f;
        newState.push(constants_1.sBox[row][column]);
    }
    return newState;
}
// ShiftRows operation
function shiftRows(state) {
    var newState = [];
    for (var row = 0; row < 4; row++) {
        for (var col = 0; col < 4; col++) {
            newState[row + col * 4] = state[(row + col * 4 + (4 * row)) % 16];
        }
    }
    return newState;
}
// MixColumns operation using matrix multiplication
function mixColumns(state) {
    var matrix = [
        [0x02, 0x03, 0x01, 0x01],
        [0x01, 0x02, 0x03, 0x01],
        [0x01, 0x01, 0x02, 0x03],
        [0x03, 0x01, 0x01, 0x02]
    ];
    var newState = [];
    for (var col = 0; col < 4; col++) {
        for (var row = 0; row < 4; row++) {
            var sum = 0;
            for (var i = 0; i < 4; i++) {
                sum ^= gmul(matrix[row][i], state[col * 4 + i]);
            }
            newState.push(sum);
        }
    }
    return newState;
}
// Helper function for Galois Field multiplication (GF(2^8))
function gmul(a, b) {
    var p = 0;
    for (var i = 0; i < 8; i++) {
        if ((b & 1) !== 0) {
            p ^= a;
        }
        var hiBitSet = (a & 0x80) !== 0;
        a <<= 1;
        if (hiBitSet) {
            a ^= 0x1b; // XOR with irreducible polynomial x^8 + x^4 + x^3 + x + 1
        }
        b >>= 1;
    }
    return p & 0xff; // Keep only 8 bits
}

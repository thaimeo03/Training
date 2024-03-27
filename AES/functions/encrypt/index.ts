import { sBox } from "../../constants";
import { decorate, transformNumberArrayToHexString } from "../../utils";

// Perform AES encryption
export function aesEncrypt(plaintext: number[], key: number[], keysRound: number[][]): number[] {
  let state: number[] = plaintext
  // console.log(key);
  
  // Initial round: AddRoundKey
  state = addRoundKey(state, key);
  decorate(6)
  console.log("Add round key: " + transformNumberArrayToHexString(state));

  // Main rounds (9 rounds)
  for (let round = 0; round < 9; round++) {
      state = subBytes(state);
      if(round === 0) {
        decorate(7)
        console.log("SubByte: " + transformNumberArrayToHexString(state));
      }
      
      state = shiftRows(state);
      if(round === 0) {
        decorate(8)
        console.log("ShiftRows: " + transformNumberArrayToHexString(state));
      }

      state = mixColumns(state);
      if(round === 0) {
        decorate(9)
        console.log("MixColumns: " + transformNumberArrayToHexString(state));
      }

      state = addRoundKey(state, keysRound[round]);
      if(round === 0) {
        decorate(10)
      }
      console.log(`State (round ${round + 1}): ` + transformNumberArrayToHexString(state));
  }

  // // Final round
  state = subBytes(state);
  state = shiftRows(state);
  state = addRoundKey(state, keysRound[9]);

  return state;
}

// AddRoundKey operation
function addRoundKey(state: number[], roundKey: number[]): number[] {
  const newState: number[] = [];
  for (let i = 0; i < state.length; i++) {
      newState.push(state[i] ^ roundKey[i]);
  }
  return newState;
}

// SubBytes operation
function subBytes(state: number[]): number[] {
  const newState: number[] = [];
  for (let i = 0; i < state.length; i++) {
      const row = state[i] >> 4;
      const column = state[i] & 0x0f;
      newState.push(sBox[row][column]);
  }
  return newState;
}

// ShiftRows operation
function shiftRows(state: number[]): number[] {
  const newState: number[] = [];
  for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
          newState[row + col * 4] = state[(row + col * 4 + (4 * row)) % 16];
      }
  }
  return newState;
}

// MixColumns operation using matrix multiplication
function mixColumns(state: number[]): number[] {
  const matrix = [
      [0x02, 0x03, 0x01, 0x01],
      [0x01, 0x02, 0x03, 0x01],
      [0x01, 0x01, 0x02, 0x03],
      [0x03, 0x01, 0x01, 0x02]
  ];
  const newState: number[] = [];
  for (let col = 0; col < 4; col++) {
      for (let row = 0; row < 4; row++) {
          let sum = 0;
          for (let i = 0; i < 4; i++) {
              sum ^= gmul(matrix[row][i], state[col * 4 + i]);
          }
          newState.push(sum);
      }
  }
  return newState;
}

// Helper function for Galois Field multiplication (GF(2^8))
function gmul(a: number, b: number): number {
  let p = 0;
  for (let i = 0; i < 8; i++) {
      if ((b & 1) !== 0) {
          p ^= a;
      }
      const hiBitSet = (a & 0x80) !== 0;
      a <<= 1;
      if (hiBitSet) {
          a ^= 0x1b; // XOR with irreducible polynomial x^8 + x^4 + x^3 + x + 1
      }
      b >>= 1;
  }
  return p & 0xff; // Keep only 8 bits
}
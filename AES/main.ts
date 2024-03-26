// S-box Substitution Table
const sBox: number[][] = [
  [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76],
  [0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0],
  [0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15],
  [0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75],
  [0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84],
  [0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf],
  [0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8],
  [0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2],
  [0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73],
  [0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb],
  [0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79],
  [0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08],
  [0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a],
  [0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e],
  [0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf],
  [0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16]
];

// Round constants
const rCon: number[] = [
  0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36
];

// AES Key Expansion Function
function keyExpansion(key: number[]) {
  const w: number[][] = [];
  
  for (let i = 0; i < 4; i++) {
    w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
  }

  console.log("1.")
  w.map((w, index) => {
    const wHex = transformNumberArrayToHexString(w)
    console.log(`w${index}: ${wHex}`);
    return wHex
  })

  for (let i = 4; i < 44; i++) {
    let temp = [...w[i - 1]];
    
    if (i % 4 === 0) {
      temp = [
        temp[1],
        temp[2],
        temp[3],
        temp[0]
      ]

      if(i === 4) {
        console.log("2.");
        console.log("rw (Rot word): " + transformNumberArrayToHexString(temp));
      }

      temp = [
        sBox[temp[0] >> 4][temp[0] & 0x0f],
        sBox[temp[1] >> 4][temp[1] & 0x0f],
        sBox[temp[2] >> 4][temp[2] & 0x0f],
        sBox[temp[3] >> 4][temp[3] & 0x0f]
    ];

      if(i === 4) {
        console.log("3.");
        console.log("sw (Sub word): " + transformNumberArrayToHexString(temp));
      }

      temp[0] ^= rCon[i / 4 - 1];
      if(i === 4) {
        console.log("4.");
        console.log("x (Xor): " + transformNumberArrayToHexString(temp));
      }
    }

    w[i] = [
      w[i - 4][0] ^ temp[0],
      w[i - 4][1] ^ temp[1],
      w[i - 4][2] ^ temp[2],
      w[i - 4][3] ^ temp[3]
    ];
  }

  console.log("5.");
  w.forEach((w, index) => {
    if([4, 5, 6,7].some(i => i === index)) {
      const wHex = transformNumberArrayToHexString(w)
      console.log(`w${index}: ${wHex}`);
      return wHex
    }
  })

  // K1 -> K10
  const res: number[][] = [];
  for (let i = 0; i < 10; i++) {
    res[i] = [...w[i * 4 + 4], ...w[i * 4 + 5], ...w[i * 4 + 6], ...w[i * 4 + 7]];
  }
  
  console.log("Keys.");
  const keys = res.map((w, index) => {
    const wHex = transformNumberArrayToHexString(w)
    console.log(`k${index + 1}: ${wHex}`);
    return wHex
  })

  return keys;
}

function transformHexToHexArray(hexString: string): number[] {
  const hexArray: number[] = [];
  for (let i = 0; i < hexString.length; i += 2) {
      const hexByte = hexString.slice(i, i + 2);
      hexArray.push(parseInt(hexByte, 16));
  }
  return hexArray;
}

function transformNumberArrayToHexString(arr: number[]): string {
  return arr.map((byte) => byte.toString(16)).join(' ')
}


// Main
const firstKey = "6704C20E086B3F537AE5721F486DC559"
const firstPlaintext = "4AEB5D62EC3B55DBF5D5A87708E2FF1E"
// const firstKey = ""
// const firstPlaintext = ""

const key = transformHexToHexArray(firstKey);
const plaintext = transformHexToHexArray(firstPlaintext)

const keys = keyExpansion(key);
const cipherText = aesEncrypt(plaintext)

console.log("Cipher text: " + transformNumberArrayToHexString(cipherText));


// Perform AES encryption
function aesEncrypt(plaintext: number[]): number[] {
  let state: number[] = plaintext.slice(); // Make a copy of the plaintext

  // Initial round: AddRoundKey
  state = addRoundKey(state, key);

  // Main rounds (9 rounds)
  for (let round = 0; round < 9; round++) {
      state = subBytes(state);
      state = shiftRows(state);
      state = mixColumns(state);
      state = addRoundKey(state, transformHexToHexArray(keys[round]));
  }

  // console.log("State " + state);

  // // Final round
  state = subBytes(state);
  state = shiftRows(state);
  state = addRoundKey(state, transformHexToHexArray(keys[9]));

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
  const newState: number[] = [...state];
  // Row 1: No shift
  // Row 2: Circular shift left by 1 byte
  newState[4] = state[5];
  newState[5] = state[6];
  newState[6] = state[7];
  newState[7] = state[4];
  // Row 3: Circular shift left by 2 bytes
  newState[8] = state[10];
  newState[9] = state[11];
  newState[10] = state[8];
  newState[11] = state[9];
  // Row 4: Circular shift left by 3 bytes
  newState[12] = state[15];
  newState[13] = state[12];
  newState[14] = state[13];
  newState[15] = state[14];
  return newState;
}

// MixColumns operation
function mixColumns(state: number[]): number[] {
  const newState: number[] = [];
  for (let i = 0; i < 4; i++) {
      const col: number[] = [
          state[i],
          state[i + 4],
          state[i + 8],
          state[i + 12]
      ];
      newState.push(
          gmul(0x02, col[0]) ^ gmul(0x03, col[1]) ^ col[2] ^ col[3],
          col[0] ^ gmul(0x02, col[1]) ^ gmul(0x03, col[2]) ^ col[3],
          col[0] ^ col[1] ^ gmul(0x02, col[2]) ^ gmul(0x03, col[3]),
          gmul(0x03, col[0]) ^ col[1] ^ col[2] ^ gmul(0x02, col[3])
      );
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
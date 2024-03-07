// Mã hóa DES
function main() {
  const key = "3ff81cda5f417784";
  const plaintext = "ff1c9ca3596b7d48"
  const binKey = hexToBinary(key);

  console.log("Part 1: ");
  const roundKeys = generateRoundKeys(binKey);
  console.log("Round Keys:");
  roundKeys.forEach((key, index) => console.log(`Round ${index + 1}: ${key} - ${binaryToHex(key)}`));

  console.log("------------------------------------------------------------------------");

  console.log("Part 2: ");
  const binPlaintext = hexToBinary(plaintext);
  const cipherText = desEncrypt(binPlaintext, roundKeys);
  console.log("Cipher Text: " + binaryToHex(cipherText));
}

main()

// Phần 1: Sinh khóa
// Hàm hoán vị PC1
function permutedChoice1(key: string): [string, string] {
  const PC1 = [
      57, 49, 41, 33, 25, 17, 9,
      1, 58, 50, 42, 34, 26, 18,
      10, 2, 59, 51, 43, 35, 27,
      19, 11, 3, 60, 52, 44, 36,
      63, 55, 47, 39, 31, 23, 15,
      7, 62, 54, 46, 38, 30, 22,
      14, 6, 61, 53, 45, 37, 29,
      21, 13, 5, 28, 20, 12, 4
  ];

  let combined = "";

  for (let i = 0; i < PC1.length; i++) {
      combined += key.charAt(PC1[i] - 1);
  }

  const c0 = combined.substring(0, 28);
  const d0 = combined.substring(28);

  console.log(`C0: ${c0}, D0: ${d0}`);

  return [c0, d0];
}

// Hàm dịch vòng
function circularShift(c: string, d: string, n: number): [string, string] {
  const shiftedC = c.substring(n) + c.substring(0, n);
  const shiftedD = d.substring(n) + d.substring(0, n);
  return [shiftedC, shiftedD];
}

// Hàm hoán vị PC2
function permutedChoice2(c: string, d: string): string {
  const PC2 = [
      14, 17, 11, 24, 1, 5,
      3, 28, 15, 6, 21, 10,
      23, 19, 12, 4, 26, 8,
      16, 7, 27, 20, 13, 2,
      41, 52, 31, 37, 47, 55,
      30, 40, 51, 45, 33, 48,
      44, 49, 39, 56, 34, 53,
      46, 42, 50, 36, 29, 32
  ];

  let combined = c + d;
  let ki = "";

  for (let i = 0; i < PC2.length; i++) {
      ki += combined.charAt(PC2[i] - 1);
  }

  return ki;
}

// Hàm chính sinh khóa Ki từ khóa K
function generateRoundKeys(key: string): string[] {
  const roundKeys: string[] = [];
  const shifts = [1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1];

  // Giai đoạn 1
  console.log("Phase 1");
  const [c0, d0] = permutedChoice1(key);
  // roundKeys.push(c0 + d0);

  // Giai đoạn 2
  console.log("Phase 2");
  let [ci, di] = [c0, d0];
  for (let i = 0; i < shifts.length; i++) {
    const [newCi, newDi] = circularShift(ci, di, shifts[i]);
    ci = newCi;
    di = newDi;
    console.log(`C${i+1}: ${ci}, D${i+1}: ${di}`);
    roundKeys.push(permutedChoice2(ci, di));
  }

  return roundKeys;
}

// Hàm chuyển đổi hex sang binary
function hexToBinary(hex: string): string {
  let binary = "";
  for (let i = 0; i < hex.length; i++) {
      let digit = parseInt(hex.charAt(i), 16).toString(2);
      // Đảm bảo mỗi ký tự hex được biểu diễn bằng 4 bits
      while (digit.length < 4) {
          digit = "0" + digit;
      }
      binary += digit;
  }
  return binary;
}

// Hàm chuyển đổi binary sang hex
function binaryToHex(binary: string): string {
  let hex = "";
  // Đảm bảo độ dài của chuỗi binary chia hết cho 4
  while (binary.length % 4 !== 0) {
      binary = "0" + binary;
  }
  // Chuyển đổi từng nhóm 4 bits thành một ký tự hex tương ứng
  for (let i = 0; i < binary.length; i += 4) {
      const chunk = binary.substr(i, 4);
      const hexDigit = parseInt(chunk, 2).toString(16);
      hex += hexDigit;
  }
  return hex.toUpperCase(); // Trả về dạng hex viết hoa
}

// Phần 2: Mã hóa
// Hàm hoán vị Initial Permutation (IP)
function initialPermutation(plaintext: string): [string, string] {
  const IP = [
      58, 50, 42, 34, 26, 18, 10, 2,
      60, 52, 44, 36, 28, 20, 12, 4,
      62, 54, 46, 38, 30, 22, 14, 6,
      64, 56, 48, 40, 32, 24, 16, 8,
      57, 49, 41, 33, 25, 17, 9, 1,
      59, 51, 43, 35, 27, 19, 11, 3,
      61, 53, 45, 37, 29, 21, 13, 5,
      63, 55, 47, 39, 31, 23, 15, 7
  ];

  let combined = "";

  for (let i = 0; i < IP.length; i++) {
      combined += plaintext.charAt(IP[i] - 1);
  }
  
  const L0 = combined.substring(0, 32);
  const R0 = combined.substring(32);

  console.log(`L0: ${L0}, R0: ${R0}`);
  
  return [L0, R0];
}

// Hàm hoán vị Expansion Permutation (E)
function expansionPermutation(right: string): string {
  const E = [
      32, 1, 2, 3, 4, 5,
      4, 5, 6, 7, 8, 9,
      8, 9, 10, 11, 12, 13,
      12, 13, 14, 15, 16, 17,
      16, 17, 18, 19, 20, 21,
      20, 21, 22, 23, 24, 25,
      24, 25, 26, 27, 28, 29,
      28, 29, 30, 31, 32, 1
  ];

  let expanded = "";

  for (let i = 0; i < E.length; i++) {
      expanded += right.charAt(E[i] - 1);
  }

  return expanded;
}

// Hàm thực hiện XOR
function xor(a: string, b: string): string {
  let result = "";
  for (let i = 0; i < a.length; i++) {
      result += a.charAt(i) === b.charAt(i) ? "0" : "1";
  }
  return result;
}

// Hàm thực hiện phép thế S-box
function sBoxSubstitution(input: string): string {
  const sBoxes: number[][][] = [
    // S1
    [
      [14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
      [0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
      [4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
      [15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]
    ],
    // S2
    [
      [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
      [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
      [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
      [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9]
    ],
    // S3
    [
      [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
      [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
      [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
      [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12]
    ],
    // S4
    [
      [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
      [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
      [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
      [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14]
    ],
    // S5
    [
      [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
      [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
      [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
      [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3]
    ],
    // S6
    [
      [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
      [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
      [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
      [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13]
    ],
    // S7
    [
      [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
      [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
      [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
      [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12]
    ],
    // S8
    [
      [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
      [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
      [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
      [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11]
    ]
];


  let output = "";

  for (let i = 0; i < 8; i++) {
      const row = parseInt(input.charAt(i * 6) + input.charAt(i * 6 + 5), 2);
      const col = parseInt(input.substring(i * 6 + 1, i * 6 + 5), 2);
      const value = sBoxes[i][row][col];
      // console.log(value);
       
      output += hexToBinary(`${value.toString(16)}`);
  }

  // console.log(output)

  return output;
}

// Hàm hoán vị hoán vị P
function permutation(input: string): string {
  const P = [
      16, 7, 20, 21, 29, 12, 28, 17,
      1, 15, 23, 26, 5, 18, 31, 10,
      2, 8, 24, 14, 32, 27, 3, 9,
      19, 13, 30, 6, 22, 11, 4, 25
  ];

  let permuted = "";

  for (let i = 0; i < P.length; i++) {
      permuted += input.charAt(P[i] - 1);
  }

  return permuted;
}

// Hàm hoán vị Inverse Initial Permutation (IP^-1)
function inverseInitialPermutation(swapped: string): string {
  const IP_inverse = [
      40, 8, 48, 16, 56, 24, 64, 32,
      39, 7, 47, 15, 55, 23, 63, 31,
      38, 6, 46, 14, 54, 22, 62, 30,
      37, 5, 45, 13, 53, 21, 61, 29,
      36, 4, 44, 12, 52, 20, 60, 28,
      35, 3, 43, 11, 51, 19, 59, 27,
      34, 2, 42, 10, 50, 18, 58, 26,
      33, 1, 41, 9, 49, 17, 57, 25
  ];

  let ciphertext = "";

  for (let i = 0; i < IP_inverse.length; i++) {
      ciphertext += swapped.charAt(IP_inverse[i] - 1);
  }

  return ciphertext;
}

// Hàm thực hiện một vòng lặp DES
function desRound(Li: string, Ri: string, roundKey: string, index?: number): [string, string] {
  const expandedR = expansionPermutation(Ri);
  const xorResult = xor(expandedR, roundKey);
  const substituted = sBoxSubstitution(xorResult);
  const permuted = permutation(substituted);
  const newR = xor(Li, permuted);

  if (index !== undefined && index === 0) {
    console.log(`ER0: ${expandedR} - ${binaryToHex(expandedR)}`);
    console.log(`XOR (A): ${xorResult} - ${binaryToHex(xorResult)}`);
    console.log(`S-Box: ${substituted}`);
    console.log(`Permuted (F): ${permuted}`);
    console.log(`R${index + 1}: ${newR} - ${binaryToHex(newR)}`);
  }
  
  return [Ri, newR];
}

// Hàm mã hóa DES
function desEncrypt(plaintext: string, roundKeys: string[]): string {
  let [L, R] = initialPermutation(plaintext);

  for (let i = 0; i < roundKeys.length; i++) {
      [L, R] = desRound(L, R, roundKeys[i], i);
  }

  console.log(`L16: ${L} - ${binaryToHex(L)}, R16: ${R} - ${binaryToHex(R)}`);
  // Swap L and R after the final round
  [L, R] = [R, L];
  
  // Final permutation
  const cipherText = inverseInitialPermutation(L + R);

  return cipherText;
}
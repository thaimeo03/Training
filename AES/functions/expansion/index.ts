import { rCon } from "../../constants";
import { sBox } from "../../constants";
import { decorate, transformNumberArrayToHexString } from "../../utils";

// AES Key Expansion Function
export function keyExpansion(key: number[]) {
  const w: number[][] = [];
  
  for (let i = 0; i < 4; i++) {
    w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
  }

  decorate(1)
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
        decorate(2)
        console.log("rw (Rot word): " + transformNumberArrayToHexString(temp));
      }

      temp = [
        sBox[temp[0] >> 4][temp[0] & 0x0f],
        sBox[temp[1] >> 4][temp[1] & 0x0f],
        sBox[temp[2] >> 4][temp[2] & 0x0f],
        sBox[temp[3] >> 4][temp[3] & 0x0f]
    ];

      if(i === 4) {
        decorate(3)
        console.log("sw (Sub word): " + transformNumberArrayToHexString(temp));
      }

      temp[0] ^= rCon[i / 4 - 1];
      if(i === 4) {
        decorate(4)
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

  decorate(5)
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
  
  console.log("Keys:");
  const keys = res.map((w, index) => {
    const wHex = transformNumberArrayToHexString(w)
    console.log(`k${index + 1}: ${wHex}`);
    return w
  })

  return keys;
}
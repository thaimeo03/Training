export function transformHexToHexArray(hexString: string): number[] {
  const hexArray: number[] = [];
  for (let i = 0; i < hexString.length; i += 2) {
      const hexByte = hexString.slice(i, i + 2);
      hexArray.push(parseInt(hexByte, 16));
  }
  return hexArray;
}


export function transformNumberArrayToHexString(arr: number[]): string {
  return arr.map((byte) => byte.toString(16)).join(' ')
}

// Convert hex string to binary string
export function transformHexToBinary(hex: string): string {
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

export function prettyPrintBin (bin: string) {
  let result = "";
  for (let i = 0; i < bin.length; i += 4) {
    result += bin.substring(i, i + 4) + " ";
  }
  return result;
}

export function decorate(number) {
  console.log(`\nStage ${number}.----------------------------------------------------\n`);
}
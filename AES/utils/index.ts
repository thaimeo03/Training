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

export function decorate(number) {
  console.log(`\nStage ${number}.----------------------------------------------------\n`);
}
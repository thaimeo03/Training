import { aesEncrypt } from "./functions/encrypt";
import { keyExpansion } from "./functions/expansion";
import { decorate, transformHexToHexArray, transformNumberArrayToHexString } from "./utils";

function main() {
  // Main
  // const firstKey = "6704C20E086B3F537AE5721F486DC559"
  // const firstPlaintext = "4AEB5D62EC3B55DBF5D5A87708E2FF1E"
  const firstKey = "2b7e151628aed2a6abf7158809cf4f3c"
  const firstPlaintext = "3243f6a8885a308d313198a2e0370734"

  const key = transformHexToHexArray(firstKey);
  const plaintext = transformHexToHexArray(firstPlaintext)

  const keysRound = keyExpansion(key);
  const cipherText = aesEncrypt(plaintext, key, keysRound)

  decorate(11)
  console.log("Cipher text: " + transformNumberArrayToHexString(cipherText));
}

main()
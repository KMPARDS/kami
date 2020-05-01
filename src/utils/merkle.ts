import { ethers } from 'ethers';
const {
  utils: { arrayify, keccak256, concat },
} = ethers;

export function computeMerkleRoot(inputArray: Uint8Array[]): Uint8Array {
  if (inputArray.length === 1) return inputArray[0];

  if (
    inputArray.length &&
    (inputArray.length & (inputArray.length - 1)) !== 0
  ) {
    throw new Error('inputArray should be of length of power 2');
  }

  const reducedArray: Uint8Array[] = [];

  for (let i = 0; i < inputArray.length; i += 2) {
    reducedArray.push(
      arrayify(keccak256(concat([inputArray[i], inputArray[i + 1]])))
    );
  }

  return computeMerkleRoot(reducedArray);
}

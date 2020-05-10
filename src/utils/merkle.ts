import { ethers } from 'ethers';
import { Bytes, Bytes32 } from './bytes';
const {
  utils: { arrayify, keccak256, concat },
} = ethers;

export function computeMerkleRoot(inputArray: Bytes[]): Bytes32 {
  if (inputArray.length === 1) return inputArray[0];

  if (
    inputArray.length &&
    (inputArray.length & (inputArray.length - 1)) !== 0
  ) {
    throw new Error('inputArray should be of length of power 2');
  }

  const reducedArray: Bytes32[] = [];

  for (let i = 0; i < inputArray.length; i += 2) {
    reducedArray.push(
      new Bytes32(
        arrayify(
          keccak256(concat([inputArray[i].data, inputArray[i + 1].data]))
        )
      )
    );
  }

  return computeMerkleRoot(reducedArray);
}

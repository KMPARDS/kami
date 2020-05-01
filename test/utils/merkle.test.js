const assert = require('assert');
const {
  utils: { arrayify, keccak256, concat },
} = require('ethers');
const { computeMerkleRoot } = require('../../build/utils/merkle');

describe('Merkle Root', () => {
  it('merkle root of single element', () => {
    // https://github.com/ethereum/eth2.0-specs/issues/859
    const chunk = new Uint8Array([1, 2, 3]);
    const merkle = computeMerkleRoot([chunk]);

    assert.deepEqual(
      merkle,
      chunk,
      'merkle root of single chunk should be the chunk itself'
    );
  });

  it('merkle root of two elements', () => {
    const chunk1 = new Uint8Array([1, 2, 3]);
    const chunk2 = new Uint8Array([5, 6, 7]);

    const merkle = computeMerkleRoot([chunk1, chunk2]);

    const manualMerkle = arrayify(keccak256(concat([chunk1, chunk2])));

    assert.deepEqual(merkle, manualMerkle, 'merkle roots should match');
  });

  it('merkle of non two power length elements should give error', () => {
    try {
      const chunk = new Uint8Array([1, 2, 3]);
      computeMerkleRoot([chunk, chunk, chunk]);
    } catch (error) {
      assert(true);
      return;
    }
    assert(false, 'should give error');
  });
});

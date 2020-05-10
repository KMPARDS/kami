const assert = require('assert');
const {
  utils: { arrayify, keccak256, concat },
} = require('ethers');
const { computeMerkleRoot } = require('../../build/utils/merkle');
const { Bytes } = require('../../build/utils/bytes');
const { t, validate } = require('../../build/type-validation');

describe('Merkle Root', () => {
  it('merkle root of single element', () => {
    // https://github.com/ethereum/eth2.0-specs/issues/859
    const chunk = new Bytes('0x1234');
    const merkle = computeMerkleRoot([chunk]);

    assert.equal(
      merkle.hex(),
      chunk.hex(),
      'merkle root of single chunk should be the chunk itself'
    );
  });

  it('merkle root of two elements', () => {
    const chunk1 = new Bytes('0x1234');
    const chunk2 = new Bytes('0x5678');

    const merkle = computeMerkleRoot([chunk1, chunk2]);

    const manualMerkle = new Bytes(
      arrayify(keccak256(concat([chunk1.data, chunk2.data])))
    );

    assert.equal(merkle.hex(), manualMerkle.hex(), 'merkle roots should match');
  });

  it('merkle of non two power length elements should give error', () => {
    try {
      const chunk = new Bytes('0x1234');
      computeMerkleRoot([chunk, chunk, chunk]);
    } catch (error) {
      assert(true);
      return;
    }
    assert(false, 'should give error');
  });
});

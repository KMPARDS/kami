import assert from 'assert';
import { ethers } from 'ethers';
import { computeMerkleRoot } from '../../src/utils/merkle';
import { Bytes } from '../../src/utils/bytes';
import { t, validate } from '../../src/type-validation';

const {
  utils: { arrayify, keccak256, concat },
} = ethers;

export const MerkleRoot = () =>
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

      assert.equal(
        merkle.hex(),
        manualMerkle.hex(),
        'merkle roots should match'
      );
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

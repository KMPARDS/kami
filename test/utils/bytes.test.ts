import assert from 'assert';
import { ethers } from 'ethers';
import { Bytes } from '../../src/utils/bytes';

export const BytesCheck = () =>
  describe('Bytes Check', () => {
    it('initiates a bytes object with number', () => {
      const b = new Bytes(10);

      assert.strictEqual(b.length, 1, 'length should proper');
      assert.strictEqual(b.hex(), '0x0a', 'hex should be proper');
    });

    it('initiates a bytes object with number and length', () => {
      const b = new Bytes(10, 4);

      assert.strictEqual(b.length, 4, 'length should proper');
      assert.strictEqual(b.hex(), '0x0000000a', 'hex should be proper');
    });
  });

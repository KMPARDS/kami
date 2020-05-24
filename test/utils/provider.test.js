const assert = require('assert');
const ethers = require('ethers');
const { Bytes } = require('../../build/utils/bytes');
const { t, validate } = require('../../build/type-validation');

const { kami1, getProvider } = require('../test-configs');
let providerESN = getProvider(kami1.ESN_URL);

const { fetchBlocks } = require('../../build/utils/provider');

describe('Provider methods', async () => {
  describe('Call getblocks method', () => {
    it('get blocks should return blocks', async () => {
      const blocks = await fetchBlocks(0, 1, providerESN);
      assert.equal(blocks.length, 2);
      blocks.forEach((block) => {
        validate(block.blockNumber, t.number);
        validate(block.transactionsRoot, t.byted);
        validate(block.receiptsRoot, t.byted);
      });
    });

    it('get blocks with invalid arguments should give error', async () => {
      try {
        await fetchBlocks(0, '1', providerESN);
        assert.ok(false, 'should give error');
      } catch (error) {
        assert.ok(
          error.message.includes(
            " of type 'string' is an invalid value for expected type 'uint'"
          ),
          'should give invalid input type error'
        );
      }
    });
  });
});

const assert = require('assert');
const ethers = require('ethers');
const { Bytes } = require('../../build/utils/bytes');
const { t, validate } = require('../../build/type-validation');

const { kami1, getProvider } = require('../test-configs');
let providerESN = getProvider(kami1.ESN_URL);

const { fetchBlocks } = require('../../build/utils/provider');

describe('Provider methods', async () => {
  describe('get blocks method', () => {
    it('get blocks', async () => {
      const blocks = await fetchBlocks(0, 1, providerESN);
      assert.equal(blocks.length, 2);
      blocks.forEach((block) => {
        validate(block.blockNumber, t.number);
        validate(block.transactionsRoot, t.byted);
        validate(block.receiptsRoot, t.byted);
      });
    });
  });
});

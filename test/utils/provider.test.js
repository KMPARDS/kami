const assert = require('assert');
const ethers = require('ethers');

const providerESN = new ethers.providers.JsonRpcProvider(
  'http://localhost:8545'
);

const { fetchBlocks } = require('../../build/utils/provider');

describe('Provider methods', async () => {
  it('get blocks', async () => {
    const blocks = await fetchBlocks(0, 1, providerESN);
    assert.equal(blocks.length, 2);
    blocks.forEach((block) => {
      assert.equal(
        typeof block.blockNumber,
        'number',
        'blockNumber should be a number'
      );
      assert.ok(
        block.transactionsRoot instanceof Uint8Array,
        'transactionsRoot should be Uint8Array'
      );
      assert.ok(
        block.receiptsRoot instanceof Uint8Array,
        'receiptsRoot should be Uint8Array'
      );
    });
  });
});

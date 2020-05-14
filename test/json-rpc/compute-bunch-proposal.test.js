const assert = require('assert');
const ethers = require('ethers');
const { t, validate } = require('../../build/type-validation');
const { fetchBlocks } = require('../../build/utils/provider');
const { validateBunchProposal } = require('../../build/utils/bunch-proposal');

const { kami1, getProvider } = require('../test-configs');
const KAMI_URL = `http://localhost:${kami1.JSON_RPC_PORT}/json-rpc`;
const providerESN = getProvider(kami1.ESN_URL);

describe('Bunch Proposal RPC', () => {
  it('call compute bunch proposal RPC', async () => {
    const response = await ethers.utils.fetchJson(
      KAMI_URL,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'kami_computeBunchProposal',
        params: [0, 2],
        id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      })
    );

    const bunchProposal = response.result;
    validateBunchProposal(bunchProposal, false);
  });

  it('call compute bunch proposal RPC with 0 bunch depth', async () => {
    const response = await ethers.utils.fetchJson(
      KAMI_URL,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'kami_computeBunchProposal',
        params: [1, 0],
        id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      })
    );

    const bunchProposal = response.result;
    validateBunchProposal(bunchProposal, false);

    const blocks = await fetchBlocks(1, 0, providerESN);

    assert.strictEqual(
      blocks[0].transactionsRoot.hex(),
      bunchProposal.transactionsMegaRoot,
      'transactionsMegaRoot should be transactionsRoot for bunch depth 0'
    );

    assert.strictEqual(
      blocks[0].receiptsRoot.hex(),
      bunchProposal.receiptsMegaRoot,
      'receiptsMegaRoot should be receiptsRoot for bunch depth 0'
    );
  });
});

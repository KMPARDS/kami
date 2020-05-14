const ethers = require('ethers');
const { t, validate } = require('../../build/type-validation');

const { kami1 } = require('../test-configs');
const KAMI_URL = `http://localhost:${kami1.JSON_RPC_PORT}/json-rpc`;

function validateBunchProposal(bunchProposal) {
  validate(bunchProposal, t.object);
  validate(bunchProposal.startBlockNumber, t.number);
  validate(bunchProposal.bunchDepth, t.number);
  validate(bunchProposal.transactionsMegaRoot, t.hex);
  validate(bunchProposal.receiptsMegaRoot, t.hex);
}

describe('Bunch Root RPC', () => {
  it('call compute bunch root RPC', async () => {
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
    validateBunchProposal(bunchProposal);
  });
});

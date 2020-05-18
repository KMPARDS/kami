const ethers = require('ethers');
const { validateBunchProposal } = require('../../build/utils/bunch-proposal');

const { kami1, kami2 } = require('../test-configs');
const KAMI_1_URL = `http://localhost:${kami1.JSON_RPC_PORT}/`;
const KAMI_2_URL = `http://localhost:${kami2.JSON_RPC_PORT}/`;

describe('Sign Bunch RPC', () => {
  it('compute a bunch root RPC and request signature', async () => {
    const response = await ethers.utils.fetchJson(
      KAMI_1_URL,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'informer_computeBunchProposal',
        params: [0, 2],
        id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      })
    );

    const bunchProposal = response.result;
    // console.log(response);
    validateBunchProposal(bunchProposal, false);

    const response2 = await ethers.utils.fetchJson(
      KAMI_1_URL,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'informer_signBunch',
        params: [bunchProposal],
        id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      })
    );

    const bunchProposal2 = response2.result;
    console.log(response2);
    validateBunchProposal(bunchProposal2, true);
  });
});

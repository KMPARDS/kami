const ethers = require('ethers');

const URL = 'http://localhost:15985/json-rpc';

describe('Bunch Root RPC', () => {
  it('call compute bunch root RPC', async () => {
    const response = await ethers.utils.fetchJson(
      URL,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'kami_computeBunchProposal',
        params: [0, 2.33333],
        id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      })
    );

    console.log(response);
  });
});

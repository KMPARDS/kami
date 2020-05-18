const ethers = require('ethers');
const { kami1, consoleLog } = require('../test-configs');
const KAMI_1_URL = `http://localhost:${kami1.JSON_RPC_PORT}/`;

describe('Peers', () => {
  it('should list some peers', async () => {
    const response = await ethers.utils.fetchJson(
      KAMI_1_URL,
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'kami_listPeers',
        params: [],
        id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      })
    );

    consoleLog({ response });
  });
});

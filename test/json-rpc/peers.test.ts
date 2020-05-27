import assert from 'assert';
import { ethers } from 'ethers';
import { Peer } from '../../src/peers';
const { kami1, kami2, kami3 } = require('../test-configs');
const KAMI_1_URL = `http://localhost:${kami1.config.JSON_RPC_PORT}/`;
const KAMI_3_URL = `http://localhost:${kami3.config.JSON_RPC_PORT}/`;

const kamiWalletAddresses = [
  kami1.keystore.address,
  kami2.keystore.address,
  kami3.keystore.address,
];

export const Peers = () =>
  describe('Peers', () => {
    it('should list some peers and recognize them', async () => {
      const response = await ethers.utils.fetchJson(
        KAMI_1_URL,
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'kami_listPeers',
          params: [],
          id: null,
        })
      );

      // console.log(response.result);

      const nullPeers = response.result.filter(
        (peer: Peer) => peer.walletAddress === null
      );

      assert.strictEqual(
        nullPeers.length,
        0,
        "there shouldn't be any null peers"
      );

      response.result
        .filter((peer: Peer) => peer.walletAddress !== null)
        .forEach((peer: Peer) => {
          if (!peer.walletAddress) {
            throw new Error(
              `Wallet address is not defined for peer ${peer.connectionUrl}`
            );
          }
          // console.log(kamiWalletAddresses, peer.walletAddress);

          // IMP Note: if you get this assert fail, probably the node is not restarted
          //  (a random peer gets added when doing the handshake test, and it's retained if node is not restarted)
          //  so to get the tests pass again, simply restart all the associated nodes and re-run the tests
          assert.ok(
            kamiWalletAddresses.includes(peer.walletAddress.slice(2)),
            'peer is not recognized correctly properly'
          );
        });
    });
  });

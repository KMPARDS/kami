import { ethers } from 'ethers';
import { validateBunchProposal } from '../../src/utils/bunch-proposal';

const { kami1, kami2 } = require('../test-configs');
const KAMI_1_URL = `http://localhost:${kami1.config.JSON_RPC_PORT}/`;
const KAMI_2_URL = `http://localhost:${kami2.config.JSON_RPC_PORT}/`;

export const SignBunchRPC = () =>
  describe('Sign Bunch RPC', () => {
    it('compute a bunch root RPC and request signature', async () => {
      const response = await ethers.utils.fetchJson(
        KAMI_1_URL,
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'informer_computeBunchProposal',
          params: [0, 2],
          id: null,
        })
      );

      const bunchProposal = response.result;
      validateBunchProposal(bunchProposal, false);

      const response2 = await ethers.utils.fetchJson(
        KAMI_1_URL,
        JSON.stringify({
          jsonrpc: '2.0',
          method: 'informer_signBunch',
          params: [bunchProposal],
          id: null,
        })
      );

      const bunchProposal2 = response2.result;
      validateBunchProposal(bunchProposal2, true);
    });
  });

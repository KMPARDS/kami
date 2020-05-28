import assert from 'assert';
import { ethers } from 'ethers';
import { kami1 } from '../test-configs';
import { hexlifyObject } from '../../src/json-rpc/parser';
import { Bytes } from '../../src/utils/bytes';
const KAMI_URL = `http://localhost:${kami1.config.JSON_RPC_PORT}/`;

export const SubmitBunch = () =>
  describe('Submit Bunch', () => {
    it('call informer_initiateBunch should compute bunch, collect signatures and post to ETH contract', async () => {
      const response = await ethers.utils.fetchJson(
        KAMI_URL,
        JSON.stringify(
          hexlifyObject({
            jsonrpc: '2.0',
            method: 'informer_initiateBunch',
            params: [0, 2],
            id: null,
          })
        )
      );

      console.log(response);
    });
  });

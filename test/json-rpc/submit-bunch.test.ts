import assert from 'assert';
import { ethers } from 'ethers';
import { kami1 } from '../test-configs';
import { hexlifyObject } from '../../src/json-rpc/parser';
import { Bytes } from '../../src/utils/bytes';
import { validate, t } from '../../src/type-validation';
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

      // console.log(response);

      validate(response.result, t.hex32);

      const tx = await global.providerETH.getTransaction(response.result);

      assert.ok(tx, 'transaction should exist');

      assert.strictEqual(
        tx.data.slice(0, 10),
        ethers.utils
          .id(
            'submitBunchHeader(uint256,uint256,bytes32,bytes32,bytes32,bytes[])'
          )
          .slice(0, 10),
        'function signature in the transaction should be of submitBunchHeader'
      );

      const receipt = await tx.wait();

      assert.ok(receipt.status, 'transaction should be successful');
      assert.ok(receipt.logs.length >= 1, 'logs should be there');

      assert.strictEqual(
        receipt.logs[0].topics[0],
        ethers.utils.id('NewBunchHeader(uint256,uint256,uint256)'),
        'NewBunchHeader event should be the first event emitted'
      );
    });
  });

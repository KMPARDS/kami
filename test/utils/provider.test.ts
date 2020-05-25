import assert from 'assert';
import { ethers } from 'ethers';
import { Bytes } from '../../src/utils/bytes';
import { t, validate } from '../../src/type-validation';
import { fetchBlocks } from '../../src/utils/provider';

import { kami1, getProvider } from '../test-configs';
let providerESN = getProvider(kami1.config.ESN_URL);

export const ProviderMethods = () =>
  describe('Provider methods', async () => {
    describe('Call getblocks method', () => {
      it('get blocks should return blocks', async () => {
        const blocks = await fetchBlocks(0, 1, providerESN);
        assert.equal(blocks.length, 2);
        blocks.forEach((block) => {
          validate(block.blockNumber, t.number);
          validate(block.transactionsRoot, t.byted);
          validate(block.receiptsRoot, t.byted);
        });
      });

      it('get blocks with invalid arguments should give error', async () => {
        try {
          // @ts-expect-error
          await fetchBlocks(0, '1', providerESN);
          assert.ok(false, 'should give error');
        } catch (error) {
          assert.ok(
            error.message.includes(
              " of type 'string' is an invalid value for expected type 'uint'"
            ),
            'should give invalid input type error'
          );
        }
      });
    });
  });

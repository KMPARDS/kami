import assert from 'assert';
import { ethers } from 'ethers';
import { kami1 } from '../test-configs';
import { hexlifyObject } from '../../src/json-rpc/parser';
import { validate, t } from '../../src/type-validation';
import { BlockCompact } from '../../src/utils/provider';

const KAMI_URL = `http://localhost:${kami1.config.JSON_RPC_PORT}/`;

export const BlockProposal = () =>
  describe('Block Proposal', () => {
    let blockProposal: BlockCompact;
    it('call informer_viewBlockProposal should return a block proposal', async () => {
      const response = await ethers.utils.fetchJson(
        KAMI_URL,
        JSON.stringify(
          hexlifyObject({
            jsonrpc: '2.0',
            method: 'informer_viewBlockProposal',
            params: [0],
            id: null,
          })
        )
      );

      validate(response.result.blockNumber, t.number);
      validate(response.result.transactionsRoot, t.hex32);
      validate(response.result.receiptsRoot, t.hex32);

      blockProposal = {
        blockNumber: response.result.blockNumber,
        transactionsRoot: response.result.transactionsRoot,
        receiptsRoot: response.result.receiptsRoot,
        blockHash: response.result.blockHash,
      };
    });

    it('call informer_sendBlockProposal should return a transaction hash', async () => {
      const responseAddr = await ethers.utils.fetchJson(
        KAMI_URL,
        JSON.stringify(
          hexlifyObject({
            jsonrpc: '2.0',
            method: 'kami_getAddress',
            params: [],
            id: null,
          })
        )
      );

      const address = responseAddr.result;

      const countBefore = await global.reversePlasmaInstanceESN.getProposalsCount(
        blockProposal.blockNumber
      );

      const response = await ethers.utils.fetchJson(
        KAMI_URL,
        JSON.stringify(
          hexlifyObject({
            jsonrpc: '2.0',
            method: 'informer_sendBlockProposal',
            params: [
              blockProposal.blockNumber,
              blockProposal.transactionsRoot,
              blockProposal.receiptsRoot,
            ],
            id: null,
          })
        )
      );

      validate(response.result, t.hex32);

      const countAfter = await global.reversePlasmaInstanceESN.getProposalsCount(
        blockProposal.blockNumber
      );

      assert.ok(
        countAfter.sub(countBefore).eq(1),
        'proposal count is not increased by 1'
      );
    });
  });

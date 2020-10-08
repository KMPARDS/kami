import { computeMerkleRoot } from '../../../utils/merkle';
import { fetchBlocks } from '../../../utils/provider';
import { t, validateParam } from '../../../type-validation';
import { Bytes32 } from '../../../utils/bytes';
import { BunchProposal } from '../../../utils/bunch-proposal';
import { hexlify, keccak256, concat } from 'ethers/lib/utils';
import { writeJson } from 'fs-extra';

export async function computeBunchProposal(
  startBlockNumber: number,
  bunchDepth: number
): Promise<BunchProposal> {
  validateParam({ startBlockNumber }, t.uint);
  validateParam({ bunchDepth }, t.uint);

  try {
    const bunchstore: {
      [startBlockNumber: string]: {
        [bunchDepth: string]: BunchProposal;
      };
    } = require(process.cwd() + '/kami-bunch-store.json');

    const output = bunchstore[String(startBlockNumber)][String(bunchDepth)];

    if (output) {
      return output;
    }
  } catch (error) {}

  if (bunchDepth >= 10) {
    const left = await computeBunchProposal(startBlockNumber, bunchDepth - 1);
    const right = await computeBunchProposal(
      startBlockNumber + 2 ** (bunchDepth - 1) - 1,
      bunchDepth - 1
    );
    const lastBlock = await global.providerEsn.getBlock(
      startBlockNumber + 2 ** bunchDepth - 1
    );
    const output = {
      startBlockNumber,
      bunchDepth,
      transactionsMegaRoot: hexlify(
        keccak256(
          concat([left.transactionsMegaRoot, right.transactionsMegaRoot])
        )
      ),
      receiptsMegaRoot: hexlify(
        keccak256(concat([left.receiptsMegaRoot, right.receiptsMegaRoot]))
      ),
      lastBlockHash: lastBlock.hash,
      signatures: [],
    };
    _addBunchToStore(output);
    return output;
  }

  const blocks = await fetchBlocks(
    startBlockNumber,
    bunchDepth,
    global.providerEsn
  );
  const output = {
    startBlockNumber,
    bunchDepth,
    transactionsMegaRoot: computeMerkleRoot(
      blocks.map((block) => block.transactionsRoot)
    ).hex(),
    receiptsMegaRoot: computeMerkleRoot(
      blocks.map((block) => block.receiptsRoot)
    ).hex(),
    lastBlockHash: blocks[blocks.length - 1].blockHash.hex(),
    signatures: [],
  };
  _addBunchToStore(output);
  return output;
}

function _addBunchToStore(bunch: BunchProposal) {
  try {
    let obj = {};
    try {
      obj = require(process.cwd() + '/kami-bunch-store.json');
    } catch {}

    writeJson(process.cwd() + '/kami-bunch-store.json', {
      ...obj,
      [bunch.startBlockNumber]: { [bunch.bunchDepth]: bunch },
    });
  } catch (error) {
    console.log('Caching generated bunch error', error);
  }
}

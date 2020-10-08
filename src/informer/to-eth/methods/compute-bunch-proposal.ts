import { computeMerkleRoot } from '../../../utils/merkle';
import { fetchBlocks } from '../../../utils/provider';
import { t, validateParam } from '../../../type-validation';
import { Bytes32 } from '../../../utils/bytes';
import { BunchProposal } from '../../../utils/bunch-proposal';
import { hexlify, keccak256, concat } from 'ethers/lib/utils';
import { writeJson, readJson } from 'fs-extra';

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
    } = await readJson(process.cwd() + '/kami-bunch-store.json');

    const output = bunchstore[String(startBlockNumber)][String(bunchDepth)];

    if (output) {
      return output;
    }
  } catch (error) {}

  if (bunchDepth >= 1) {
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
    await _addBunchToStore(output);
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
  await _addBunchToStore(output);
  return output;
}

async function _addBunchToStore(bunch: BunchProposal) {
  try {
    let obj = {};
    try {
      obj = await readJson(process.cwd() + '/kami-bunch-store.json');
    } catch {}

    await writeJson(process.cwd() + '/kami-bunch-store.json', {
      ...obj,
      [bunch.startBlockNumber]: { [bunch.bunchDepth]: bunch },
    });
  } catch (error) {
    console.log('Caching generated bunch error', error);
  }
}

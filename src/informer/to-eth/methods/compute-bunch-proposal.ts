import { computeMerkleRoot } from '../../../utils/merkle';
import { fetchBlocks } from '../../../utils/provider';
import { t, validateParam } from '../../../type-validation';
import { Bytes32 } from '../../../utils/bytes';
import { BunchProposal } from '../../../utils/bunch-proposal';
import { hexlify, keccak256, concat } from 'ethers/lib/utils';

export async function computeBunchProposal(
  startBlockNumber: number,
  bunchDepth: number
): Promise<BunchProposal> {
  validateParam({ startBlockNumber }, t.uint);
  validateParam({ bunchDepth }, t.uint);

  if (bunchDepth >= 5) {
    const left = await computeBunchProposal(startBlockNumber, bunchDepth - 1);
    const right = await computeBunchProposal(
      startBlockNumber + 2 ** (bunchDepth - 1) - 1,
      bunchDepth - 1
    );
    const lastBlock = await global.providerEsn.getBlock(
      startBlockNumber + 2 ** bunchDepth - 1
    );
    return {
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
  }

  const blocks = await fetchBlocks(
    startBlockNumber,
    bunchDepth,
    global.providerEsn
  );

  return {
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
}

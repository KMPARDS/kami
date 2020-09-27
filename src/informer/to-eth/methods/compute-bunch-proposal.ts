import { computeMerkleRoot } from '../../../utils/merkle';
import { fetchBlocks } from '../../../utils/provider';
import { t, validateParam } from '../../../type-validation';
import { Bytes32 } from '../../../utils/bytes';
import { BunchProposal } from '../../../utils/bunch-proposal';

export async function computeBunchProposal(
  startBlockNumber: number,
  bunchDepth: number
): Promise<BunchProposal> {
  validateParam({ startBlockNumber }, t.uint);
  validateParam({ bunchDepth }, t.uint);

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

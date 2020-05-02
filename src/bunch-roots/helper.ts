import { computeMerkleRoot } from '../utils/merkle';
import { fetchBlocks } from '../utils/provider';

export interface BunchProposal {
  startBlockNumber: number;
  bunchDepth: number;
  transactionsMegaRoot: Uint8Array;
  receiptsMegaRoot: Uint8Array;
}

export async function computeBunchProposal(
  startBlockNumber: number,
  bunchDepth: number
): Promise<BunchProposal> {
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
    ),
    receiptsMegaRoot: computeMerkleRoot(
      blocks.map((block) => block.receiptsRoot)
    ),
  };
}

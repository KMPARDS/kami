import { ethers } from 'ethers';
import { fetchBlocks } from '../../../utils/provider';

export async function generateBlockProposal(
  blockNumber: number,
  provider: ethers.providers.JsonRpcProvider
) {
  const blocks = await fetchBlocks(blockNumber, 0, provider);
  const block = blocks[0];
  return blocks[0];
}

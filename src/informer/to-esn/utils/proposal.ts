import { ethers } from 'ethers';
import { fetchBlocks } from '../../../utils/provider';

export async function generateBlockProposal(blockNumber: number) {
  const blocks = await fetchBlocks(blockNumber, 0, global.providerETH);
  const block = blocks[0];
  return blocks[0];
}

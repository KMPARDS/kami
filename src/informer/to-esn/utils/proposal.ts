import { ethers } from 'ethers';
import { fetchBlocks } from '../../../utils/provider';

export async function generateBlockProposal(blockNumber: number) {
  const blocks = await fetchBlocks(blockNumber, 0, global.providerETH);
  const block = blocks[0];
  return blocks[0];
}

export async function checkIfAlreadyProposed(blockNumber: number) {
  const proposalCount = (
    await global.reversePlasmaInstanceESN.getProposalsCount(blockNumber)
  ).toNumber();

  for (let i = 0; i < proposalCount; i++) {
    const proposalValidators = await global.reversePlasmaInstanceESN.getProposalValidators(
      blockNumber,
      i
    );

    if (proposalValidators.includes(global.wallet.address)) {
      return true;
    }
  }

  return false;
}

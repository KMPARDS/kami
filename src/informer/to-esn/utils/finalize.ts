export async function finalizeBlockIfPossible(blockNumber: number) {
  const validators = global.reversePlasmaInstanceESN.getAllValidators();
  const validatorCount = validators;

  const proposalCount = (
    await global.reversePlasmaInstanceESN.getProposalsCount(blockNumber)
  ).toNumber();

  for (let i = 0; i < proposalCount; i++) {
    const proposalValidators = await global.reversePlasmaInstanceESN.getProposalValidators(
      blockNumber,
      i
    );

    if (proposalValidators.length * 3 >= proposalCount * 2) {
      // just in case some other node already did this, then this would throw
      try {
        await global.reversePlasmaInstanceESN.finalizeProposal(blockNumber, i);
      } catch {}
      return;
    }
  }

  return;
}

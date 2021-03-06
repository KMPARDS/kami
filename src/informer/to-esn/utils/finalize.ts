export async function shouldPropose(blockNumber: number) {
  // if this block is finalized by someone else already, then ignore it
  const updatedLatestBlockNumberOnContract = (
    await global.reversePlasmaInstanceESN.latestBlockNumber()
  ).toNumber();
  if (updatedLatestBlockNumberOnContract >= blockNumber) {
    return false;
  }

  const validators = await global.reversePlasmaInstanceESN.getAllValidators();
  const validatorCount = validators.length;

  const proposalCount = (
    await global.reversePlasmaInstanceESN.getProposalsCount(blockNumber)
  ).toNumber();

  for (let i = 0; i < proposalCount; i++) {
    const proposalValidators = await global.reversePlasmaInstanceESN.getProposalValidators(
      blockNumber,
      i
    );

    // first checks if consensus is already acheived
    if (proposalValidators.length * 3 > validatorCount * 2) {
      // just in case some other node already did this, then this would throw
      let nonce = await global.providerEsn.getTransactionCount(
        global.wallet.address
       );
      while(1){
        try {
          const populatedTx = await global.reversePlasmaInstanceESN.populateTransaction.finalizeProposal(
            blockNumber,
            i
          );
          await global.nonceManagerESN.sendTransaction(populatedTx);

          console.log(`InformerToESN: Finalize ${blockNumber} block`);
        }  catch (error) {
          if (error.message.includes('Transaction nonce is too low')) {
            console.log('InformerToESN: Trying with higher nonce..');
            continue;
          }
          console.log({ blockNumber, nonce });
          throw error;
          console.log('Error in finalizing block :',error);
          break;
        }
      }
      return false;
    }

    // if consensus is not acheived, should kami propose or has it already proposed
    if (proposalValidators.includes(global.wallet.address)) {
      return false;
    }
  }

  return true;
}

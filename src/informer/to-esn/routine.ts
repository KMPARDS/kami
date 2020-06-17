import { viewBlockProposal, sendBlockProposal } from './methods';
import { shouldPropose, generateBlockProposal } from './utils';

const CONFIRMATIONS = global.config.ETH_CONFIRMATIONS;

export async function informerToESN(): Promise<void> {
  await global.nonceManagerESN.calibrateNonce();

  // STEP 1 get latest block number on ESN rplasma contract, get confirmed block number from ETH
  const latestBlockNumberOnContract = (
    await global.reversePlasmaInstanceESN.latestBlockNumber()
  ).toNumber();
  const blockNumber = await global.providerETH.getBlockNumber();

  const confirmedBlockETH = blockNumber - CONFIRMATIONS;

  if (latestBlockNumberOnContract >= confirmedBlockETH) {
    return;
  }

  // STEP 2 find range of block numbers to make a proposal (confirmed to latestBlock)
  const range = Object.keys([
    ...Array(confirmedBlockETH - latestBlockNumberOnContract),
  ]).map((n: string) => +n + latestBlockNumberOnContract + 1);

  let nonce = await global.providerEsn.getTransactionCount(
    global.wallet.address
  );
  for (const blockNumber of range) {
    // STEP 3 before making a proposal, check if already made a proposal
    // STEP 5 check if it can be finalized (shouldPropose finalizes if consensus is acheived)
    const shouldKamiProposeBlock = await shouldPropose(blockNumber);
    if (!shouldKamiProposeBlock) {
      continue;
    }

    // STEP 4 make the transaction if not already proposed
    const blockProposal = await generateBlockProposal(blockNumber);

    while (1) {
      try {
        const populatedTx = await global.reversePlasmaInstanceESN.populateTransaction.proposeBlock(
          blockNumber,
          blockProposal.transactionsRoot.hex(),
          blockProposal.receiptsRoot.hex()
        );
        // send populatedTx to nonce manager function
        await global.nonceManagerESN.sendTransaction(populatedTx);
        break;
      } catch (error) {
        if (error.message.includes('Transaction nonce is too low')) {
          console.log('InformerToESN: Trying with higher nonce..');
          continue;
        }
        console.log({ blockNumber, nonce });
        throw error;
      }
    }

    console.log(`InformerToESN: Proposed ${blockNumber} block`);
  }
}

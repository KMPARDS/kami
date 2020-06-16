import { viewBlockProposal, sendBlockProposal } from './methods';
import {
  checkIfAlreadyProposed,
  generateBlockProposal,
  finalizeBlockIfPossible,
} from './utils';

const CONFIRMATIONS = 10;

export async function informerToESN(): Promise<void> {
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
    if (await checkIfAlreadyProposed(blockNumber)) {
      // STEP 5 check if it can be finalized
      await finalizeBlockIfPossible(blockNumber);
      continue;
    }

    // STEP 4 make the transaction if not already proposed
    const blockProposal = await generateBlockProposal(blockNumber);

    await global.reversePlasmaInstanceESN.proposeBlock(
      blockNumber,
      blockProposal.transactionsRoot.hex(),
      blockProposal.receiptsRoot.hex(),
      {
        nonce: nonce++,
      }
    );
    console.log(`Informer To ESN: Proposed ${blockNumber} block`);
  }
}

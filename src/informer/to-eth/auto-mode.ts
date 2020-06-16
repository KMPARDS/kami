import { initiateBunch } from './methods';

const DESIRED_BUNCH_DEPTH = global.config.DESIRED_BUNCH_DEPTH;
const FALLBACK_BUNCH_DEPTH = global.config.FALLBACK_BUNCH_DEPTH;

// Bunch Depth is analogous to time since block time is consistent
// Kami will perform only one bunch initiation in fallback bunch time
// When a routine is started:
// STEP 1: keep these values handy:
//  nextStartBlockNumber on Plasma contract ETH,
//  current block number on ESN,
//  block number of last bunch submitted by this kami
// STEP 2: if last bunch submitted by kami is too recent, i.e. difference between
//  current block number and last submited bunch's end block should be atleast 2**FALLBACK_BUNCH_DEPTH
//  if its not, stop the routine (try in next interval).
// STEP 3: check diff of current block number and nextStartBlockNumber is 2**DESIRED_BUNCH_DEPTH,
//  if it's greater then proceed initiating a bunch submit

// global variable for the routine
let lastSubmittedBlockNumber: number;

export function InformerToETH(): void {
  let taskRunning = false;
  setInterval(async () => {
    if (!taskRunning) {
      taskRunning = true;
      try {
        await main();
      } catch (error) {
        console.log('Error in InformerToETH:', error.message);
      }
      taskRunning = false;
    }
  }, 10000);
}

async function main(): Promise<void> {
  // STEP 1
  const currentBlockNumber = await global.providerEsn.getBlockNumber();
  // TODO: fetch correct value to initialize lastSubmittedBlockNumber
  if (lastSubmittedBlockNumber === undefined) lastSubmittedBlockNumber = 0;
  const nextStartBlockNumber = (
    await global.plasmaInstanceETH.getNextStartBlockNumber()
  ).toNumber();

  // STEP 2
  if (
    currentBlockNumber - lastSubmittedBlockNumber <
    2 ** FALLBACK_BUNCH_DEPTH
  ) {
    return;
  }

  // STEP 3
  if (currentBlockNumber - nextStartBlockNumber > 2 ** DESIRED_BUNCH_DEPTH) {
    const bunchDepth = Math.floor(
      Math.log2(currentBlockNumber - nextStartBlockNumber)
    );
    const tx = await initiateBunch(nextStartBlockNumber, bunchDepth);
    console.log(`Bunch proposal tx sent: ${tx}`);
    lastSubmittedBlockNumber = nextStartBlockNumber + 2 ** bunchDepth - 1;
  }

  return;
}

export async function callInitiateChange(): Promise<void> {
  const lastFinalizeChangeBlock = await global.validatorSetInstanceESN.lastFinalizeChangeBlock();
  if (lastFinalizeChangeBlock.eq(0)) return;

  const tx = await global.validatorSetInstanceESN.initiateChange();
  console.log(`Initiate Change tx sent: ${tx.hash}`);
}

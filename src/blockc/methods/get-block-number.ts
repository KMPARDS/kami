export async function getBlockNumber(): Promise<number> {
  const currentBlockNumber = await global.providerEsn.getBlockNumber();

  return currentBlockNumber;
}

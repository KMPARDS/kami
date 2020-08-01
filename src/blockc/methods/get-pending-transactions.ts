export async function getPendingTransactions(): Promise<number> {
  const pendingTransactions = await global.providerEsn.send(
    'parity_pendingTransactions',
    []
  );
  if (pendingTransactions instanceof Array) {
    return pendingTransactions.length;
  } else {
    return 0;
  }
}

// also add cpu utilisation

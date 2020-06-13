import { validateParam, t } from '../../../type-validation';

export async function sendBlockProposal(
  blockNumber: number,
  transactionsRoot: string,
  receiptsRoot: string
) {
  validateParam({ blockNumber }, t.number);
  validateParam({ transactionsRoot }, t.hex32);
  validateParam({ receiptsRoot }, t.hex32);
  console.log(global.reversePlasmaInstanceESN);

  const tx = await global.reversePlasmaInstanceESN.proposeBlock(
    blockNumber,
    transactionsRoot,
    receiptsRoot
  );

  return tx.hash;
}

import assert from 'assert';
import { t, validateParam } from '../type-validation';
import { Signature, Bytes32 } from './bytes';

export interface BunchProposal {
  startBlockNumber: number;
  bunchDepth: number;
  transactionsMegaRoot: Bytes32;
  receiptsMegaRoot: Bytes32;
  lastBlockHash: Bytes32;
  signatures: Signature[];
}

export function validateBunchProposal(
  bunchProposal: BunchProposal,
  signaturesPresent: boolean
): void | never {
  validateParam({ signaturesPresent }, t.boolean);
  validateParam({ bunchProposal }, t.object);
  const {
    startBlockNumber,
    bunchDepth,
    transactionsMegaRoot,
    receiptsMegaRoot,
    lastBlockHash,
    signatures,
  } = bunchProposal;
  validateParam({ startBlockNumber }, t.number);
  validateParam({ bunchDepth }, t.number);
  validateParam({ transactionsMegaRoot }, t.hex32);
  validateParam({ receiptsMegaRoot }, t.hex32);
  validateParam({ lastBlockHash }, t.hex32);
  validateParam({ signatures }, t.array);
  if (signaturesPresent) {
    bunchProposal.signatures.forEach((signature) => {
      validateParam({ signature }, t.hex65);
    });
  } else {
    assert.strictEqual(
      bunchProposal.signatures.length,
      0,
      'empty signatures should have length 0'
    );
  }
}

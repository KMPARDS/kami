import assert from 'assert';
import { t, validate } from '../type-validation';
import { Signature, Bytes32 } from './bytes';

export interface BunchProposal {
  startBlockNumber: number;
  bunchDepth: number;
  transactionsMegaRoot: Bytes32;
  receiptsMegaRoot: Bytes32;
  signatures: Signature[];
}

export function validateBunchProposal(
  bunchProposal: BunchProposal,
  signaturesPresent: boolean
): void | never {
  validate(signaturesPresent, t.boolean);
  validate(bunchProposal, t.object);
  validate(bunchProposal.startBlockNumber, t.number);
  validate(bunchProposal.bunchDepth, t.number);
  validate(bunchProposal.transactionsMegaRoot, t.hex32);
  validate(bunchProposal.receiptsMegaRoot, t.hex32);
  validate(bunchProposal.signatures, t.array);
  if (signaturesPresent) {
    bunchProposal.signatures.forEach((signature) => {
      validate(signature, t.hex65);
    });
  } else {
    assert.strictEqual(
      bunchProposal.signatures.length,
      0,
      'empty signatures should have length 0'
    );
  }
}

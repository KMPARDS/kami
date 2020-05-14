// this method receives a bunch proposal, checks if it is valid, and returns with valid signature
import { ethers } from 'ethers';
import assert from 'assert';
import { t, validate } from '../../type-validation';
import { Bytes, Signature } from '../../utils/bytes';
import { sign } from '../../utils/sign';
import { computeBunchProposal } from './compute-bunch-proposal';
import {
  BunchProposal,
  validateBunchProposal,
} from '../../utils/bunch-proposal';

export async function signBunch(
  bunchProposal: BunchProposal
): Promise<BunchProposal> {
  validateBunchProposal(bunchProposal, true);

  const _bunchProposal = await computeBunchProposal(
    bunchProposal.startBlockNumber,
    bunchProposal.bunchDepth
  );

  assert.strictEqual(
    bunchProposal.transactionsMegaRoot,
    _bunchProposal.transactionsMegaRoot.hex(),
    'your transactionsMegaRoot not matching with mine'
  );

  assert.strictEqual(
    bunchProposal.receiptsMegaRoot,
    _bunchProposal.receiptsMegaRoot.hex(),
    'your receiptsMegaRoots not matching with mine'
  );

  const encoded = ethers.utils.RLP.encode([
    '0x144d',
    '0x' + _bunchProposal.startBlockNumber.toString(16),
    '0x' + _bunchProposal.bunchDepth.toString(16),
    _bunchProposal.transactionsMegaRoot.hex(),
    _bunchProposal.receiptsMegaRoot.hex(),
  ]);

  return {
    ...bunchProposal,
    signatures: [
      ...bunchProposal.signatures,
      await sign(new Bytes(encoded), global.wallet),
    ],
  };
}

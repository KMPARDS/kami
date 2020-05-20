// this method receives a bunch proposal, checks if it is valid, and returns with valid signature
import { ethers } from 'ethers';
import assert from 'assert';
import { t, validate } from '../../../type-validation';
import { Bytes, Signature } from '../../../utils/bytes';
import { signMessage } from '../../../utils/sign';
import { computeBunchProposal } from './compute-bunch-proposal';
import {
  BunchProposal,
  validateBunchProposal,
} from '../../../utils/bunch-proposal';

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
    new Bytes(_bunchProposal.startBlockNumber).hex(),
    new Bytes(_bunchProposal.bunchDepth).hex(),
    _bunchProposal.transactionsMegaRoot.hex(),
    _bunchProposal.receiptsMegaRoot.hex(),
  ]);

  return {
    ...bunchProposal,
    signatures: [
      ...bunchProposal.signatures,
      await signMessage(new Bytes(encoded), global.wallet),
    ],
  };
}

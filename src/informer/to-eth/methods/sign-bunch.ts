// this method receives a bunch proposal, checks if it is valid, and returns with valid signature
import { ethers } from 'ethers';
import assert from 'assert';
import { t, validate } from '../../../type-validation';
import { Bytes, Signature } from '../../../utils/bytes';
import { signBunchData } from '../../../utils/sign';
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
    _bunchProposal.transactionsMegaRoot,
    'your transactionsMegaRoot not matching with mine'
  );

  assert.strictEqual(
    bunchProposal.receiptsMegaRoot,
    _bunchProposal.receiptsMegaRoot,
    'your receiptsMegaRoots not matching with mine'
  );

  const encoded = ethers.utils.concat([
    ethers.utils.hexZeroPad(
      '0x' + _bunchProposal.startBlockNumber.toString(16),
      32
    ),
    ethers.utils.hexZeroPad('0x' + _bunchProposal.bunchDepth.toString(16), 32),
    _bunchProposal.transactionsMegaRoot,
    _bunchProposal.receiptsMegaRoot,
    _bunchProposal.lastBlockHash,
  ]);

  return {
    ...bunchProposal,
    signatures: [
      signBunchData(new Bytes(encoded), global.wallet).hex(),
      ...bunchProposal.signatures,
    ],
  };
}

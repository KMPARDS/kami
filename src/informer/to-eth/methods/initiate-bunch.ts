import { Signature, Bytes } from '../../../utils/bytes';
import {
  BunchProposal,
  validateBunchProposal,
} from '../../../utils/bunch-proposal';
import { computeBunchProposal } from './compute-bunch-proposal';
import { JsonSuccessResponse, JsonErrorResponse } from '../../../json-rpc';
import { validate, t } from '../../../type-validation';
import { ethers } from 'ethers';
import { signBunch } from './sign-bunch';
import { hexlifyObject } from '../../../json-rpc/parser';

// TODO add auto guess startBlockNumber and bunchDepth
export async function initiateBunch(
  startBlockNumber: number,
  bunchDepth: number
) {
  const bunchProposal = await computeBunchProposal(
    startBlockNumber,
    bunchDepth
  );

  const _signatures = await Promise.all(
    global.peerList.getTrustedPeers().map(
      async (peer): Promise<string | null> => {
        try {
          const response = await peer.sendRequest('informer_signBunch', [
            bunchProposal,
          ]);

          if (!('result' in response)) {
            throw new Error('No result');
          }

          validateBunchProposal(response.result, true);

          // console.log(response.result.signatures);
          return response.result.signatures[0];
        } catch {
          return null;
        }
      }
    )
  );

  // @ts-ignore TODO https://github.com/microsoft/TypeScript/issues/38636
  const signatures: string[] = _signatures.filter((sig) => sig !== null);

  // self signing
  const signedProposal = await signBunch(hexlifyObject(bunchProposal));
  signatures.push(signedProposal.signatures[0]);

  // TODO filter signatures and verify that they r of validators
  // console.log('collectSignatures', signatures);

  // const rlpArray = [
  //   [
  //     new Bytes(startBlockNumber).hex(),
  //     new Bytes(bunchDepth).hex(),
  //     bunchProposal.transactionsMegaRoot,
  //     bunchProposal.receiptsMegaRoot,
  //     bunchProposal.lastBlockHash,
  //   ],
  //   ...signatures,
  // ];

  // console.log(rlpArray);

  // const rlpBytes = ethers.utils.RLP.encode(rlpArray);

  // console.log(plpBunch);

  try {
    // TODO check once if someone already did transaction with higher gas fee, if yes then don't do the tx
    const tx: ethers.ContractTransaction = await global.plasmaInstanceETH.functions.submitBunchHeader(
      bunchProposal.startBlockNumber,
      bunchProposal.bunchDepth,
      bunchProposal.transactionsMegaRoot,
      bunchProposal.receiptsMegaRoot,
      bunchProposal.lastBlockHash,
      signatures
    );

    // TODO when transaction done, inform all other kami's regarding the same
    //  Kami's can expect raw transaction instead of only hash, so that no need to make call to ethereum

    return tx.hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

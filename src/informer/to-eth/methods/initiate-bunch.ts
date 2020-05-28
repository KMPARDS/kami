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

  // @ts-ignore
  const signatures: string[] = _signatures.filter((sig) => sig !== null);

  // self signing
  const sig = await signBunch(hexlifyObject(bunchProposal));
  signatures.push(sig.signatures[0].hex());

  // TODO filter signatures and verify that they r of validators
  console.log('collectSignatures', signatures);

  const rlpArray = [
    [
      new Bytes(startBlockNumber).hex(),
      new Bytes(bunchDepth).hex(),
      bunchProposal.transactionsMegaRoot.hex(),
      bunchProposal.receiptsMegaRoot.hex(),
    ],
    ...signatures,
  ];

  console.log(rlpArray);

  const plpBunch = ethers.utils.RLP.encode(rlpArray);

  console.log(plpBunch);

  try {
    const x = await global.plasmaInstanceETH.functions.esnDepositAddress();
    console.log({ x });

    // TODO check once if someone already did transaction with higher gas fee, if yes then don't do the tx
    const tx: ethers.ContractTransaction = await global.plasmaInstanceETH.functions.submitBunchHeader(
      plpBunch,
      {
        gasLimit: 1000000,
      }
    );

    // TODO when transaction done, inform all other kami's regarding the same
    //  Kami's can expect raw transaction instead of only hash, so that no need to make call to ethereum

    return tx.hash;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

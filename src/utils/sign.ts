import { ethers } from 'ethers';
import { Byted, Signature, Bytes32, Bytes, Address } from './bytes';
import { rlpizeObject, serializeJson } from './serialize-json';
import { JsonRequest, JsonSuccessResponse } from '../json-rpc';
import { SIGNATURE_ERROR } from '../json-rpc/errors';
import { check, t } from '../type-validation';

export async function signMessage(
  byted: Byted,
  wallet: ethers.Wallet
): Promise<Signature> {
  const signature = await wallet.signMessage(byted.data);
  return new Signature(signature);
}

function getDomainSeperator(): Bytes32 {
  const rlp = ethers.utils.RLP.encode(
    rlpizeObject({
      name: 'Kami of Era Swap Network',
      chainId: 5197,
    })
  );
  return new Bytes32(ethers.utils.keccak256(rlp));
}

function prepareDigest(byted: Byted): Bytes32 {
  const preDigest = new Bytes(ethers.utils.toUtf8Bytes('\x19\x97'))
    .concat(getDomainSeperator())
    .concat(byted);
  return new Bytes32(ethers.utils.keccak256(preDigest.data));
}

export function signData(byted: Byted, wallet: ethers.Wallet): Signature {
  const signature = wallet._signingKey().signDigest(prepareDigest(byted).data);
  return new Signature(ethers.utils.joinSignature(signature));
}

export function recoverAddress(byted: Byted, signature: Signature): Address {
  return new Address(
    ethers.utils.recoverAddress(prepareDigest(byted).data, signature.data)
  );
}

export function recoverAddressFromSignedJson(
  signedJson: JsonRequest | JsonSuccessResponse
): Address | never {
  if (!signedJson.signature) {
    throw { ...SIGNATURE_ERROR, data: `Signature not found` };
  }
  let signature: Signature;
  if (signedJson.signature instanceof Signature) {
    signature = signedJson.signature;
  } else if (check(signedJson.signature, t.hex65)) {
    signature = new Signature(signedJson.signature);
  } else {
    throw { ...SIGNATURE_ERROR, data: `Invalid signature` };
  }
  const preSignedRequest: JsonRequest | JsonSuccessResponse = {
    ...signedJson,
  };
  delete preSignedRequest.signature;
  const serializedRequest: Bytes = serializeJson(preSignedRequest);

  const address: Address = recoverAddress(serializedRequest, signature);

  return address;
}

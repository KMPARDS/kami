import { ethers } from 'ethers';
import { Byted, Signature, Bytes32, Bytes, Address } from './bytes';
import { rlpizeObject, serializeJson } from './serialize-json';
import { JsonRequest, JsonSuccessResponse } from '../json-rpc';
import { SIGNATURE_ERROR } from '../json-rpc/errors';
import { check, t } from '../type-validation';

// ------------- digest preparing -------------

interface DomainSeperatorObj {
  name: string;
  chainId: number;
  description: string;
}

export function getDomainSeperator(
  domainSeperatorObj: DomainSeperatorObj
): Bytes32 {
  const rlp = ethers.utils.RLP.encode(rlpizeObject(domainSeperatorObj));
  return new Bytes32(ethers.utils.keccak256(rlp));
}

export function prepareDigest(
  byted: Byted,
  domainSeperatorObj: DomainSeperatorObj
): Bytes32 {
  const preDigest = new Bytes('0x19') // ensuring not an RLP
    .concat(new Bytes('0x97')) // 1 byte version
    .concat(getDomainSeperator(domainSeperatorObj)) // version specific data
    .concat(byted); // data to sign
  return new Bytes32(ethers.utils.keccak256(preDigest.data));
}

export function prepareKamiDigest(byted: Byted): Bytes32 {
  return prepareDigest(byted, {
    name: 'Era Swap Network',
    chainId: 5196, // TODO: add mainnet and testnet
    description: 'Kami',
  });
}

export function prepareBunchDigest(byted: Byted): Bytes32 {
  return prepareDigest(byted, {
    name: 'Era Swap Network',
    chainId: 5196, // TODO: add mainnet and testnet
    description: 'Bunch',
  });
}

// ------------- signing -------------

export function signKamiData(byted: Byted, wallet: ethers.Wallet): Signature {
  const signature = wallet
    ._signingKey()
    .signDigest(prepareKamiDigest(byted).data);
  return new Signature(ethers.utils.joinSignature(signature));
}

export function signBunchData(byted: Byted, wallet: ethers.Wallet): Signature {
  const signature = wallet
    ._signingKey()
    .signDigest(prepareBunchDigest(byted).data);
  return new Signature(ethers.utils.joinSignature(signature));
}

// ------------- recovering address -------------

function recoverAddress(
  byted: Byted,
  signature: Signature,
  digestPreparer: (byted: Byted) => Bytes32
): Address {
  return new Address(
    ethers.utils.recoverAddress(digestPreparer(byted).data, signature.data)
  );
}

export function recoverAddressKami(
  byted: Byted,
  signature: Signature
): Address {
  return recoverAddress(byted, signature, prepareKamiDigest);
}

export function recoverAddressBunch(
  byted: Byted,
  signature: Signature
): Address {
  return recoverAddress(byted, signature, prepareBunchDigest);
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

  const address: Address = recoverAddressKami(serializedRequest, signature);

  return address;
}

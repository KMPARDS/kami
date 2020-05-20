import { ethers } from 'ethers';
import { Byted, Signature, Bytes32, Bytes, Address } from './bytes';
import { rlpizeObject } from './serialize-json';

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
  const preDigest = new Bytes(ethers.utils.toUtf8Bytes('\x19\x00'))
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

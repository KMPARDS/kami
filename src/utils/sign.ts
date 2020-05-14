import { ethers } from 'ethers';
import { Byted, Signature } from './bytes';

export async function sign(
  byted: Byted,
  wallet: ethers.Wallet
): Promise<Signature> {
  const signature = await wallet.signMessage(byted.data);
  return new Signature(signature);
}

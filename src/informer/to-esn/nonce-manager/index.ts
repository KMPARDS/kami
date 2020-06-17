import { ethers } from 'ethers';

export class NonceManager {
  nonce: number | null = null;

  async calibrateNonce() {
    this.nonce = await global.providerEsn.getTransactionCount(
      global.wallet.address
    );
  }

  async sendTransaction(
    populatedTx: ethers.PopulatedTransaction
  ): Promise<ethers.providers.TransactionResponse> {
    if (this.nonce === null) {
      await this.calibrateNonce();
    }

    if (this.nonce === null) {
      throw new Error('Nonce is Null');
    }

    let gasLimit = 2000000;

    try {
      const estimatedGas = await global.providerEsn.estimateGas(populatedTx);
      gasLimit = estimatedGas.mul(4).div(3).toNumber(); // sending 33% more gas
    } catch {}

    // TODO: Add chain ID here
    const signedTransaction = await global.wallet.signTransaction({
      to: populatedTx.to,
      data: populatedTx.data,
      gasLimit,
      gasPrice: 0,
      nonce: this.nonce,
      value: 0,
    });

    this.nonce++;

    try {
      const tx = await global.providerEsn.sendTransaction(signedTransaction);
      return tx;
    } catch (error) {
      if (error.message.includes('Transaction nonce is too low')) {
        console.log('InformerToESN: Trying with higher nonce..');
        // Nonce gets increased in every try
        return await this.sendTransaction(populatedTx);
      }
      throw error;
    }
  }
}

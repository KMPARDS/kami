const ethers = require('ethers');
const assert = require('assert');
const { Bytes } = require('../../build/utils/bytes');
const { signMessage, serializeJson2Object } = require('../../build/utils/sign');

const wallet = ethers.Wallet.createRandom();

describe('Signing', () => {
  it('sign message', async () => {
    const hex = '0x1234';
    const bytes = new Bytes(hex);
    const signature = await signMessage(bytes, wallet);

    const pad = new Bytes(
      ethers.utils.toUtf8Bytes('\x19Ethereum Signed Message:\n' + bytes.length)
    );
    const paddedBytes = pad.concat(bytes);
    const digest = ethers.utils.keccak256(paddedBytes.data);

    const recoveredAddress = ethers.utils.recoverAddress(
      digest,
      signature.data
    );

    assert.strictEqual(
      recoveredAddress,
      wallet.address,
      'recovered address should be equal to the wallet address'
    );
  });

  it('use serializeJson2Object', () => {});
});

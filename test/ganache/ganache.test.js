const assert = require('assert');
const ethers = require('ethers');

const getProviderESN = () =>
  new ethers.providers.JsonRpcProvider('http://localhost:8545');
let providerESN = getProviderESN();

let accounts;

describe('Ganache Setup', () => {
  it('check if ganache is initiated', async () => {
    await new Promise(async (resolve, reject) => {
      while (true) {
        try {
          await providerESN.getNetwork();
          break;
        } catch (error) {
          console.log('waiting for ganache to start...');
          providerESN = getProviderESN();
        }
        await new Promise((res) => setTimeout(res, 1000));
      }
      resolve();
    });
  });

  it('initiate ganache and generates a bunch of demo accounts', async () => {
    accounts = await providerESN.listAccounts();

    assert.ok(
      accounts.length >= 2,
      'atleast 2 accounts should be present in the array'
    );
  });

  it('create some blocks for generating merkle root', async () => {
    const signer = providerESN.getSigner(accounts[0]);

    for (let i = 0; i < 10; i++) {
      await signer.sendTransaction({
        to: '0xC8e1F3B9a0CdFceF9fFd2343B943989A22517b26',
        value: 1,
      });
    }
  });
});

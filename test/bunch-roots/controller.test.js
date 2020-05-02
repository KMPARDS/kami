const assert = require('assert');
const ganache = require('ganache-cli');
const ethers = require('ethers');
const axios = require('axios');

const providerESN = new ethers.providers.Web3Provider(
  ganache.provider({ gasLimit: 8000000 })
);

describe('Bunch Root Controller', async () => {
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

  it('call bunch-roots/generate', async () => {
    const response = await axios.get(
      'http://localhost:15985/bunch-roots/generate?startBlockNumber=0&bunchDepth=1'
    );
    console.log(response.data);
  });
});

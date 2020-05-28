import assert from 'assert';
import { ethers } from 'ethers';
import { Address } from '../../src/utils/bytes';
import { ContractJson } from '../../src/informer/utils';
import { t, validate } from '../../src/type-validation';
import { kami1, kami2, kami3, getProvider } from '../test-configs';
global.providerETH = getProvider(kami1.config.ETH_URL);

const validatorAddressArray = [
  '0x' + kami1.keystore.address,
  '0x' + kami2.keystore.address,
  '0x' + kami3.keystore.address,
];

const contractDeployerWallet = new ethers.Wallet(
  '0x24c4fe6063e62710ead956611b71825b778b041b18ed53118ce5da5f02e494ba'
);

export const EthSetup = () =>
  describe('ETH Setup', () => {
    it('check if ETH ganache server is initiated', async () => {
      await new Promise(async (resolve, reject) => {
        while (true) {
          try {
            await global.providerETH.getNetwork();
            break;
          } catch (error) {
            console.log('waiting for ganache to start...');
            global.providerETH = getProvider(kami1.config.ETH_URL);
          }
          await new Promise((res) => setTimeout(res, 1000));
        }
        resolve();
      });
    });

    it('initiate ganache and generates a bunch of demo accounts', async () => {
      const accounts = await global.providerETH.listAccounts();
      global.accountsETH = accounts.map((address) => new Address(address));

      assert.ok(
        global.accountsETH.length >= 2,
        'atleast 2 accounts should be present in the array'
      );
    });

    it('transfer some funds to deployer wallet', async () => {
      const signer = global.providerETH.getSigner(global.accountsETH[0].hex());

      await signer.sendTransaction({
        to: contractDeployerWallet.address,
        value: ethers.utils.parseEther('1'),
      });

      assert.ok(
        (
          await global.providerETH.getBalance(contractDeployerWallet.address)
        ).eq(ethers.utils.parseEther('1')),
        'balance should be credited to the contract deployer wallet'
      );
    });

    it('deploy Era Swap Token Contract', async () => {
      const esContractJson: ContractJson = require('../../static/contracts/ERC20_ERC20.json');
      const ESFactory = new ethers.ContractFactory(
        esContractJson.abi,
        esContractJson.evm.bytecode,
        contractDeployerWallet.connect(global.providerETH)
      );

      global.esInstanceETH = await ESFactory.deploy();

      console.log({
        'global.esInstanceETH.address': global.esInstanceETH.address,
      });

      validate(global.esInstanceETH.address, t.hex20);
    });

    it('deploy Plasma Smart Contract', async () => {
      const plasmaContractJson: ContractJson = require('../../static/contracts/PlasmaManager_PlasmaManager.json');
      const PlasmaFactory = new ethers.ContractFactory(
        plasmaContractJson.abi,
        plasmaContractJson.evm.bytecode,
        contractDeployerWallet.connect(global.providerETH)
      );

      global.plasmaInstanceETH = await PlasmaFactory.deploy(
        validatorAddressArray,
        global.esInstanceETH.address
      );

      console.log({
        'global.plasmaInstanceETH.address': global.plasmaInstanceETH.address,
      });

      validate(global.plasmaInstanceETH.address, t.hex20);
    });

    it('create some blocks for generating merkle root', async () => {
      const signer = global.providerETH.getSigner(global.accountsETH[0].hex());

      for (let i = 0; i < 10; i++) {
          await signer.sendTransaction({
          to: '0xC8e1F3B9a0CdFceF9fFd2343B943989A22517b26',
          value: 1,
          });
        }
    });
  });

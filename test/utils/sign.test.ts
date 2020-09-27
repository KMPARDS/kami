import assert from 'assert';
import { ethers } from 'ethers';
import { Bytes, Signature, Bytes32, Address } from '../../src/utils/bytes';
import {
  signBunchData,
  signKamiData,
  recoverAddressKami,
  recoverAddressBunch,
  prepareDomainDigest,
} from '../../src/utils/sign';

const wallet = ethers.Wallet.createRandom();

export const Signing = () =>
  describe('Signing', () => {
    it('sign bunch data', async () => {
      const hex = '0x1234';
      const bytes = new Bytes(hex);
      const signature = signBunchData(bytes, wallet);

      const pad = new Bytes(
        '0x19976f3a1e66e989a1cf337b9dd2ce4c98a5e78763cf9f9bdaac5707038c66a4d74e' // testnet 5196
      );

      const paddedBytes = pad.concat(bytes);
      const manualDigest = ethers.utils.keccak256(paddedBytes.data);

      const preparedDigest = prepareDomainDigest(bytes, {
        name: 'Era Swap Network',
        chainId: 5196, // TODO: add mainnet and testnet
        description: 'Bunch',
      });

      assert.ok(
        preparedDigest.eq(new Bytes(manualDigest)),
        'manual and prepared digest should match'
      );

      const recoveredAddress = recoverAddressBunch(bytes, signature);

      assert.ok(
        recoveredAddress.eq(new Address(wallet.address)),
        'recovered address should be equal to the wallet address'
      );
    });

    it('sign kami data', () => {
      const bytes = new Bytes('0x1234');
      const signature = signKamiData(bytes, wallet);

      const pad = new Bytes(
        '0x1997ea04d3ef0bb7acb601daaf4affda2d612b064073e27f9cec2326c626c5adeac4' // testnet 5196
      );

      const paddedBytes = pad.concat(bytes);
      const manualDigest = ethers.utils.keccak256(paddedBytes.data);

      const preparedDigest = prepareDomainDigest(bytes, {
        name: 'Era Swap Network',
        chainId: 5196, // TODO: add mainnet and testnet
        description: 'Kami',
      });

      assert.ok(
        preparedDigest.eq(new Bytes(manualDigest)),
        'manual and prepared digest should match'
      );

      const recoveredAddress = recoverAddressKami(bytes, signature);

      assert.ok(
        recoveredAddress.eq(new Address(wallet.address)),
        'address recovered should be same'
      );
    });
  });

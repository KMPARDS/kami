import path from 'path';
import fs from 'fs';
import { ethers } from 'ethers';
import util from 'util';
import { PeerList } from './peers';
import { URLMask } from './utils/url';
import { ContractJson } from './informer/utils';

// prints console.logs
global.consoleLog = (...input) => {
  if (process.env.NODE_ENV === 'debug') {
    console.log('\n╭' + '-'.repeat(process.stdout.columns - 2 || 30) + '╮');
    console.log('  DEBUG\n');
    console.log(
      util.inspect([...input], { showHidden: false, depth: null, colors: true })
    );
    console.log('\n╰' + '-'.repeat(process.stdout.columns - 2 || 30) + '╯\n');
  }
};

global.peerList = new PeerList();

// TODO use minimist package in this case
// loading config from file
const configUrl: string = process.argv[2] ?? 'kami-config';
const config = require(path.resolve(process.cwd(), configUrl));

global.config = {
  ETH_URL: new URLMask(config.ETH_URL ?? 'http://localhost:7545'),
  ESN_URL: new URLMask(config.ESN_URL ?? 'http://localhost:8545'),
  JSON_RPC_PORT: config.JSON_RPC_PORT ?? 25985,
  KEYSTORE_PATH: config.KEYSTORE_PATH
    ? path.resolve(process.cwd(), configUrl, '..', config.KEYSTORE_PATH)
    : null,
  KEYSTORE_PASSWORD_PATH: config.KEYSTORE_PASSWORD_PATH
    ? path.resolve(
        process.cwd(),
        configUrl,
        '..',
        config.KEYSTORE_PASSWORD_PATH
      )
    : null,
  SEED_PEER_PATH: config.SEED_PEER_PATH
    ? path.resolve(process.cwd(), configUrl, '..', config.SEED_PEER_PATH)
    : null,
};

// loading providers
const getProvider = async (url: string) => {
  while (true) {
    try {
      const provider = new ethers.providers.JsonRpcProvider(url);
      await provider.ready;
      return provider;
    } catch (er) {
      console.log('uyyy', er.message);
    }
    await new Promise((res) => setTimeout(res, 1000));
  }
};

const providerESNPromise = getProvider(global.config.ESN_URL.toString());
const providerETHPromise = getProvider(global.config.ETH_URL.toString());

// loading wallet
if (
  typeof global.config.KEYSTORE_PATH === 'string' &&
  typeof global.config.KEYSTORE_PASSWORD_PATH === 'string'
) {
  const keystore = require(global.config.KEYSTORE_PATH);

  const keystorePassword: string = fs.readFileSync(
    global.config.KEYSTORE_PASSWORD_PATH,
    'utf8'
  );

  (async () => {
    try {
      global.wallet = await ethers.Wallet.fromEncryptedJson(
        typeof keystore === 'string' ? keystore : JSON.stringify(keystore),
        keystorePassword
      );
      console.log('Wallet loaded', global.wallet.address);

      const [providerESN, providerETH] = await Promise.all([
        providerESNPromise,
        providerETHPromise,
      ]);

      if (!providerETH) {
        throw new Error('Could not connect to Provider ETH');
      }

      if (!providerESN) {
        throw new Error('Could not connect to Provider ESN');
      }

      global.providerEsn = providerESN;
      global.providerETH = providerETH;

      // loading contracts
      const esJson: ContractJson = require('../static/contracts/ERC20.json');
      if (!esJson) {
        throw new Error('ES JSON not present');
      }
      // @ts-ignore Keep until TypeChain for ethers v5 implemented https://github.com/KMPARDS/esn-contracts/issues/30
      global.esInstanceETH = new ethers.Contract(
        '0x3bEb087e33eC0B830325991A32E3F8bb16A51317',
        esJson.abi,
        global.wallet.connect(global.providerETH)
      );
      const plasmaJson: ContractJson = require('../static/contracts/PlasmaManager.json');
      if (!plasmaJson) {
        throw new Error('PlasmaManager JSON not present');
      }
      // @ts-ignore Keep until TypeChain for ethers v5 implemented https://github.com/KMPARDS/esn-contracts/issues/30
      global.plasmaInstanceETH = new ethers.Contract(
        '0xc4cfb05119Ea1F59fb5a8F949288801491D00110',
        plasmaJson.abi,
        global.wallet.connect(global.providerETH)
      );
      const reversePlasmaJson: ContractJson = require('../static/contracts/ReversePlasma.json');
      if (!reversePlasmaJson) {
        throw new Error('PlasmaManager JSON not present');
      }
      // @ts-ignore Keep until TypeChain for ethers v5 implemented https://github.com/KMPARDS/esn-contracts/issues/30
      global.reversePlasmaInstanceESN = new ethers.Contract(
        '0x3bEb087e33eC0B830325991A32E3F8bb16A51317',
        reversePlasmaJson.abi,
        global.wallet.connect(global.providerEsn)
      );
    } catch (err) {
      console.log('Error while loading wallet', err);
    }
  })();
}

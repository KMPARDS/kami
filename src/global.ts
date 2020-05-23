import path from 'path';
import fs from 'fs';
import { ethers } from 'ethers';
import util from 'util';
import { PeerList } from './peers';
import { URLMask } from './utils/url';

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

const providerEsn: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.ESN_URL
);

global.providerEsn = providerEsn;

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
    } catch (err) {
      console.log('Error while loading wallet', err);
    }
  })();
}

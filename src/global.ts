import { ethers } from 'ethers';

const providerEsn: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.ESN_URL
);

global.providerEsn = providerEsn;

// loading config from file
import path from 'path';
const configUrl: string = process.argv[2] ?? 'kami-config';
const config = require(path.resolve(process.cwd(), configUrl));

global.config = {
  ETH_URL: config.ETH_URL ?? 'http://localhost:7545',
  ESN_URL: config.ESN_URL ?? 'http://localhost:8545',
  JSON_RPC_PORT: config.JSON_RPC_PORT ?? 25985,
};

const keystore = require(path.resolve(
  process.cwd(),
  configUrl,
  '..',
  config.KEYSTORE_PATH
));

import fs from 'fs';
const keystorePassword: string = fs.readFileSync(
  path.resolve(process.cwd(), configUrl, '..', config.KEYSTORE_PASSWORD_PATH),
  'utf8'
);
console.log({ keystorePassword });

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

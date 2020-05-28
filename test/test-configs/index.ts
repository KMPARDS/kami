import util from 'util';
import { ethers } from 'ethers';

interface Kami {
  config: RawConfig;
  keystore: {
    address: string;
  };
}

interface RawConfig {
  ETH_URL: string;
  ESN_URL: string;
  JSON_RPC_PORT: number;
  KEYSTORE_PATH: string;
  KEYSTORE_PASSWORD_PATH: string;
  SEED_PEER_PATH: string;
}

export const kami1: Kami = {
  config: require('./kami1/kami-config.json'),
  keystore: require('./kami1/keystore.json'),
};
export const kami2: Kami = {
  config: require('./kami2/kami-config.json'),
  keystore: require('./kami2/keystore.json'),
};
export const kami3: Kami = {
  config: require('./kami3/kami-config.json'),
  keystore: require('./kami3/keystore.json'),
};
export const getProvider = (url: string) =>
  new ethers.providers.JsonRpcProvider(url);

import { ethers } from 'ethers';
import { PeerList } from '../peers';
import { URLMask } from '../utils/url';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'debug';
      PORT?: string;
      ESN_URL: string;
    }

    interface Global {
      consoleLog: (...input: any) => void;
      providerEsn: ethers.providers.JsonRpcProvider;
      config: {
        ETH_URL: URLMask;
        ESN_URL: URLMask;
        JSON_RPC_PORT: number;
        KEYSTORE_PATH: string | null;
        KEYSTORE_PASSWORD_PATH: string | null;
        SEED_PEER_PATH: string | null;
      };
      wallet: ethers.Wallet;
      peerList: PeerList;
    }
  }
}

export {};

import { ethers } from 'ethers';
import { Peer } from '../peers/peer-request';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      ESN_URL: string;
    }

    interface Global {
      consoleLog: (...input: any) => void;
      providerEsn: ethers.providers.JsonRpcProvider;
      config: {
        ETH_URL: string;
        ESN_URL: string;
        JSON_RPC_PORT: number;
        KEYSTORE_PATH: string | null;
        KEYSTORE_PASSWORD_PATH: string | null;
        SEED_PEER_PATH: string | null;
      };
      wallet: ethers.Wallet;
      peers: Peer[];
    }
  }
}

export {};

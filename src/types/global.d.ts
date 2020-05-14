import { ethers } from 'ethers';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      ESN_URL: string;
    }

    interface Global {
      providerEsn: ethers.providers.JsonRpcProvider;
      config: {
        ETH_URL: string;
        ESN_URL: string;
        JSON_RPC_PORT: number;
      };
      wallet: ethers.Wallet;
    }
  }
}

export {};

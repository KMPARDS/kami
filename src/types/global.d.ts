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
    }
  }
}

export {};

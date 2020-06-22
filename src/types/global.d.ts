import { ethers, PopulatedTransaction } from 'ethers';
import { PeerList } from '../peers';
import { URLMask } from '../utils/url';
import { Erc20 } from '../typechain/ETH/Erc20';
import { PlasmaManager } from '../typechain/ETH/PlasmaManager';
import { ReversePlasma } from '../typechain/ESN/ReversePlasma';
import { NonceManager } from '../informer/to-esn/nonce-manager';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'production' | 'development' | 'debug' | 'test';
      PORT?: string;
      ESN_URL: string;
    }

    interface Global {
      consoleLog: (...input: any) => void;
      config: {
        ETH_URL: URLMask;
        ESN_URL: URLMask;
        JSON_RPC_PORT: number;
        KEYSTORE_PATH: string | null;
        KEYSTORE_PASSWORD_PATH: string | null;
        SEED_PEER_PATH: string | null;
        DESIRED_BUNCH_DEPTH: number;
        FALLBACK_BUNCH_DEPTH: number;
        ETH_CONFIRMATIONS: number;
      };
      providerEsn: ethers.providers.JsonRpcProvider;
      providerETH: ethers.providers.JsonRpcProvider;
      wallet: ethers.Wallet;
      peerList: PeerList;
      esInstanceETH: Erc20;
      plasmaInstanceETH: PlasmaManager;
      reversePlasmaInstanceESN: ReversePlasma;
      nonceManagerESN: NonceManager;
    }
  }
}

export {};

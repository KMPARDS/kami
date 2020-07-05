import { ethers } from 'ethers';
import { Address } from '../src/utils/bytes';
import { GanacheServer } from './ganache';
import { Erc20 } from '../src/typechain/ETH/Erc20';
import { PlasmaManager } from '../src/typechain/ETH/PlasmaManager';
import { ReversePlasma } from '../src/typechain/ESN/ReversePlasma';

declare global {
  namespace NodeJS {
    interface Global {
      serverETH: GanacheServer;
      providerETH: ethers.providers.StaticJsonRpcProvider;
      accountsETH: Address[];
      serverESN: GanacheServer;
      providerESN: ethers.providers.StaticJsonRpcProvider;
      accountsESN: Address[];
      consoleLog: (...input: any) => void;
      esInstanceETH: Erc20;
      plasmaInstanceETH: PlasmaManager;
      reversePlasmaInstanceESN: ReversePlasma;
    }
  }
}

import util from 'util';

global.consoleLog = (...input) => {
  if (process.env.NODE_ENV === 'debug') {
    console.log('\n╭' + '-'.repeat(process.stdout.columns - 2 || 30) + '╮');
    console.log('  DEBUG\n');
    console.log(util.inspect([...input], false, null, true));
    console.log('\n╰' + '-'.repeat(process.stdout.columns - 2 || 30) + '╯\n');
  }
};

import { ethers } from 'ethers';
import { Address } from '../src/utils/bytes';
import { GanacheServer } from './ganache';

declare global {
  namespace NodeJS {
    interface Global {
      serverETH: GanacheServer;
      providerETH: ethers.providers.JsonRpcProvider;
      accountsETH: Address[];
      serverESN: GanacheServer;
      providerESN: ethers.providers.JsonRpcProvider;
      accountsESN: Address[];
      consoleLog: (...input: any) => void;
      esInstanceETH: ethers.Contract;
      plasmaInstanceETH: ethers.Contract;
    }
  }
}

import util from 'util';

global.consoleLog = (...input) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('\n╭' + '-'.repeat(process.stdout.columns - 2 || 30) + '╮');
    console.log('  DEBUG\n');
    console.log(util.inspect([...input], false, null, true));
    console.log('\n╰' + '-'.repeat(process.stdout.columns - 2 || 30) + '╯\n');
  }
};

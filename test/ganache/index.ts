import { EthSetup } from './eth.test';
import { EsnSetup } from './esn.test';

export * from './server';

export const Ganache = () => {
  describe('Ganache', () => {
    EthSetup();
    EsnSetup();
  });
};

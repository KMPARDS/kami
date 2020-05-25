import './global';
import { Ganache, startGanache } from './ganache/';
import { JsonRpc } from './json-rpc';
import { Utils } from './utils';

// starting ganache development blockchains ETH and ESN
startGanache();

describe('Kami Test Cases', () => {
  Ganache();
  Utils();
  JsonRpc();

  describe('Closing', () => {
    it('closing ETH ganache', () => {
      global.serverETH.close();
    });
    it('closing ESN ganache', () => {
      global.serverESN.close();
    });
  });
});

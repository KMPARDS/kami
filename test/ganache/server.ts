import ganache from 'ganache-core';

export interface GanacheServer {
  listen(port: number, callback: (err: any, blockchain: any) => void): void;
  close(): void;
  ganacheProvider: any;
  provider: any;
  allowHalfOpen: boolean;
  pauseOnConnect: boolean;
  httpAllowHalfOpen: boolean;
  timeout: number;
  keepAliveTimeout: number;
  maxHeadersCount: number | null;
  headersTimeout: number;
}

export const startGanache = () => {
  global.serverETH = ganache.server({
    gasPrice: '0x00',
  });
  global.serverETH.listen(7545, () => {
    console.log('ETH Ganache Started on 7545..');
  });

  global.serverESN = ganache.server({
    gasPrice: '0x00',
  });
  global.serverESN.listen(8545, () => {
    console.log('ESN Ganache Started on 8545..');
  });
};

// setTimeout(() => {
//   console.log('stopping server');
//   global.serverESN.close();
// }, 2000);

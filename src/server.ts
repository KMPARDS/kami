// load the .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

// setup global configurations
import './global';
global.consoleLog('global.config', global.config);

import { findAndConnectPeers } from './peers';
import { InformerToESN } from './informer/to-esn/auto-mode';
import { InformerToETH } from './informer/to-eth/auto-mode';

import { app } from './app';

const productionPort = 25985;
const port = global.config.JSON_RPC_PORT ?? productionPort;

app
  .listen(port, async () => {
    console.log(`Started on PORT ${port}`);
    console.log('Press [control]+[c] to stop');

    InformerToESN();
    InformerToETH();
    await findAndConnectPeers();
    setInterval(findAndConnectPeers, 10000);
    setInterval(global.peerList.clearGarbagePeers.bind(global.peerList), 10000);
  })
  .on('error', (error) => {
    if (port === productionPort) {
      throw error;
    } else {
      // keep the process from terminating (for the test cases to run while active development)
      process.stdin.resume();
    }
  });

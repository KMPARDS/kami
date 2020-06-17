// load the .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

// setup global configurations
import './global';
global.consoleLog('global.config', global.config);

import { createRoutine } from './routine';
import { findAndConnectPeers } from './peers/routine';
import { informerToESN } from './informer/to-esn/routine';
import { informerToETH } from './informer/to-eth/routine';

import { app } from './app';

const productionPort = 25985;
const port = global.config.JSON_RPC_PORT ?? productionPort;

app
  .listen(port, async () => {
    console.log(`Started on PORT ${port}`);
    console.log('Press [control]+[c] to stop');

    createRoutine(informerToESN, 8000, 'InformerToESN');
    createRoutine(informerToETH, 10000, 'InformerToETH');
    createRoutine(findAndConnectPeers, 10000, 'FindAndConnectPeers');
    createRoutine(
      global.peerList.clearGarbagePeers.bind(global.peerList),
      5000,
      'ClearGarbagePeers'
    );
  })
  .on('error', (error) => {
    if (port === productionPort) {
      throw error;
    } else {
      // keep the process from terminating (for the test cases to run while active development)
      process.stdin.resume();
    }
  });

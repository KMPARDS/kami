// load the .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

// setup global configurations
import './global';
global.consoleLog('global.config', global.config);

import './peers';

import { app } from './app';

const productionPort = 25985;
const port = global.config.JSON_RPC_PORT ?? productionPort;

app
  .listen(port, () => {
    console.log(`Started on PORT ${port}`);
    console.log('Press [control]+[c] to stop');
  })
  .on('error', (error) => {
    if (port === productionPort) {
      throw error;
    } else {
      // keep the process from terminating (for the test cases to run while active development)
      process.stdin.resume();
    }
  });

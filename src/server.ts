// load the .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

// setup global configurations
import './global';

import { app } from './app';

const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? 25985 : 15985;

app
  .listen(port, () => {
    console.log(
      `Started ${isProduction ? 'mainnet' : 'testnet'} on PORT ${port}`
    );
    console.log('Press [control]+[c] to stop');
  })
  .on('error', (error) => {
    if (isProduction) {
      throw error;
    } else {
      // keep the process from terminating (for the test cases to run while active development)
      process.stdin.resume();
    }
  });

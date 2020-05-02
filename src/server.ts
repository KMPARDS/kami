// load the .env file into process.env
import dotenv from 'dotenv';
dotenv.config();

// setup global configurations
import './global';

import { app } from './app';

const isMainnet = process.env.NODE_ENV === 'production';
const port = isMainnet ? 25985 : 15985;

app.listen(port, () => {
  console.log(`Started ${isMainnet ? 'mainnet' : 'testnet'} on PORT ${port}`);
  console.log('Press [control]+[c] to stop');
});

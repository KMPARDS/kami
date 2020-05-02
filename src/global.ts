import { ethers } from 'ethers';

const providerEsn: ethers.providers.JsonRpcProvider = new ethers.providers.JsonRpcProvider(
  process.env.ESN_URL
);

global.providerEsn = providerEsn;

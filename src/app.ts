import express from 'express';
import { ethers } from 'ethers';
import { fetchBlocks } from './utils/provider';
import { router as bunchRootRouter } from './bunch-roots/controller';

export const app = express();

app.get('/hello', (req, res) => {
  res.json({
    version: require('../package.json').version,
    env: process.env.NODE_ENV,
  });
});

app.use('/bunch-roots', bunchRootRouter);

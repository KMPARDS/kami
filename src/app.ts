import express from 'express';
import bodyParser from 'body-parser';
import { ethers } from 'ethers';
import { fetchBlocks } from './utils/provider';
import { router as jsonRpcRouter } from './json-rpc';

export const app = express();

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.json({
    version: require('../package.json').version,
    env: process.env.NODE_ENV,
  });
});

app.use('/json-rpc', jsonRpcRouter);

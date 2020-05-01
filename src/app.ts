import express from 'express';
import { ethers } from 'ethers';
import { fetchBlocks } from './utils/provider';

export const app = express();

app.get('/hello', (req, res) => {
  res.json({
    version: require('../package.json').version,
    env: process.env.NODE_ENV,
  });
});

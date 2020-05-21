// TODO remove dependency of express js
import express from 'express';
import bodyParser from 'body-parser';
import { router as jsonRpcRouter } from './json-rpc';

export const app = express();

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.json({
    version: require('../package.json').version,
    env: process.env.NODE_ENV,
  });
});

app.use('/', jsonRpcRouter);

import { Bytes32, Address } from '../utils/bytes';
import { URL } from '../utils/url';

export interface Peer {
  connectionUrl: string;
  connectionId: Bytes32;
  nonce: number;
  connectedTimestamp: number;
  lastTalkTimestamp: number;
  walletAddress: Address;
  seats: number;
}

// check if any initial peers are given in the file
import fs from 'fs';
// console.log(global);

if (typeof global.config.SEED_PEER_PATH === 'string') {
  const seedPeersContent: string = fs.readFileSync(
    global.config.SEED_PEER_PATH,
    'utf8'
  );

  const urls = seedPeersContent
    .replace(/\s/g, '')
    .split('\n')
    .map((rawUrl) => new URL(rawUrl));

  console.log(urls);
}

// make a connect function which exchanges messages and both add each other as Peers
// make a method to fetch peers

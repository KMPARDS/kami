import { Bytes32, Address } from '../utils/bytes';
import { URL } from '../utils/url';
import { performPeerHandshake } from './peer-request';

// check if any initial peers are given in the file
import fs from 'fs';

if (typeof global.config.SEED_PEER_PATH === 'string') {
  const seedPeersContent: string = fs.readFileSync(
    global.config.SEED_PEER_PATH,
    'utf8'
  );

  const urls = seedPeersContent
    .replace(/\s/g, '')
    .split('\n')
    .map((rawUrl) => new URL(rawUrl));

  urls.forEach(async (url) => {
    try {
      await performPeerHandshake(url);
    } catch (err) {
      console.log(`Error connecting to peer: ${url.toString()}`, err.message);
    }
  });
}

// make a connect function which exchanges messages and both add each other as Peers
// make a method to fetch peers

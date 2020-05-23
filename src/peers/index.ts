import { Bytes32, Address } from '../utils/bytes';
import { URLMask } from '../utils/url';
import { startPeerHandshake } from './peer-handshake';

// check if any initial peers are given in the file
import fs from 'fs';

export * from './methods';
export * from './peer';
export * from './peer-list';
export * from './peers-of-peers';

export async function connectSeedPeers(): Promise<void> {
  if (typeof global.config.SEED_PEER_PATH === 'string') {
    const seedPeersContent: string = fs.readFileSync(
      global.config.SEED_PEER_PATH,
      'utf8'
    );

    const urls = seedPeersContent
      .replace(/\s/g, '')
      .split('\n')
      .map((rawUrl) => new URLMask(rawUrl));

    await Promise.all(
      urls.map(async (url) => {
        try {
          await startPeerHandshake(url);
        } catch (err) {
          global.consoleLog(
            `Error connecting to peer: ${url.toString()}`,
            err.message
          );
        }
      })
    );
  }
}

// make a connect function which exchanges messages and both add each other as Peers
// make a method to fetch peers

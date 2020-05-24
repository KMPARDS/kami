import fs from 'fs';
import { URLMask } from '../utils/url';
import { startPeerHandshake } from './peer-handshake';

// check if any initial peers are given in the file
export function getSeedPeersUrls(): URLMask[] {
  if (typeof global.config.SEED_PEER_PATH === 'string') {
    const seedPeersContent: string = fs.readFileSync(
      global.config.SEED_PEER_PATH,
      'utf8'
    );

    if (seedPeersContent) {
      const urls = seedPeersContent
        .replace(/\s/g, '')
        .split('\n')
        .map((rawUrl) => new URLMask(rawUrl));

      return urls;
    }
  }

  return [];
}

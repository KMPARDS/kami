import { Peer } from '../../peers/peer-request';

export function listPeers(): Peer[] {
  return global.peers;
}

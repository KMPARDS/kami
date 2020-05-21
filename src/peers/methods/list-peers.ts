import { Peer } from '../peer';

export function listPeers(): Peer[] {
  return global.peerList.getPeers();
}

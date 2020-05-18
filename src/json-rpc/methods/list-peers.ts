import { Peer } from '../../peers/peer-request';

export function listPeers(): Peer[] {
  console.log({ peers: global.peers });

  return global.peers;
}

import { Peer } from './peer';
// @TODO move bytes.ts to a commons directory
import { Address, Bytes32 } from '../utils/bytes';

export class PeerList {
  peers: Peer[];

  constructor() {
    this.peers = [];
  }

  getPeers(): Peer[] {
    return this.peers;
  }

  getTrustedPeers(): Peer[] {
    return this.peers.filter((peer) => peer.trusted);
  }

  getPeerByAddress(address: Address): Peer | null {
    return (
      this.peers.find((peer) => {
        if (peer.walletAddress === null) return false;
        return peer.walletAddress.eq(address);
      }) || null
    );
  }

  getPeerByConnectionId(id: Bytes32): Peer | null {
    return this.peers.find((peer) => peer.connectionId.eq(id)) || null;
  }

  add(peer: Peer): boolean {
    if (this.peers.length >= 1000) {
      return false;
    }
    this.peers.push(peer);
    return true;
  }

  remove(peer: Peer): boolean {
    const index = this.peers.indexOf(peer);
    if (index > -1) {
      this.peers.splice(index, 1);
      return true;
    }
    return false;
  }
}

import { Peer } from './peer';
// @TODO move bytes.ts to a commons directory
import { Address, Bytes32 } from '../utils/bytes';
import { URLMask } from '../utils/url';
import { getLocalExternalIP } from '../utils/ip';

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

  getPeersByAddress(address: Address): Peer[] {
    return (
      this.peers.filter((peer) => {
        if (peer.walletAddress === null) return false;
        return peer.walletAddress.eq(address);
      }) || null
    );
  }

  getPeerByConnectionId(id: Bytes32): Peer | null {
    return this.peers.find((peer) => peer.connectionId.eq(id)) || null;
  }

  getPeersByConnectionId(id: Bytes32): Peer[] {
    return this.peers.filter((peer) => peer.connectionId.eq(id));
  }

  getPeerByConnectionUrl(url: URLMask): Peer | null {
    return this.peers.find((peer) => peer.connectionUrl.eq(url)) || null;
  }

  getPeersByConnectionUrl(url: URLMask): Peer[] {
    return this.peers.filter((peer) => peer.connectionUrl.eq(url));
  }

  getSimilarExistingPeerIfExists(peer: Peer): Peer | null {
    return (
      this.getPeerByConnectionId(peer.connectionId) ||
      this.getPeerByConnectionUrl(peer.connectionUrl) ||
      (peer.walletAddress ? this.getPeerByAddress(peer.walletAddress) : null)
    );
  }

  // TODO: refactor the function return signature
  // @return Peer if added or updated, null if not added
  // @return string if Error message, null if no error
  add(newPeer: Peer): [Peer | null, string | null] {
    const selfPort = global.config.JSON_RPC_PORT;
    const isAddingSelf =
      newPeer.connectionUrl.eq(`http://localhost:${selfPort}`) ||
      newPeer.connectionUrl.eq(`http://127.0.0.1:${selfPort}`) ||
      newPeer.connectionUrl.eq(`http://${getLocalExternalIP()}:${selfPort}`);
    if (this.peers.length >= 1000 || isAddingSelf) {
      return [null, 'cannot add self'];
    }

    const existingPeer = this.getSimilarExistingPeerIfExists(newPeer);

    if (existingPeer) {
      existingPeer.updateConnection(newPeer);
      return [existingPeer, 'updated existing peer'];
    }

    this.peers.push(newPeer);
    return [newPeer, null];
  }

  remove(peer: Peer): boolean {
    const index = this.peers.indexOf(peer);
    if (index > -1) {
      this.peers.splice(index, 1);
      return true;
    }
    return false;
  }

  clearGarbagePeers(): void {
    const keepOnlyLastPeer = (samePeers: Peer[]) => {
      // TODO: make it latest by last talk date comparison instead of last array element
      if (samePeers.length > 1) {
        for (let i = 0; i < samePeers.length - 1; i++) {
          this.remove(samePeers[i]);
        }
      }
    };

    // clearing duplicate peers
    this.getPeers().forEach((peer) => {
      if (peer.walletAddress) {
        const sameAddressPeers = this.getPeersByAddress(peer.walletAddress);
        keepOnlyLastPeer(sameAddressPeers);
      }

      const sameUrlPeers = this.getPeersByConnectionUrl(peer.connectionUrl);
      keepOnlyLastPeer(sameUrlPeers);

      const sameIdPeers = this.getPeersByConnectionId(peer.connectionId);
      keepOnlyLastPeer(sameIdPeers);
    });

    // TODO: ping each peer, the ones that give ID error, handshake with them again
  }
}

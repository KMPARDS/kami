import { Bytes32, Address } from '../utils/bytes';
// @TODO: remove the custom made URL Class and use default JavaScript URL class class
import { URL } from '../utils/url';

export class Peer {
  connectionUrl: URL;
  connectionId: Bytes32;
  trusted: boolean;
  reqNonce: number;
  checkNonce: number;
  connected: Date;
  lastTalk: Date;
  walletAddress: Address | null = null;
  seats: number | null = null;

  constructor(url: URL, connectionId: Bytes32) {
    this.connectionUrl = url;
    this.connectionId = connectionId;
    this.trusted = false;
    this.reqNonce = 0;
    this.checkNonce = 0;
    this.connected = new Date();
    this.lastTalk = new Date();
    this.walletAddress = null;
    this.seats = null;
  }

  updateTrustStatus(newTrustStatus: boolean): void {
    this.trusted = newTrustStatus;
  }

  updateConnection(peer: Peer): void {
    this.connectionUrl = peer.connectionUrl;
    this.connectionId = peer.connectionId;
    this.lastTalk = peer.lastTalk;
    this.reqNonce = 0;
    this.checkNonce = 0;
  }
}

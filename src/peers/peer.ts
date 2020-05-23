import { ethers } from 'ethers';
import { Bytes32, Address } from '../utils/bytes';
import { URLMask } from '../utils/url';
import {
  JsonSuccessResponse,
  JsonErrorResponse,
  JsonRequest,
} from '../json-rpc';
import { hexlifyObject } from '../json-rpc/parser';
import { serializeJson } from '../utils/serialize-json';
import { signData } from '../utils/sign';

export class Peer {
  connectionUrl: URLMask;
  connectionId: Bytes32;
  trusted: boolean;
  reqNonce: number;
  checkNonce: number;
  connected: Date;
  lastTalk: Date;
  walletAddress: Address | null = null;
  seats: number | null = null;

  constructor(url: URLMask, connectionId: Bytes32) {
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
    this.walletAddress = peer.walletAddress;
    // TODO: also refetcht the seats if wallet address is changing
  }

  async sendRequest(
    method: string,
    params: any[]
  ): Promise<JsonSuccessResponse | JsonErrorResponse | never> {
    const request: JsonRequest = {
      jsonrpc: '2.0',
      method,
      params,
      id: this.connectionId,
      nonce: this.reqNonce++,
    };

    const serialized = serializeJson(request);
    request.signature = signData(serialized, global.wallet);

    const response:
      | JsonSuccessResponse
      | JsonErrorResponse = await ethers.utils.fetchJson(
      this.connectionUrl.toString(),
      JSON.stringify(hexlifyObject(request))
    );
    return response;
  }
}

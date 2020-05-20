import { ethers } from 'ethers';
import { Request } from 'express';
import { JsonRequest, JsonSuccessResponse } from '../json-rpc';
import { Bytes, Bytes32, Address, Signature } from '../utils/bytes';
import { URL } from '../utils/url';
import { getLocalExternalIP } from '../utils/ip';
import { t, validate, validateParam } from '../type-validation';
import { signData, recoverAddress } from '../utils/sign';
import { serializeJson } from '../utils/serialize-json';
import { hexlifyObject } from '../json-rpc/parser';

export class Peer {
  connectionUrl: URL;
  connectionId: Bytes32;
  verified: boolean;
  nonce: number;
  connected: Date;
  lastTalk: Date;
  walletAddress: Address | null = null;
  seats: number | null = null;

  constructor(url: URL, connectionId: Bytes32) {
    this.connectionUrl = url;
    this.connectionId = connectionId;
    this.verified = false;
    this.nonce = 0;
    this.connected = new Date();
    this.lastTalk = new Date();
    this.walletAddress = null;
    this.seats = null;
  }

  updateConnection(peer: Peer): void {
    this.connectionUrl = peer.connectionUrl;
    this.connectionId = peer.connectionId;
    this.lastTalk = peer.lastTalk;
  }
}

function generatePeerRequest(): JsonRequest {
  const ip = getLocalExternalIP();
  return {
    jsonrpc: '2.0',
    method: 'kami_peerInit',
    params: [
      new Bytes(ethers.utils.randomBytes(16)).hex(),
      ip ? `http://${ip}:${global.config.JSON_RPC_PORT}` : null,
    ],
    id: null,
  };
}

export async function requestPeerInit(url: URL): Promise<void | never> {
  console.log('hi45346');

  // request an id
  const response = await ethers.utils.fetchJson(
    url.toString(),
    JSON.stringify(hexlifyObject(generatePeerRequest()))
  );

  console.log('response of peer init', response);

  // once id is received, create a new request and sign it and send it with nonce 0
  if (!('result' in response)) {
    throw new Error(response.error);
  }

  validate(response.result, t.array);

  const [connectionId, verified]: [string, boolean] = response.result;

  validateParam({ connectionId }, t.hex32);
  validateParam({ verified }, t.boolean);

  const peer: Peer = new Peer(url, new Bytes32(connectionId));

  global.peers.push(peer);

  const validationRequest: JsonRequest = {
    jsonrpc: '2.0',
    method: 'kami_peerValidate',
    params: [],
    id: peer.connectionId,
    nonce: peer.nonce,
  };

  const serializedRequest = serializeJson(validationRequest);
  const signature = signData(serializedRequest, global.wallet);

  validationRequest.signature = signature;

  console.log(
    'validation request',
    validationRequest,
    hexlifyObject(validationRequest)
  );
  {
    const response = await ethers.utils.fetchJson(
      url.toString(),
      JSON.stringify(hexlifyObject(validationRequest))
    );

    console.log('received response of peerValidate', response);

    // check the signature in the response
  }
}

export function peerInit(
  peerRandomHex: string,
  urlStr: string,
  request: JsonRequest,
  req: Request
): [Bytes32, boolean] {
  const urls = [];
  try {
    const url = new URL(urlStr);
    urls.push(url);
  } catch {}
  try {
    const url = new URL(req.connection.remoteAddress ?? '');
    urls.push(url);
  } catch {}
  if (urls.length === 0) {
    throw new Error('No valid URL');
  }

  const peerRandomBytes = new Bytes(peerRandomHex, 16);
  const selfRandomBytes = new Bytes(ethers.utils.randomBytes(16));
  const connectionId = selfRandomBytes.concat(peerRandomBytes).toBytes32();

  const peer: Peer = new Peer(urls[0], connectionId);
  global.peers.push(peer);

  // console.log(global.peers);

  return [peer.connectionId, peer.verified];
}

export function peerValidate(request: JsonRequest, req: Request): boolean {
  if (!request.id) {
    throw new Error('id is required');
  }
  if (!request.signature) {
    throw new Error('signature is required for handshake validation');
  }
  // @ts-ignore https://github.com/microsoft/TypeScript/issues/38636
  let peer = global.peers.find((peer) => peer.connectionId.eq(request.id));
  if (!peer) {
    throw new Error('ConnectionId not found');
  }

  const preSignedRequest = { ...request };
  delete preSignedRequest.signature;
  const serializedRequest = serializeJson(preSignedRequest);
  console.log('serialized hexified', serializedRequest.hex());

  const address = recoverAddress(serializedRequest, request.signature);
  console.log('address detected', address.hex());
  peer.walletAddress = address;

  const existingPeer = global.peers.find((peer) => {
    if (!peer.walletAddress) return false;
    return peer.walletAddress.eq(address);
  });

  if (existingPeer) {
    existingPeer.updateConnection(peer);
    peer = existingPeer;
  }

  return true;
}

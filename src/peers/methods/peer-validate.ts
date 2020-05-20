import { Request } from 'express';
import { JsonRequest } from '../../json-rpc';
import { recoverAddress } from '../../utils/sign';
import { serializeJson } from '../../utils/serialize-json';

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

  const address = recoverAddress(serializedRequest, request.signature);
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

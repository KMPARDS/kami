import { Request } from 'express';
import { JsonRequest } from '../../json-rpc';
import { recoverAddressFromSignedJson } from '../../utils/sign';
import { serializeJson } from '../../utils/serialize-json';

export function peerValidate(request: JsonRequest, req: Request): boolean {
  if (!request.id) {
    throw new Error('id is required');
  }
  if (!request.signature) {
    throw new Error('signature is required for handshake validation');
  }
  // @ts-ignore https://github.com/microsoft/TypeScript/issues/38636
  let peer = global.peerList.getPeerByConnectionId(request.id);

  if (!peer) {
    throw new Error('ConnectionId not found');
  }

  const address = recoverAddressFromSignedJson(request);

  const existingPeer = global.peerList.getPeerByAddress(address);

  if (existingPeer) {
    existingPeer.updateConnection(peer);
    peer = existingPeer;
  }

  peer.walletAddress = address;

  // TODO: check for enough stakes / seats and trust the wallet address
  if (true) {
    peer.trusted = true;
  }

  return true;
}

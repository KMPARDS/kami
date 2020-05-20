import { ethers } from 'ethers';
import { Request } from 'express';
import { JsonRequest } from '../../json-rpc';
import { Bytes, Bytes32 } from '../../utils/bytes';
import { Peer } from '../peer';
import { URL } from '../../utils/url';

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

  return [peer.connectionId, peer.verified];
}

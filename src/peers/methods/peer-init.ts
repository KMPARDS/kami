import { ethers } from 'ethers';
import { Request } from 'express';
import { JsonRequest } from '../../json-rpc';
import { Bytes, Bytes32 } from '../../utils/bytes';
import { Peer } from '../peer';
import { URLMask } from '../../utils/url';
import { validateParam, check, t } from '../../type-validation';

export function peerInit(
  peerRandomHex: string,
  port: number,
  request: JsonRequest,
  req: Request
): [Bytes32, boolean] {
  validateParam({ peerRandomHex }, t.hex16);
  if (!check(port, t.number)) {
    throw new Error('PORT parameter is not passed');
  }
  validateParam({ port }, t.uint);

  let url: URLMask;

  // TODO: add ipv6 support
  const ipv6split = req.connection.remoteAddress?.split(':');
  if (!ipv6split) {
    throw new Error('IP not present');
  }

  try {
    url = new URLMask(`http://${ipv6split[ipv6split.length - 1]}`);

    url.url.port = String(port);
  } catch (error) {
    global.consoleLog('Invalid remoteAddress', req.connection.remoteAddress);
    throw new Error(`Unsupported IP: ${req.connection.remoteAddress}`);
  }

  const peerRandomBytes = new Bytes(peerRandomHex, 16);
  const selfRandomBytes = new Bytes(ethers.utils.randomBytes(16));
  const connectionId = selfRandomBytes.concat(peerRandomBytes).toBytes32();

  const peer: Peer = new Peer(url, connectionId);
  const [, isAdded] = global.peerList.add(peer);

  return [peer.connectionId, !!isAdded];
}

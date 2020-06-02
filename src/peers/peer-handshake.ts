import { ethers } from 'ethers';
import { JsonRequest } from '../json-rpc';
import { Bytes, Bytes32 } from '../utils/bytes';
import { URLMask } from '../utils/url';
import { getLocalExternalIP } from '../utils/ip';
import { t, validate, validateParam } from '../type-validation';
import { signKamiData, recoverAddressFromSignedJson } from '../utils/sign';
import { serializeJson } from '../utils/serialize-json';
import { hexlifyObject } from '../json-rpc/parser';
import { Peer } from './peer';

function generatePeerRequest(): JsonRequest {
  return {
    jsonrpc: '2.0',
    method: 'kami_peerInit',
    params: [
      new Bytes(ethers.utils.randomBytes(16)).hex(),
      global.config.JSON_RPC_PORT,
    ],
    id: null,
  };
}

export async function startPeerHandshake(url: URLMask): Promise<void | never> {
  // request an id
  const response = await ethers.utils.fetchJson(
    url.toString(),
    JSON.stringify(hexlifyObject(generatePeerRequest()))
  );

  // once id is received, create a new request and sign it and send it with nonce 0
  if (!('result' in response)) {
    throw new Error(response.error);
  }

  validate(response.result, t.array);

  const [connectionId, verified]: [string, boolean] = response.result;

  validateParam({ connectionId }, t.hex32);
  validateParam({ verified }, t.boolean);

  const peer: Peer = new Peer(url, new Bytes32(connectionId));

  global.consoleLog(
    `${getLocalExternalIP()}:${global.config.JSON_RPC_PORT} trying to add peer`,
    'newpeer:',
    peer.connectionUrl.toString(),
    global.peerList.getPeers().map((p) => p.connectionUrl.toString())
  );
  const [, errStr] = global.peerList.add(peer);
  if (errStr) {
    throw new Error(errStr);
  }
  if (errStr) global.consoleLog('Note while adding peer to list', errStr);

  const validationRequest: JsonRequest = {
    jsonrpc: '2.0',
    method: 'kami_peerValidate',
    params: [],
    id: peer.connectionId,
    nonce: peer.reqNonce++,
  };

  const serializedRequest = serializeJson(validationRequest);
  const signature = signKamiData(serializedRequest, global.wallet);

  validationRequest.signature = signature;

  {
    const response = await ethers.utils.fetchJson(
      url.toString(),
      JSON.stringify(hexlifyObject(validationRequest))
    );

    global.consoleLog('received response of peerValidate', response);

    // check the signature in the response
    const address = recoverAddressFromSignedJson(response);

    peer.walletAddress = address;
    // TODO: check for enough stakes / seats and trust the wallet address
    if (true) {
      peer.updateTrustStatus(true);
    }
  }
}

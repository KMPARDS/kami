import { Router, Request } from 'express';
import {
  JsonRequest,
  JsonErrorResponse,
  JsonSuccessResponse,
} from './interfaces';
import {
  INVALID_REQUEST,
  INVALID_PARAMS,
  INTERNAL_ERROR,
  SERVER_ERROR,
  NONCE_ERROR,
  ID_ERROR,
  SIGNATURE_ERROR,
} from './errors';
import { parseRequest, hexlifyObject } from './parser';
import { methods } from './methods';
import { serializeJson } from '../utils/serialize-json';
import { signData, recoverAddressFromSignedJson } from '../utils/sign';
import { ethers } from 'ethers';
import { Bytes32, Address, Bytes } from '../utils/bytes';
import { Peer } from '../peers';
import { check, t } from '../type-validation';

export const router = Router();

router.post('/', async (req, res) => {
  let previousHash: Bytes32 | null = null;
  let peer: Peer | null = null;
  try {
    const request = parseRequest(req.body);
    global.consoleLog('JSON RPC ReQuest', request);
    if (request.id) {
      peer = global.peerList.getPeerByConnectionId(request.id);
      if (!peer) {
        throw {
          ...ID_ERROR,
          data: `Id ${request.id.hex()} is not registered here. Please either use null as id or perform a peer handshake`,
        };
      }

      if (request.nonce === undefined) {
        throw {
          ...NONCE_ERROR,
          data: `Nonce is not set`,
        };
      }

      if (request.nonce < peer.checkNonce) {
        throw {
          ...NONCE_ERROR,
          data: `Nonce used should not be smaller than: ${peer.checkNonce}`,
        };
      }

      // if wallet address of peer is set (not set before handshake completion)
      if (peer.walletAddress) {
        const address = recoverAddressFromSignedJson(request);
        if (!peer.walletAddress.eq(address)) {
          throw { ...SIGNATURE_ERROR, data: `Signature mismatch` };
        }
      }

      peer.checkNonce = Math.max(peer.checkNonce + 1, request.nonce + 1);
    }
    previousHash = new Bytes32(
      ethers.utils.keccak256(serializeJson(request).data)
    );
    try {
      const result = await methods(request.method)(
        ...request.params,
        request,
        req
      );
      const response: JsonSuccessResponse = {
        jsonrpc: '2.0',
        previousHash,
        result: result,
        id: request.id,
      };

      if (request.id !== null) {
        response.nonce = request.nonce;

        const serializedResponse: Bytes = serializeJson(response);
        response.signature = signData(serializedResponse, global.wallet);
      }
      global.consoleLog('JSON RPC ReSponse', response);

      res.json(hexlifyObject(response));
    } catch (error) {
      if (error instanceof TypeError) {
        throw { ...INVALID_PARAMS, data: error.message };
      } else if (error instanceof Error) {
        throw { ...SERVER_ERROR, data: error.message };
      } else if ('code' in error) {
        throw error;
      } else {
        throw { ...INTERNAL_ERROR, data: error.message };
      }
    }
  } catch (error) {
    const response: JsonErrorResponse = {
      jsonrpc: '2.0',
      error,
      id: peer?.connectionId || null,
    };

    if (previousHash) {
      response.previousHash = previousHash;
    }

    global.consoleLog('JSON RPC Error Response', response);
    res.json(hexlifyObject(response));
  }
});

import { Router } from 'express';
import {
  JsonRequest,
  JsonErrorResponse,
  JsonSuccessResponse,
} from './interfaces';
import { INVALID_REQUEST, INVALID_PARAMS, INTERNAL_ERROR } from './errors';
import { parseRequest, hexlifyObject } from './parser';
import { methods } from './methods';
import { serializeJson } from '../utils/serialize-json';
import { signData } from '../utils/sign';
import { ethers } from 'ethers';
import { Bytes32 } from '../utils/bytes';

export const router = Router();

router.post('/', async (req, res) => {
  let previousHash: Bytes32 | null = null;
  let connectionId: Bytes32 | null = null;
  try {
    const request = parseRequest(req.body);
    global.consoleLog('JSON RPC ReQuest', request);
    if (request.id) {
      connectionId = request.id;
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

      global.consoleLog('JSON RPC ReSponse', response);

      res.json(hexlifyObject(response));
    } catch (error) {
      if (error instanceof TypeError) {
        throw { ...INVALID_PARAMS, data: error.message };
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
      id: connectionId,
    };

    if (previousHash) {
      response.previousHash = previousHash;
    }

    global.consoleLog('JSON RPC Error Response', response);
    res.json(hexlifyObject(response));
  }
});

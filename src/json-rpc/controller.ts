import { Router } from 'express';
import {
  JsonRequest,
  JsonErrorResponse,
  JsonSuccessResponse,
} from './interfaces';
import { INVALID_REQUEST, INVALID_PARAMS, INTERNAL_ERROR } from './errors';
import { parseRequest, hexlifyObject } from './parser';
import { methods } from './methods';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const request = parseRequest(req.body);
    global.consoleLog('JSON RPC ReQuest', request);

    try {
      const result = await methods(request.method)(...request.params);
      global.consoleLog('JSON RPC ReSponse', result);
      const response: JsonSuccessResponse = {
        jsonrpc: '2.0',
        result: hexlifyObject(result),
        id: req.body?.id,
        signature: null,
      };
      res.json(response);
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
    global.consoleLog('JSON RPC Error', error);

    const response: JsonErrorResponse = {
      jsonrpc: '2.0',
      error,
      id: req.body?.id,
      signature: null,
    };
    res.json(response);
  }
});

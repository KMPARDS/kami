import { Router } from 'express';
import {
  JsonRequest,
  JsonErrorResponse,
  JsonSuccessResponse,
} from './interfaces';
import { INVALID_REQUEST, INVALID_PARAMS, INTERNAL_ERROR } from './errors';
import { parseRequest } from './parser';
import { methods } from './methods';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const request = parseRequest(req.body);

    try {
      const result = await methods(request.method)(...request.params);
      console.log(result);
      const response: JsonSuccessResponse = {
        jsonrpc: '2.0',
        result,
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
    console.log('catch err', error);

    const response: JsonErrorResponse = {
      jsonrpc: '2.0',
      error,
      id: req.body?.id,
      signature: null,
    };
    res.json(response);
  }
});

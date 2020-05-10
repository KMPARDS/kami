import { Router } from 'express';
import {
  JsonRequest,
  JsonErrorResponse,
  JsonSuccessResponse,
} from './interfaces';
import { INVALID_REQUEST, METHOD_NOT_FOUND } from './errors';
import { parseRequest } from './parser';
import { methods } from './methods';

export const router = Router();

router.post('/', async (req, res) => {
  try {
    const request = parseRequest(req.body);

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
    console.log(error);

    const response: JsonErrorResponse = {
      jsonrpc: '2.0',
      error,
      id: req.body?.id,
      signature: null,
    };
    res.json(response);
  }
});

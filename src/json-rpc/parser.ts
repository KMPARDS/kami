import { JsonRequest } from './interfaces';
import { INVALID_REQUEST, PARSE_ERROR } from './errors';
import { Bytes, Bytes32, Signature } from '../utils/bytes';

export function parseRequest(request: any): JsonRequest | never {
  if (
    !(
      typeof request === 'object' &&
      request.jsonrpc === '2.0' &&
      typeof request.method === 'string' &&
      ('params' in request ? Array.isArray(request.params) : true)
    )
  ) {
    throw INVALID_REQUEST;
  }

  let parsed: JsonRequest;

  try {
    parsed = {
      jsonrpc: '2.0',
      method: request.method,
      params: request.params ?? [],
      id: new Bytes32(request.id),
      signature: null,
    };

    if ('signature' in request) {
      parsed.signature = new Signature(request.signature);
    }
  } catch (error) {
    global.consoleLog(error);
    throw { ...PARSE_ERROR, data: error };
  }

  return parsed;
}

import { t, check } from '../type-validation';

export function hexlifyObject(input: any): any {
  if (check(input, t.byted)) {
    return input.hex();
  } else if (check(input, t.array)) {
    return input.map((child: any): any => hexlifyObject(child));
  } else if (check(input, t.object)) {
    let entries = Object.entries(input);
    entries = entries.map((entry: any) => {
      return [entry[0], hexlifyObject(entry[1])];
    });
    return entries.reduce((accum: any, [k, v]: any) => {
      accum[k] = v;
      return accum;
    }, {});
  } else {
    return input;
  }
}

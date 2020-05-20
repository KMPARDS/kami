import { JsonRequest } from './interfaces';
import { INVALID_REQUEST, PARSE_ERROR } from './errors';
import { Bytes, Bytes32, Signature } from '../utils/bytes';
import { t, check, validate, validateParam } from '../type-validation';
import { URL } from '../utils/url';

export function parseRequest(request: any): JsonRequest | never {
  try {
    validateParam({ request }, t.object);
  } catch (error) {
    throw { ...INVALID_REQUEST, data: error.message };
  }

  const { jsonrpc, method, params, id, nonce, signature } = request;
  let parsed: JsonRequest = {
    jsonrpc,
    method,
    params,
    id: null,
  };

  try {
    if (jsonrpc !== '2.0') {
      throw new Error('Invalid jsonrpc version');
    }
    validateParam({ method }, t.string);
    validateParam({ params }, t.array);

    if (request.id !== null) {
      validateParam({ id: request.id }, t.hex32);
      parsed = {
        ...request,
        id: request.id ? new Bytes32(request.id) : null,
      };
    }

    if ('nonce' in request) {
      validateParam({ nonce: request.nonce }, t.uint);
      parsed.nonce = request.nonce;
    }

    if ('signature' in request) {
      parsed.signature = new Signature(request.signature);
    }
  } catch (error) {
    global.consoleLog('error while parsing request', error);
    throw { ...PARSE_ERROR, data: error.message };
  }

  return parsed;
}

export function hexlifyObject(input: any): any {
  if (check(input, t.byted)) {
    return input.hex();
  } else if (input instanceof URL) {
    return input.toString();
  } else if (input instanceof Date) {
    return input.toUTCString();
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

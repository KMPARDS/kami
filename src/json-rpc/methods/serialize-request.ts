import assert from 'assert';
import { JsonRequest } from '../interfaces';
import { serializeJson } from '../../utils/serialize-json';
import { Bytes } from '../../utils/bytes';
import { t, validate, validateMultiple } from '../../type-validation';

export function serializeRequest(...args: any[]): Bytes {
  let request: JsonRequest;
  let isRequestSet = false;
  let error: Error;

  for (const arg of args) {
    try {
      const { jsonrpc, method, params, id } = arg;
      assert.strictEqual(jsonrpc, '2.0');
      validate(method, t.string);
      validate(params, t.array);
      validateMultiple(id, [t.nullish, t.byted]);
      request = arg;
      isRequestSet = true;
      break;
    } catch (err) {
      error = err;
    }
  }

  if (!isRequestSet) {
    // @ts-ignore
    throw new Error('Invalid json request: ' + error?.message);
  }

  // @ts-ignore
  return serializeJson(request);
}

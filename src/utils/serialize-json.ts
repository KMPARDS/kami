import { ethers } from 'ethers';
import { Bytes, Bytes32 } from './bytes';
import { t, check } from '../type-validation';
import {
  JsonRequest,
  JsonSuccessResponse,
  JsonErrorResponse,
} from '../json-rpc/interfaces';

const toUtf8Bytes = (input: string) =>
  ethers.utils.hexlify(ethers.utils.toUtf8Bytes(input));
const toUtf8String = ethers.utils.toUtf8String;

export function serializeJson(obj: any): Bytes {
  return new Bytes(ethers.utils.RLP.encode(rlpizeObject(obj)));
}

export function deSerializeJson(input: string): any {
  const rlp = ethers.utils.RLP.decode(input);
  return deRlpizeByteArray(rlp);
}

export function rlpizeObject(input: any): any[] {
  if (input === null) {
    return [toUtf8Bytes('null')];
  } else if (check(input, t.byted)) {
    return [toUtf8Bytes('bytes'), input.hex()];
  } else if (check(input, t.hex)) {
    return [toUtf8Bytes('bytes'), input];
  } else if (check(input, t.number)) {
    return [toUtf8Bytes('number'), new Bytes(input).hex()];
  } else if (check(input, t.string)) {
    return [toUtf8Bytes('string'), toUtf8Bytes(input)];
  } else if (check(input, t.boolean)) {
    return [toUtf8Bytes('boolean'), input ? '0x01' : '0x00'];
  } else if (check(input, t.array)) {
    return [
      toUtf8Bytes('array'),
      input.map((child: any) => rlpizeObject(child)),
    ];
  } else if (check(input, t.object)) {
    const entries = Object.entries(input).sort(
      (e1: any[], e2: any[]): number => {
        return e1[0] > e2[0] ? 1 : -1;
      }
    );
    return [
      toUtf8Bytes('object'),
      entries.map((entry) => {
        return [toUtf8Bytes(entry[0]), rlpizeObject(entry[1])];
      }),
    ];
  }
  return [toUtf8Bytes('unknown')];
}

export function deRlpizeByteArray(input: any): any {
  let output: any;
  if (input[0] === toUtf8Bytes('object')) {
    output = {};
    input[1].forEach((entry: [string, string]) => {
      output[toUtf8String(entry[0])] = deRlpizeByteArray(entry[1]);
    });
  } else if (input[0] === toUtf8Bytes('array')) {
    output = [];
    input[1].forEach((entry: any) => {
      output.push(deRlpizeByteArray(entry));
    });
  } else if (input[0] === toUtf8Bytes('boolean')) {
    output = Boolean(+input[1]);
  } else if (input[0] === toUtf8Bytes('string')) {
    output = toUtf8String(input[1]);
  } else if (input[0] === toUtf8Bytes('number')) {
    output = new Bytes(input[1]).number();
  } else if (input[0] === toUtf8Bytes('bytes')) {
    output = new Bytes(input[1]);
  } else if (input[0] === toUtf8Bytes('null')) {
    output = null;
  }
  return output;
}

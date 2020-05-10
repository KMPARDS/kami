import { Type } from './';

export const string: Type = {
  name: 'string',
  check: (input: string): boolean => {
    return typeof input === 'string';
  },
};

export const hex: Type = {
  name: 'hex',
  check: (input: string): boolean => {
    if (!string.check(input) || input.slice(0, 2) !== '0x') return false;
    return /^[A-F0-9]+$/i.test(input.slice(2));
  },
};

export const number: Type = {
  name: 'number',
  check: (input: number): boolean => {
    return typeof input === 'number' && !isNaN(input);
  },
};

export const int: Type = {
  name: 'int',
  check: (input: number): boolean => {
    return Number.isInteger(input);
  },
};

export const uint: Type = {
  name: 'uint',
  check: (input: number): boolean => {
    return Number.isInteger(input) && input >= 0;
  },
};

export const array: Type = {
  name: 'Array',
  check: (input: any[]): boolean => {
    return input instanceof Array;
  },
};

export const object: Type = {
  name: 'object',
  check: (input: Object): boolean => {
    return typeof input === 'object';
  },
};

export const functionObject: Type = {
  name: 'function',
  check: (input: Function): boolean => {
    return input instanceof Function;
  },
};

import { Byted } from '../utils/bytes';

export const bytes: Type = {
  name: 'bytes',
  check: (input: Byted): boolean => {
    return (
      typeof input === 'object' &&
      input.data instanceof Uint8Array &&
      functionObject.check(input.hex) &&
      hex.check(input.hex()) &&
      functionObject.check(input.number) &&
      number.check(input.number())
    );
  },
};

import { Type } from './';

export const string: Type = {
  name: 'string',
  check: (input: string): true | never => {
    if (typeof input !== 'string') {
      throw new Error('not a string value');
    } else {
      return true;
    }
  },
};

export const hex: Type = {
  name: 'hex',
  check: (input: string): true | never => {
    string.check(input);
    if (input.slice(0, 2) !== '0x') {
      throw new Error('hex string must have 0x prefix');
    } else if (!/^[A-F0-9]+$/i.test(input.slice(2))) {
      throw new Error('invalid hex string');
    } else {
      return true;
    }
  },
};

export const number: Type = {
  name: 'number',
  check: (input: number): true | never => {
    if (typeof input !== 'number') {
      throw new Error('not a number value');
    } else if (isNaN(input)) {
      throw new Error('is a NaN value');
    } else {
      return true;
    }
  },
};

export const int: Type = {
  name: 'int',
  check: (input: number): true | never => {
    number.check(input);
    if (!Number.isInteger(input)) {
      throw new Error('not a int value');
    } else {
      return true;
    }
  },
};

export const uint: Type = {
  name: 'uint',
  check: (input: number): true | never => {
    int.check(input);
    if (input < 0) {
      throw new Error('not a positive number');
    } else {
      return true;
    }
  },
};

export const array: Type = {
  name: 'Array',
  check: (input: any[]): true | never => {
    if (!(input instanceof Array)) {
      throw new Error('not an instance of Array');
    } else {
      return true;
    }
  },
};

export const uint8array: Type = {
  name: 'Uint8Array',
  check: (input: Uint8Array): true | never => {
    if (!(input instanceof Uint8Array)) {
      throw new Error('not an Uint8Array instance');
    } else {
      return true;
    }
  },
};

export const object: Type = {
  name: 'object',
  check: (input: Object): true | never => {
    if (typeof input !== 'object') {
      throw new Error('not an object pointer');
    } else {
      return true;
    }
  },
};

export const functionObject: Type = {
  name: 'function',
  check: (input: Function): true | never => {
    if (!(input instanceof Function)) {
      throw new Error('not a function instance');
    } else {
      return true;
    }
  },
};

import { Byted } from '../utils/bytes';

export const byted: Type = {
  name: 'byted',
  check: (input: Byted): true | never => {
    object.check(input);
    uint8array.check(input.data);
    functionObject.check(input.hex);
    hex.check(input.hex());
    functionObject.check(input.number);
    number.check(input.number());

    return true;
  },
};

import { Type } from './';

export const string: Type = {
  name: 'string',
  validate: (input: string): true | never => {
    if (typeof input !== 'string') {
      throw new Error('not a string value');
    } else {
      return true;
    }
  },
};

export const hex: Type = {
  name: 'hex',
  validate: (input: string): true | never => {
    string.validate(input);
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
  validate: (input: number): true | never => {
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
  validate: (input: number): true | never => {
    number.validate(input);
    if (!Number.isInteger(input)) {
      throw new Error('not a int value');
    } else {
      return true;
    }
  },
};

export const uint: Type = {
  name: 'uint',
  validate: (input: number): true | never => {
    int.validate(input);
    if (input < 0) {
      throw new Error('not a positive number');
    } else {
      return true;
    }
  },
};

export const array: Type = {
  name: 'Array',
  validate: (input: any[]): true | never => {
    if (!(input instanceof Array)) {
      throw new Error('not an instance of Array');
    } else {
      return true;
    }
  },
};

export const uint8array: Type = {
  name: 'Uint8Array',
  validate: (input: Uint8Array): true | never => {
    if (!(input instanceof Uint8Array)) {
      throw new Error('not an Uint8Array instance');
    } else {
      return true;
    }
  },
};

export const object: Type = {
  name: 'object',
  validate: (input: Object): true | never => {
    if (typeof input !== 'object') {
      throw new Error('not an object pointer');
    } else {
      return true;
    }
  },
};

export const functionObject: Type = {
  name: 'function',
  validate: (input: Function): true | never => {
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
  validate: (input: Byted): true | never => {
    object.validate(input);
    uint8array.validate(input.data);
    functionObject.validate(input.hex);
    hex.validate(input.hex());
    functionObject.validate(input.number);
    number.validate(input.number());

    return true;
  },
};

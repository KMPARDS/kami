import { Type } from './';

export const nullish: Type = {
  name: 'null',
  validate: (input: null): true | never => {
    if (input !== null) {
      throw new Error('not an explicit null value');
    } else {
      return true;
    }
  },
};

export const boolean: Type = {
  name: 'boolean',
  validate: (input: boolean): true | never => {
    if (typeof input !== 'boolean') {
      throw new Error('not a boolean value');
    } else {
      return true;
    }
  },
};

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

export const hex16: Type = {
  name: 'hex16',
  validate: (input: string): true | never => {
    hex.validate(input);
    if (input.length !== 34) {
      throw new Error('bytes16 hex string should have 16 bytes / 34 length');
    } else {
      return true;
    }
  },
};

export const hex20: Type = {
  name: 'hex20',
  validate: (input: string): true | never => {
    hex.validate(input);
    if (input.length !== 42) {
      throw new Error('address hex string should have 20 bytes / 42 length');
    } else {
      return true;
    }
  },
};

export const hex32: Type = {
  name: 'hex32',
  validate: (input: string): true | never => {
    hex.validate(input);
    if (input.length !== 66) {
      throw new Error('bytes32 hex string should have 32 bytes / 66 length');
    } else {
      return true;
    }
  },
};

export const hex65: Type = {
  name: 'hex65',
  validate: (input: string): true | never => {
    hex.validate(input);
    if (input.length !== 132) {
      throw new Error('signature hex string should have 65 bytes / 132 length');
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

export const uint8: Type = {
  name: 'uint8',
  validate: (input: number): true | never => {
    uint.validate(input);
    if (input >= 256) {
      throw new Error(`the number ${input} is not in the range 0, 255`);
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
    if (typeof input !== 'object' || input === null) {
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
    // number.validate(input.number()); // casting of byted to number can result into an overflow error

    return true;
  },
};

import { Type } from './';

export const string: Type = {
  name: 'string',
  check: (input: string): boolean => {
    return typeof input === 'string';
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

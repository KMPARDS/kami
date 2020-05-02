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
    return typeof input === 'number';
  },
};

export const array: Type = {
  name: 'Array',
  check: (input: any[]): boolean => {
    return input instanceof Array;
  },
};

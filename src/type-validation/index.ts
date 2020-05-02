export interface Type {
  name: string;
  check(input: any): boolean;
}

export function check(value: any, type: Type): boolean {
  return type.check(value);
}

import { string } from './type-checkers';

export function validate(
  value: any,
  type: Type,
  errorHandler?: (error: TypeError) => any
): boolean | never {
  if (!check(value, type)) {
    const error = new TypeError(
      `${
        string.check(value) ? `"${value}"` : value
      } of type '${typeof value}' is an invalid value for expected type '${
        type.name
      }'`
    );
    if (errorHandler) {
      errorHandler(error);
      return false;
    } else {
      throw error;
    }
  }

  return true;
}

export * as t from './type-checkers';

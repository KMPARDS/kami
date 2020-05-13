export interface Type {
  name: string;
  validate(input: any): true | never;
}

export function check(value: any, type: Type): boolean {
  if (!type) {
    console.warn(
      `\n\n${'='.repeat(
        process.stdout.columns
      )}\nWarning: type is ${type}\n${'='.repeat(process.stdout.columns)}\n\n`
    );

    throw new Error(`type is ${type}`);
  }

  try {
    type.validate(value);
    return true;
  } catch (error) {
    return false;
  }
}

import { string, array } from './type-checkers';

export function validate(
  value: any,
  type: Type,
  errorHandler?: (error: TypeError) => any
): boolean | never {
  if (!type) {
    console.warn(
      `\n\n${'='.repeat(
        process.stdout.columns
      )}\nWarning: type is ${type}\n${'='.repeat(process.stdout.columns)}\n\n`
    );

    throw new Error(`type is ${type}`);
  }

  const insideError = (() => {
    try {
      type.validate(value);
      return null;
    } catch (error) {
      return error;
    }
  })();
  if (insideError) {
    const error = new TypeError(
      `${
        check(value, string) ? `"${value}"` : value
      } of type '${typeof value}' is an invalid value for expected type '${
        type.name
      }'. More information: ${insideError.message}`
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

export function validateMultiple(
  value: any,
  typeArray: Array<Type>,
  errorHandler?: (error: TypeError) => any
): boolean | never {
  validate(typeArray, array);

  let error: TypeError | null = null;
  for (const type of typeArray) {
    try {
      validate(value, type);
      error = null;
      break;
    } catch (err) {
      error = err;
    }
  }

  if (error) {
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

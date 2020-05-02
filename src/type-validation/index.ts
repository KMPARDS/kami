export interface Type {
  name: string;
  check(input: any): boolean;
}

export function check(value: any, type: Type): boolean {
  return type.check(value);
}

export function validate(value: any, type: Type): void | never {
  if (!check(value, type)) {
    throw new TypeError(
      `${value} (${typeof value}) is an invalid value of type ${type.name}`
    );
  }
}

export * as t from './type-checkers';

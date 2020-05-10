import { METHOD_NOT_FOUND } from './errors';
import { computeBunchProposal } from '../bunch-roots/helper';

export function methods(methodName: string): Function | never {
  console.log({ methodName });

  switch (methodName) {
    case 'kami_computeBunchProposal':
      return computeBunchProposal;
    default:
      throw METHOD_NOT_FOUND;
  }
}

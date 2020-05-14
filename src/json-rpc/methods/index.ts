import { METHOD_NOT_FOUND } from '../errors';
import { computeBunchProposal } from './compute-bunch-proposal';
import { signBunch } from './sign-bunch';

const _methods = {
  kami: {
    computeBunchProposal,
    signBunch,
  },
};

export function methods(methodName: string): Function | never {
  const partitioned = methodName.split('_');

  if (!(partitioned[0] in _methods))
    throw {
      ...METHOD_NOT_FOUND,
      data: `Group '${partitioned[0]}' does not exist`,
    };

  // @ts-ignore
  if (!(partitioned[1] in _methods[partitioned[0]]))
    throw {
      ...METHOD_NOT_FOUND,
      data: `Method '${partitioned[1]}' does not exist on Group '${partitioned[0]}'`,
    };

  // @ts-ignore
  return _methods[partitioned[0]][partitioned[1]];
}

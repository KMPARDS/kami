import { METHOD_NOT_FOUND } from '../errors';
import {
  computeBunchProposal,
  signBunch,
  initiateBunch,
} from '../../informer/to-eth/methods';
import { peerInit, peerValidate, listPeers } from '../../peers/methods';
import { serializeRequest } from './serialize-request';

const _methods = {
  kami: {
    peerInit,
    peerValidate,
    listPeers,
    serializeRequest,
  },
  informer: {
    computeBunchProposal,
    signBunch,
    initiateBunch,
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

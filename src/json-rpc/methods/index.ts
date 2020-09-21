import { METHOD_NOT_FOUND } from '../errors';
import {
  computeBunchProposal,
  signBunch,
  initiateBunch,
} from '../../informer/to-eth/methods';
import {
  viewBlockProposal,
  sendBlockProposal,
} from '../../informer/to-esn/methods';
import { getBlockNumber, getPendingTransactions } from '../../blockc/methods';
import { peerInit, peerValidate, listPeers } from '../../peers/methods';
import { serializeRequest } from './serialize-request';
import { getAddress } from './get-address';
import { getSystemUtilisation } from './get-system-utilisation';

const _methods: {
  [key: string]: { [key: string]: Function | [Function, number] };
} = {
  kami: {
    getAddress,
    peerInit: [peerInit, 2],
    peerValidate: [peerValidate, 0],
    listPeers,
    serializeRequest: [serializeRequest, -1],
    getSystemUtilisation,
  },
  informer: {
    computeBunchProposal,
    signBunch,
    initiateBunch,
    viewBlockProposal,
    sendBlockProposal,
  },
  blockc: {
    getBlockNumber,
    getPendingTransactions,
  },
};

export function methods(
  methodName: string
): { method: Function; argsLength: number } | never {
  const partitioned = methodName.split('_');

  if (!(partitioned[0] in _methods))
    throw {
      ...METHOD_NOT_FOUND,
      data: `Group '${partitioned[0]}' does not exist`,
    };

  if (!(partitioned[1] in _methods[partitioned[0]]))
    throw {
      ...METHOD_NOT_FOUND,
      data: `Method '${partitioned[1]}' does not exist on Group '${partitioned[0]}'`,
    };

  let method = _methods[partitioned[0]][partitioned[1]];
  let argsLength = 0;

  if (method instanceof Array) {
    argsLength = method[1];
    method = method[0];
  } else {
    argsLength = method.length;
  }

  return { method, argsLength };
}

import { RequestParser } from './request-parser.test';
import { ComputeBunchProposal } from './compute-bunch-proposal.test';
import { SignBunchRPC } from './sign-bunch.test';
import { SerializeRequest } from './serialize-request.test';
import { Peers } from './peers.test';
import { PeerHandShake, PeerHandshakeWrong } from './peer-handshake.test';
import { SubmitBunch } from './submit-bunch.test';
import { BlockProposal } from './block-proposal.test';

export const JsonRpc = () =>
  describe('JSON-RPC', () => {
    RequestParser();
    ComputeBunchProposal();
    SignBunchRPC();
    SerializeRequest();
    Peers();
    PeerHandShake();
    PeerHandshakeWrong();
    SubmitBunch();
    BlockProposal();
  });

import { ComputeBunchProposal } from './compute-bunch-proposal.test';
import { SignBunchRPC } from './sign-bunch.test';
import { SerializeRequest } from './serialize-request.test';
import { Peers } from './peers.test';
import { PeerHandShake, PeerHandshakeWrong } from './peer-handshake.test';
export const JsonRpc = () =>
  describe('JSON-RPC', () => {
    ComputeBunchProposal();
    SignBunchRPC();
    SerializeRequest();
    Peers();
    PeerHandShake();
    PeerHandshakeWrong();
  });

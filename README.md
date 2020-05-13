# Kami - the guardian of ESN

![CI](https://github.com/KMPARDS/kami/workflows/CI/badge.svg)

This project is a part of Era Swap Network and it's development is in progress.

### Development Notes

- When adding test cases for methods, add cases for expected errors and successful too.
- Add runtime type validation for all method inputs.
- Ensure a debug mode, i.e switchable consolelogs.
- Add a unique identifier to all console.logs to be able to find it in the code

## Technical Specification

Kami is a background process that runs with an EVM machine, which completes an ESN Validator Node. Aspects related to Kami are specified here.

### P2P Connection

Peer-to-peer networking connections between Kami's are based on TCP/IP. The existing JSON RPC 2.0 standard is modified for representing authenticated asks, answers and tells in the P2P communication with ECC.

### Modified JSON RPC

This is an experimental extension of the existing JSON RPC standard as it is. This modification is done for the purpose of identification and authentication between the nodes.

```typescript
interface JsonRequest {
  jsonrpc: '2.0';
  method: string;
  params: any[];
  id: Bytes32;
  nonce?: number | null;
  signature?: Signature | null;
}

interface JsonSuccessResponse {
  jsonrpc: '2.0';
  result: any;
  id: Bytes32;
  nonce?: number | null;
  signature?: Signature | null;
}

interface JsonErrorResponse {
  jsonrpc: '2.0';
  error: JsonErrorObject;
  id: Bytes32;
  nonce?: number | null;
  signature?: Signature | null;
}

interface JsonErrorObject {
  code: number;
  message: string;
  data?: string;
}
```

### Non Authentic Communication

When doing non-authentic communication, the communication is compatible with JSON RPC 2.0.

1. Requester makes a `JsonRequest` to the responder with any choice of a request identidier (`id`) and signature `null` (which means is an annomyous communication).
2. Responder responds with `JsonSuccessResponse` if the execution was successful or `JsonErrorResponse` if there was any error.

### Authentic Communication

1. Requester sends a new connection request with 16 random bytes with `null` id to the responder, which means requester wants to initiate an authentic communication.
2. Responder generates 16 bytes and concatenates it after requester's 16 bytes and uses it in it's responce with a 32-bit `id`, valid for 25 seconds with value of next nonce (starts with `0`) that the requester has to use in their communication.
3. Initiater uses this `id` and `nonce` for signing the next request. The signature is calculated by calling `JSON.stringify` on the request object without signature property, hashing with `keccak256` algorithm and signing it with ECDSA.

When doing a non-authentic communication using JSON RPC 2.0 for a method that requires authentic communication using Extended JSON RPC 2.0, the Kami node can throw an `INVALID_REQUEST` error. 

The misleading `jsonrpc: '2.0'` might be updated to something else like `2.0-extended` or even `2.0-kami`, to signal the other node for using the extended version for communication, while there are no plans of doing this as of now.

### Peers Connection

A Kami can connect with other Kamis by knowing their IP addresses. Kami needs to know the wallet address of the peer nodes hence an authentication communication is needed here.

1. A Kami needs initial seed nodes IP Addresses.
2. A Kami starts authentication handshake with another Kami.
3. If this Kami doesn't have stakes, another Kami might deny to connect.
4. After finish of the handshake, the Kamis add each other to it's list of peers.

```typescript
interface Peer {
  connectionUrl: string;
  connectionId: Bytes32;
  nonce: number;
  connectedTimestamp: number;
  lastTalkTimestamp: number;
  walletAddress: Bytes20;
  seats: number;
}
```

To limit traffic, a peer limit may be implemented. Also to minimize traffic, nodes can choose to connect to only those Kamis who have seats.

### Bunch Proposal

- Start Block Number (uint)
- Bunch Depth (uint)
- Transactions Mega Root (bytes32)
- Receipt Mega Root (bytes32)
- Signatures (bytes65[])

### Bunch Signatures Collection

1. A Kami will generate a bunch proposal locally.
2. A Kami will request all nodes to sign to verify and provide a signature to be included in bunch proposal transaction.
3. When a Kami receives a signature request, they compute the bunch proposal, checks if it matches, then signs on it. Else it returns an error.
4. When a Kami receives response with signature, it adds it to a list of signatures along with respective seats.
5. Every time, a new signature is received, it checks if 66% is acheived. If yes, then it arranges by decending order of seats up to 66% seats and drops any excess signatures.
6. Prepares transaction and sends it to Ethereum.

# Kami - the guardian of ESN

![CI](https://github.com/KMPARDS/kami/workflows/CI/badge.svg)

[WIP] This project is a part of Era Swap Network.

### Development Notes

- When adding test cases for methods, add cases for expected errors and successful too.
- Add a unique identifier to all console.logs to be able to find it in the code
- Check for TODO comments left out for working on later
- Refactor `utils` module code into into other modules, i.e. add `utils.ts` in other modules and export them from `index.ts`.

# Technical Specification

Kami is a daemon (long running background process) that runs with a seperate EVM machine daemon, which completes an ESN Validator Node. Technical aspects related to Kami are specified here.

## Peer-to-peer Networking

### Peer Discovery
Since, Kami works with an ESN node daemon, it will utilise the peer discovery from the ESN nodes.

### Connection
Peer-to-peer networking connections between Kami instances's are based on TCP/IP. The existing JSON RPC 2.0 standard is modified for representing authenticated asks, answers and tells in the P2P communication with ECC.

## Modified JSON RPC Standard

This is an experimental extension of the existing JSON RPC standard as it is. This modification is done for the purpose of identification and authentication between the nodes.

```typescript
interface JsonRequest {
  jsonrpc: '2.0';
  method: string;
  params: any[];
  id: Bytes32 | null;
  nonce?: number;
  signature?: Signature;
}

interface JsonSuccessResponse {
  jsonrpc: '2.0';
  previousHash: Bytes32;
  result: any;
  id: Bytes32 | null;
  nonce?: number;
  signature?: Signature;
}

interface JsonErrorResponse {
  jsonrpc: '2.0';
  previousHash?: Bytes32;
  error: JsonErrorObject;
  id: Bytes32 | null;
  nonce?: number;
  signature?: Signature;
}

interface JsonErrorObject {
  code: number;
  message: string;
  data?: string;
}
```

### Non Authentic Communication

When doing non-authentic communication, the communication is much like normal JSON RPC 2.0.

1. Requester makes a `JsonRequest` to the responder with `id = null` (which means is an annomyous communication).
2. Responder responds with interface `JsonSuccessResponse` if the execution was successful or `JsonErrorResponse` if there was any error.

> TODO: To make this 100% compliant with JSON RPC 2.0, we can create a seperate key: `connection` and use for purpose of connectionId context (which is currently being used with `id`). 

## Public Key Cryptosystem

This public key cryptosystem is based on the `secp256k1` Eliptic Curve. Being modern and secure, it's been the choice in Ethereum and hence, it's implementation in Kami would be less complex for a developer to maintain it as well as end user to install and use it in context of Era Swap Smart Contracts.

### Signature Generation Standard

ECDSA needs a 32 Byte digest for signing. ECDSA being used commonly in multiple blockchains, gives a security threat for reuse of the signed message in another dApp. The design choice for preparing the 32 Byte digest is explained here. The digest generation is inspired from `EIP 191`. We have defined a `rlpizeObject` method on a request object, which is used to `serializeJson` it into a byte string. Finally, we add a domain seperator and hash it using `keccak256` algorithm and further signing it with ECDSA to generate the signature point on the curve.

`0x19 | 0x97 | <32-byte domain seperator> | <data to sign>`

Here, `0x97` is the version byte (and from the version bytes registry looks like it's not taken). The domain seperator is defined as:
```
domainSeperator: Bytes32 = keccak256(
  serializeJson({
    name: 'Kami of Era Swap Network',
    chainId: 5197,
  })
)
```

### RLPize Object Method Standard

> TODO: Add explaination here

### Peer Handshake

1. Requester calls the `kami_peerInit` method with 16 random bytes with `null` id to the responder.
2. Responder generates random 16 bytes and concatenates it after requester's 16 bytes and sends the 32 bytes back, the requester has to use it as `id` in next communication.
3. Initiater uses this `id` received and `nonce = 0` for signing the next request. The signature generation standard will be described in the next sections. 

When doing a non-authentic communication using JSON RPC 2.0 for a method that requires authentic communication using Extended JSON RPC 2.0, the Kami node can throw an `INVALID_REQUEST` error. 

The misleading `jsonrpc: '2.0'` might be updated to something else like `2.0-extended` or even `2.0-kami`, to signal the other node for using the extended version for communication, while there are no plans of doing this as of now.

A Kami can connect with other Kamis by knowing their IP addresses. Kami needs to know the wallet address of the peer nodes hence an authentication communication is needed here.

1. A Kami needs initial seed nodes IP Addresses.
2. A Kami starts authentication handshake with another Kami.
3. If this Kami doesn't have stakes, another Kami might deny to connect.
4. After finish of the handshake, the Kamis add each other to it's list of peers.

```typescript
interface Peer {
  connectionUrl: URL;
  connectionId: Bytes32;
  trusted: boolean;
  reqNonce: number;
  checkNonce: number;
  connected: Date;
  lastTalk: Date;
  walletAddress: Address | null;
  seats: number | null;
}
```

To limit traffic, a peer limit (of e.g. `100`) may be implemented. Also to minimize traffic, nodes can choose to connect to only those Kamis who have seats.

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

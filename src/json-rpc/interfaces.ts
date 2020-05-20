import { Bytes, Bytes32, Signature } from '../utils/bytes';

export interface JsonRequest {
  jsonrpc: '2.0';
  method: string;
  params: any[];
  id: Bytes32 | null;
  nonce?: number;
  signature?: Signature;
}

export interface JsonSuccessResponse {
  jsonrpc: '2.0';
  previousHash: Bytes32;
  result: any;
  id: Bytes32 | null;
  nonce?: number;
  signature?: Signature;
}

export interface JsonErrorResponse {
  jsonrpc: '2.0';
  previousHash?: Bytes32;
  error: JsonErrorObject;
  id: Bytes32 | null;
  nonce?: number;
  signature?: Signature;
}

export interface JsonErrorObject {
  code: number;
  message: string;
  data?: string;
}

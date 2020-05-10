import { Bytes, Bytes32, Signature } from '../utils/bytes';

export interface JsonRequest {
  jsonrpc: '2.0';
  method: string;
  params: any[];
  id: Bytes32;
  signature: Signature | null;
}

export interface JsonSuccessResponse {
  jsonrpc: '2.0';
  result: any;
  id: Bytes32;
  signature: Signature | null;
}

export interface JsonErrorResponse {
  jsonrpc: '2.0';
  error: JsonErrorObject;
  id?: Bytes32;
  signature: null;
}

export interface JsonErrorObject {
  code: number;
  message: string;
  data?: string;
}

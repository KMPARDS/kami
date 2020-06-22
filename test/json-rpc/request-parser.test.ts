import { parseRequest } from '../../src/json-rpc/parser';
import { Bytes, Signature } from '../../src/utils/bytes';
import assert from 'assert';
import { ethers } from 'ethers';

export const RequestParser = () =>
  describe('Request Parser', () => {
    it('parses a valid request correctly', () => {
      const request = {
        jsonrpc: '2.0',
        method: 'temp_method',
        params: [1, '0x2345'],
        id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
      };

      const parsed = parseRequest(request);

      assert.ok(
        parsed.id instanceof Bytes,
        'hex string should be converted into a Bytes instance'
      );
    });

    it('throws for invalid json rpc version', () => {
      try {
        const request = {
          jsonrpc: '3.0',
          method: 'temp_method',
          params: [1, '0x2345'],
          id: null,
        };

        parseRequest(request);

        assert(false, 'should have thrown for invalid json rpc version');
      } catch {
        assert(true);
      }
    });

    it('parses nonce and signature correctly', () => {
      const request = {
        jsonrpc: '2.0',
        method: 'temp_method',
        params: [1, '0x2345'],
        id: null,
        nonce: 23,
        signature:
          '0xd5f3bcfbc09bef8e232bf7090091eb883cf911937175739107fcdca58ffb6d3b5c47ebc40d9820e7d2c104814a36f87bb3f03c09f8cd0361da296d9712a469921b',
      };

      const parsed = parseRequest(request);

      assert.ok(
        parsed.signature instanceof Signature,
        'hex string should be converted into a Signature instance'
      );
    });
  });

import assert from 'assert';
import { ethers } from 'ethers';
import { hexlifyObject } from '../../src/json-rpc/parser';
import { Bytes32 } from '../../src/utils/bytes';
import {
  serializeJson,
  deSerializeJson,
  rlpizeObject,
  deRlpizeByteArray,
} from '../../src/utils/serialize-json';
import { JsonSuccessResponse, JsonErrorResponse } from '../../src/json-rpc';

const { kami1, consoleLog } = require('../test-configs');
const KAMI_1_URL = `http://localhost:${kami1.config.JSON_RPC_PORT}/`;

const testCases = [
  {
    jsonrpc: '2.0',
    method: 'kami_serializeRequest',
    params: ['0x1234'],
    id: null,
  },
  // {
  //   jsonrpc: '2.0',
  //   method: 'kami_serializeRequest',
  //   params: ['0x1234'],
  //   id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
  // },
];

export const SerializeRequest = () =>
  describe('Serialize Request', () => {
    testCases.forEach((testCase, i) => {
      let response: JsonSuccessResponse;
      it(`Test case ${i}`, async () => {
        response = await ethers.utils.fetchJson(
          KAMI_1_URL,
          JSON.stringify(hexlifyObject(testCase))
        );

        if (!response.result) {
          console.log(response);
          throw new Error('Request errored');
        }

        const unserialized = deSerializeJson(response.result);

        assert.deepStrictEqual(
          hexlifyObject(unserialized),
          hexlifyObject(testCase),
          'unserialized should be equal to testcase'
        );
      });

      it('Check if Request Hash matches', () => {
        const serialized = serializeJson(testCase);
        const previousHash = new Bytes32(
          ethers.utils.keccak256(serialized.data)
        );

        assert.strictEqual(
          response.previousHash,
          previousHash.hex(),
          'previous hash should match'
        );
      });
    });
  });

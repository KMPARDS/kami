const ethers = require('ethers');
const assert = require('assert');
const { hexlifyObject } = require('../../build/json-rpc/parser');
const { Bytes32 } = require('../../build/utils/bytes');
const {
  serializeJson,
  deSerializeJson,
  rlpizeObject,
  deRlpizeByteArray,
} = require('../../build/utils/serialize-json');
const { kami1, consoleLog } = require('../test-configs');
const KAMI_1_URL = `http://localhost:${kami1.config.JSON_RPC_PORT}/`;

const testCases = [
  {
    jsonrpc: '2.0',
    method: 'kami_serializeRequest',
    params: ['0x1234'],
    id: null,
  },
  {
    jsonrpc: '2.0',
    method: 'kami_serializeRequest',
    params: ['0x1234'],
    id: ethers.utils.hexlify(ethers.utils.randomBytes(32)),
  },
];

describe('Serialize Request', () => {
  testCases.forEach((testCase, i) => {
    let response;
    it(`Test case ${i}`, async () => {
      response = await ethers.utils.fetchJson(
        KAMI_1_URL,
        JSON.stringify(hexlifyObject(testCase))
      );

      const hex = response.hex;
      if (!response.result) {
        console.log(response);
      }
      // const rlp = ethers.utils.RLP.decode(response.result);
      // const unserialized = hexlifyObject(deRlpizeByteArray(rlp));
      // consoleLog({ rlp, unserialized });
      const unserialized = deSerializeJson(response.result);

      assert.deepStrictEqual(
        hexlifyObject(unserialized),
        hexlifyObject(testCase),
        'unserialized should be equal to testcase'
      );
    });

    it('Check if Hash matches', () => {
      const serialized = serializeJson(testCase);
      const previousHash = new Bytes32(ethers.utils.keccak256(serialized.data));
      // console.log(response, { hash: previousHash.hex() });

      assert.strictEqual(
        response.previousHash,
        previousHash.hex(),
        'previous hash should match'
      );
    });
  });
});

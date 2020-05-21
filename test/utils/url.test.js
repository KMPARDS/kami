const { URLMask } = require('../../build/utils/url');
const assert = require('assert');

const testCases = [
  ['http://localhost:8545', true],
  ['http://10.3.4.2:8545', true],
  ['http://10.3.4.2', true],
  ['nttp://localhost:8545', false],
  ['http://10.3.4.2:854f5', false],
];

describe('URL', () => {
  testCases.forEach((testCaseEntry) => {
    it(`initiating URL with ${testCaseEntry[0]} ${
      testCaseEntry[1] ? 'should work' : 'should give error'
    }`, () => {
      let isUrlInitiated = false;
      try {
        const url = new URLMask(testCaseEntry[0]);
        isUrlInitiated = true;
      } catch (error) {
        // console.log(error);
      }

      assert.strictEqual(
        isUrlInitiated,
        testCaseEntry[1],
        testCaseEntry[1]
          ? 'should not give error but it did'
          : "should give error but it didn't"
      );
    });
  });
});

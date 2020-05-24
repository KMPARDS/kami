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
  describe('Constructor', () => {
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

  describe('Equality', () => {
    it('local urls with same port are equal', () => {
      const local1 = new URLMask('http://localhost:25985');
      const local2 = new URLMask('http://127.0.0.1:25985');
      assert.ok(local1.eq(local2), 'should be same');
    });

    it('local urls with diff port are not equal', () => {
      const local1 = new URLMask('http://localhost:25985');
      const local2 = new URLMask('http://127.0.0.1:5197');
      assert.ok(!local1.eq(local2), 'should be diff');
    });
  });
});

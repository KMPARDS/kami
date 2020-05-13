const assert = require('assert');
const { t, check, validate } = require('../../build/type-validation');
const { Bytes } = require('../../build/utils/bytes');

const testCases = [
  {
    name: 'Number',
    type: t.number,
    cases: [
      {
        value: 2,
        isCorrectValue: true,
      },
      {
        value: '2',
        isCorrectValue: false,
        errorStrings: ['is an invalid value'],
      },
      {
        value: 2.222,
        isCorrectValue: true,
      },
    ],
  },
  {
    name: 'String',
    type: t.string,
    cases: [
      {
        value: '2',
        isCorrectValue: true,
      },
      {
        value: 2,
        isCorrectValue: false,
        errorStrings: ['is an invalid value'],
      },
    ],
  },
  {
    name: 'Hex',
    type: t.hex,
    cases: [
      {
        value: '0x20',
        isCorrectValue: true,
      },
      {
        value: '20',
        isCorrectValue: false,
      },
      {
        value: '0x200x',
        isCorrectValue: false,
      },
      {
        value: '0x20HI',
        isCorrectValue: false,
      },
    ],
  },
  {
    name: 'Integer',
    type: t.int,
    cases: [
      {
        value: 2,
        isCorrectValue: true,
      },
      {
        value: '2',
        isCorrectValue: false,
      },
      {
        value: 2.222,
        isCorrectValue: false,
      },
      {
        value: -2,
        isCorrectValue: true,
      },
    ],
  },
  {
    name: 'UInteger',
    type: t.uint,
    cases: [
      {
        value: 2,
        isCorrectValue: true,
      },
      {
        value: '2',
        isCorrectValue: false,
      },
      {
        value: 2.222,
        isCorrectValue: false,
      },
      {
        value: -2,
        isCorrectValue: false,
      },
    ],
  },
  {
    name: 'Array',
    type: t.array,
    cases: [
      {
        value: [1, 2, 3],
        isCorrectValue: true,
      },
      {
        value: '123',
        isCorrectValue: false,
      },
      {
        value: new Uint8Array([1, 2, 3]),
        isCorrectValue: false,
      },
    ],
  },
  {
    name: 'Uint8Array',
    type: t.uint8array,
    cases: [
      {
        value: new Uint8Array([1, 2, 3]),
        isCorrectValue: true,
      },
      {
        value: '123',
        isCorrectValue: false,
      },
      {
        value: [1, 2, 3],
        isCorrectValue: false,
      },
    ],
  },
  {
    name: 'Object',
    type: t.object,
    cases: [
      {
        value: { d: 3 },
        isCorrectValue: true,
      },
      {
        value: [1, 2, 3],
        isCorrectValue: true,
      },
      {
        value: '123',
        isCorrectValue: false,
      },
    ],
  },
  {
    name: 'Function',
    type: t.functionObject,
    cases: [
      {
        value: () => {},
        isCorrectValue: true,
      },
      {
        value: {},
        isCorrectValue: false,
      },
      {
        value: '123',
        isCorrectValue: false,
      },
    ],
  },
  {
    name: 'Byted',
    type: t.byted,
    cases: [
      {
        value: new Bytes('0x2344'),
        isCorrectValue: true,
      },
      {
        value: '0x2344',
        isCorrectValue: false,
      },
    ],
  },
];

describe('Type Checkers', () => {
  testCases.forEach((mainType) => {
    describe(`${mainType.name} Type Checker`, () => {
      mainType.cases.forEach((testCase) => {
        it(`check for ${
          check(testCase.value, t.string)
            ? `"${testCase.value}"`
            : testCase.value
        }
         should return ${testCase.isCorrectValue}`, () => {
          const result = check(testCase.value, mainType.type);

          assert.strictEqual(
            result,
            testCase.isCorrectValue,
            `should be ${testCase.isCorrectValue} for ${
              testCase.isCorrectValue ? 'correct' : 'incorrect'
            } value`
          );
        });

        it(`validate for ${
          check(testCase.value, t.string)
            ? `"${testCase.value}"`
            : testCase.value
        } should${testCase.isCorrectValue ? ' not' : ''} throw error`, () => {
          const error = (() => {
            try {
              validate(testCase.value, mainType.type);
              return null;
            } catch (error) {
              return error;
            }
          })();

          const isCorrectValue = error === null;

          if (testCase.isCorrectValue && !isCorrectValue) {
            console.log('testCase.value:', testCase.value);
            console.log(error);
          }

          assert.strictEqual(
            isCorrectValue,
            testCase.isCorrectValue,
            `validate method ${
              isCorrectValue ? 'is not throwing error' : 'is throwing error'
            } when it ${
              testCase.isCorrectValue ? 'should not throw' : 'should throw'
            }`
          );

          // assert.ok(error instanceof TypeError, 'error should be of TypeError');
          if (error) {
            if (!testCase.errorStrings) testCase.errorStrings = [];
            ['is an invalid value', ...testCase.errorStrings].forEach(
              (errorString) => {
                assert.ok(
                  error.message.includes(errorString),
                  `Error should include "${errorString}": ${error.message}`
                );
              }
            );

            assert.ok(
              error.message.split('More information: ')[1].length > 0,
              'should have more information'
            );
          }
        });
      });
    });
  });
});

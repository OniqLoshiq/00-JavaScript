const assert = require('chai').assert;
const Console = require('./5-console-class.js');

describe('Console class', () => {
    let actualResult;
    let expectedResult;

    beforeEach(() => {
        expectedResult = null;
        actualResult = null;
    })

    describe('writeLine logic', () => {
        it('one parameter with type string', () => {
            expectedResult = `Some random message`;
            actualResult = Console.writeLine(expectedResult);

            assert.equal(actualResult, expectedResult);
        });

        it('one parameter with type object', () => {
            let obj = {name: 'Dokka'};
            expectedResult = '{"name":"Dokka"}';
            actualResult = Console.writeLine(obj);

            assert.equal(actualResult, expectedResult);
        });

        it('one parameter with type number', () => {
            expectedResult = undefined;
            actualResult = Console.writeLine(1);

            assert.equal(actualResult, expectedResult);
        });

        it('two parameters with first type number', () => {
            expectedResult = 'No string format given!';
            actualResult = () => Console.writeLine(1, 'some string');

            assert.throws(actualResult, expectedResult);
        });

        it('parameters more than the number of placeholders', () => {
            expectedResult = 'Incorrect amount of parameters given!';
            actualResult = () => Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7, 8, 10);

            assert.throws(actualResult, expectedResult);
        });

        it('parameters less than the number of placeholders', () => {
            expectedResult = 'Incorrect amount of parameters given!';
            actualResult = () => Console.writeLine("The sum of {0} and {1} is {2}", 3);

            assert.throws(actualResult, expectedResult);
        });

        it('incorect number of placeholder', () => {
            expectedResult = 'Incorrect placeholders given!';
            actualResult = () => Console.writeLine("The sum of {0} and {1} is {2} and {18}", 3, 4, 7, 18);

            assert.throws(actualResult, expectedResult);
        });

        it('return correct string with replaced placeholders', () => {
            expectedResult = 'The sum of 3 and 4 is 7';
            actualResult = Console.writeLine("The sum of {0} and {1} is {2}", 3, 4, 7);

            assert.equal(actualResult, expectedResult);
        });
    });
});
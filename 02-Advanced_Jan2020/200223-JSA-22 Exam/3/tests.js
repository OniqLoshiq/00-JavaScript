let Parser = require("./solution.js");
let assert = require("chai").assert;

describe("MyTests", () => {
    let parser;
    let actualResult;
    let expectedResult;

    beforeEach(() => {
        actualResult = null;
        expectedResult = null;
        parser = new Parser('[ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ]');
    });

    describe('object initialization', () => {
        it('check properties', () => {
            expectedResult = [ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ];
            
            assert.deepEqual(parser._data, expectedResult);
            assert.isTrue(parser.hasOwnProperty('_log'));
            assert.deepEqual(parser._log, []);
            assert.isTrue(parser.hasOwnProperty('_addToLog'));
        });
    });

    describe('getter data', () => {
        it('return correct data with no deleted entries', () => {
            expectedResult = [ {"Nancy":"architect"},{"John":"developer"},{"Kate": "HR"} ];
            actualResult = parser.data;

            assert.deepEqual(actualResult, expectedResult);
            assert.equal(parser._log.length, 1);
        });

        it('return correct data with with deleted entry', () => {
            parser = new Parser('[ {"Nancy":"architect", "deleted":"true"},{"John":"developer"},{"Kate": "HR"} ]');
            expectedResult = [ {"John":"developer"},{"Kate": "HR"} ];
            actualResult = parser.data;

            assert.deepEqual(actualResult, expectedResult);
            assert.equal(parser._log.length, 1);
        });
    });

    describe('print method', () => {
        it('print correct with no deleted entries', () => {
            expectedResult = ['id|name|position', '0|Nancy|architect','1|John|developer', '2|Kate|HR'].join('\n');
            actualResult = parser.print();

            assert.equal(actualResult, expectedResult);
            assert.equal(parser._log.length, 1);
        });

        it('print correct with with deleted entry', () => {
            parser = new Parser('[ {"Nancy":"architect", "deleted":"true"},{"John":"developer"},{"Kate": "HR"} ]');
            expectedResult = ['id|name|position', '0|John|developer', '1|Kate|HR'].join('\n');
            actualResult = parser.print();

            assert.equal(actualResult, expectedResult);
            assert.equal(parser._log.length, 1);
        });
    });

    describe('add entries method', () => {
        it('add correct entries', () => {
            expectedResult = 'Entries added!';
            actualResult = parser.addEntries('Steven:tech-support Edd:administrator');

            assert.equal(actualResult, expectedResult);
            assert.equal(parser._log.length, 1);
        });

        it('add entries and check if modified data', () => {
            expectedResult = parser.data.length + 1;
            parser.addEntries('Edd:administrator');
            actualResult = parser.data.length;

            assert.equal(actualResult, expectedResult);
            assert.isTrue(parser.data.some(e => e.hasOwnProperty('Edd')));
        });
    });

    describe('remove entry method', () => {
        it('should throw error with no such entry', () => {
            expectedResult = 'There is no such entry!';
            actualResult = () => parser.removeEntry('Dokka');

            assert.throw(actualResult, expectedResult);
        });

        it('should throw error with no deleted entry', () => {
            expectedResult = 'There is no such entry!';

            parser = new Parser('[ {"Nancy":"architect", "deleted":"true"},{"John":"developer"},{"Kate": "HR"} ]');
            actualResult = () => parser.removeEntry('Nancy');

            assert.throw(actualResult, expectedResult);
        });

        it('remove a valid entry', () => {
            expectedResult = 'Removed correctly!';
            let expectedCount = parser.data.length - 1;
            actualResult = parser.removeEntry('Nancy');

            assert.equal(actualResult, expectedResult);
            assert.isTrue(parser._data[0].hasOwnProperty('deleted'));
            assert.equal(parser.data.length, expectedCount);
        });
    });

    describe('add to log method', () => {
        it('should increment counter and return message', () => {
            expectedResult = 'Added to log';
            actualResult = parser._addToLog("getData");
            parser._addToLog("getData");

            assert.equal(actualResult, expectedResult);
            assert.equal(parser._log.length, 2);
            assert.equal(parser._log[0], '0: getData');
            assert.equal(parser._log[1], '1: getData');
        });
    });
});
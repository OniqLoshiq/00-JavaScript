const assert = require('chai').assert;
const Warehouse = require('./200207-JSA-16 Ex 8');

//02 Even or Odd
// describe('isOddOrEven function', () => {
//     it('check with invalid input', () => {
//         let expectedResult = undefined;
//         let actualResult = isOddOrEven(true);

//         assert.equal(actualResult, expectedResult, "Should return undefiend");
//     });

//     it('check with invalid odd number', () => {
//         let expectedResult = 'odd';
//         let actualResult = isOddOrEven('asd');

//         assert.equal(actualResult, expectedResult, "Should return odd");
//     });

//     it('check with invalid even number', () => {
//         let expectedResult = 'even';
//         let actualResult = isOddOrEven('asdf');

//         assert.equal(actualResult, expectedResult, "Should return even");
//     });
// });

//03 Char Lookup
// describe('lookUpChar function', () => {
//     let actualResult;
//     let expectedResult;

//     beforeEach(() => {
//         actualResult = null;
//         expectedResult = null;
//     })

//     it('with invalid first param', () => {
//         expectedResult = undefined;
//         actualResult = lookupChar(false, 5);

//         assert.equal(actualResult, expectedResult, 'shold return undefiend');
//     });

//     it('with invalid second param as string', () => {
//         expectedResult = undefined;
//         actualResult = lookupChar('asd', 'dd');

//         assert.equal(actualResult, expectedResult, 'shold return undefiend');
//     });

//     it('with invalid second param as float', () => {
//         expectedResult = undefined;
//         actualResult = lookupChar('asd', 2.5);

//         assert.equal(actualResult, expectedResult, 'shold return undefiend');
//     });

//     it('with invalid second param as negative number', () => {
//         expectedResult = 'Incorrect index';
//         actualResult = lookupChar('asd', -5);

//         assert.equal(actualResult, expectedResult, 'shold return Incorrect index');
//     });

//     it('with invalid second param as bigger than string length', () => {
//         expectedResult = 'Incorrect index';
//         actualResult = lookupChar('asd', 4);

//         assert.equal(actualResult, expectedResult, 'shold return Incorrect index');
//     });

//     it('with valid data should return expected char', () => {
//         expectedResult = 's';
//         actualResult = lookupChar('asd', 1);

//         assert.equal(actualResult, expectedResult, 'shold return s');
//     });
// });

//04 Math Enforcer
// describe('mathEnforcer object', () => {
//         let actualResult;
//         let expectedResult;

//         beforeEach(() => {
//             actualResult = null;
//             expectedResult = null;
//         })

//         describe('addFive function', () => {
//             it('with invalid data not a number', () => {
//                 expectedResult = undefined;
//                 actualResult = mathEnforcer.addFive('str');

//                 assert.equal(actualResult, expectedResult, 'shold return undefiend');
//             });

//             it('with valid data positive int num', () => {
//                 expectedResult = 10;
//                 actualResult = mathEnforcer.addFive(5);

//                 assert.equal(actualResult, expectedResult, 'should return 10');
//             });

//             it('with valid data negative int num', () => {
//                 expectedResult = 0;
//                 actualResult = mathEnforcer.addFive(-5);

//                 assert.equal(actualResult, expectedResult, 'should return 0');
//             });

//             it('with valid data float num', () => {
//                 expectedResult = 6.5;
//                 actualResult = mathEnforcer.addFive(1.5);

//                 assert.equal(actualResult, expectedResult, 'should return 6.5');
//             });
//         });

//         describe('subtractTen function', () => {
//             it('with invalid data not a number', () => {
//                 expectedResult = undefined;
//                 actualResult = mathEnforcer.subtractTen('str');

//                 assert.equal(actualResult, expectedResult, 'shold return undefiend');
//             });

//             it('with valid data positive int num', () => {
//                 expectedResult = 0;
//                 actualResult = mathEnforcer.subtractTen(10);

//                 assert.equal(actualResult, expectedResult, 'shold return 0');
//             });

//             it('with valid data negative int num', () => {
//                 expectedResult = -15;
//                 actualResult = mathEnforcer.subtractTen(-5);

//                 assert.equal(actualResult, expectedResult, 'shold return -15');
//             });

//             it('with valid data positive float num', () => {
//                 expectedResult = 0.5;
//                 actualResult = mathEnforcer.subtractTen(10.5);

//                 assert.equal(actualResult, expectedResult, 'shold return 0.5');
//             });
//         });

//         describe('sum function', () => {
//             it('with invalid first param not a number', () => {
//                 expectedResult = undefined;
//                 actualResult = mathEnforcer.sum('str', 5);

//                 assert.equal(actualResult, expectedResult, 'shold return undefiend');
//             });

//             it('with invalid second param not a number', () => {
//                 expectedResult = undefined;
//                 actualResult = mathEnforcer.sum(5, 'str');

//                 assert.equal(actualResult, expectedResult, 'shold return undefiend');
//             });

//             it('with valid data positive numbers', () => {
//                 expectedResult = 10;
//                 actualResult = mathEnforcer.sum(5, 5);

//                 assert.equal(actualResult, expectedResult, 'shold return 10');
//             });

//             it('with valid data negative numbers', () => {
//                 expectedResult = -10;
//                 actualResult = mathEnforcer.sum(-5, -5);

//                 assert.equal(actualResult, expectedResult, 'shold return -10');
//             });

//             it('with valid data int and float numbers', () => {
//                 expectedResult = 7.5;
//                 actualResult = mathEnforcer.sum(5, 2.5);

//                 assert.equal(actualResult, expectedResult, 'shold return 7.5');
//             });

//             it('with valid data float and float numbers', () => {
//                 expectedResult = -3;
//                 actualResult = mathEnforcer.sum(-5.5, 2.5);

//                 assert.equal(actualResult, expectedResult, 'shold return -3');
//             });
//         });
//     });


//05 StringBuilder
// describe('StringBuilder class', () => {
//     let actualResult;
//     let expectedResult;
//     let sb;

//     beforeEach(() => {
//         actualResult = new StringBuilder('asd');
//         expectedResult = null;
//     })

//     describe('vrfyParam static method', () => {
//         it('with invalid data boolean', () => {
//             expectedResult = 'Argument must be string';
//             actualResult = () => StringBuilder._vrfyParam(false);

//             assert.throws(actualResult, expectedResult);
//         });
//     });

//     describe('constructor', () => {
//         it('with without parameter', () => {
//             expectedResult = [];
//             actualResult = new StringBuilder();

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });

//         it('with with parameter', () => {
//             expectedResult = ['a', 's', 'd'];

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });
//     });

//     describe('append method', () => {
//         it('valid data string', () => {
//             expectedResult = ['a', 's', 'd', 'f', 'g'];
//             actualResult.append('fg');

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });
//     });

//     describe('prepend method', () => {
//         it('valid data string', () => {
//             expectedResult = ['f', 'g', 'a', 's', 'd'];
//             actualResult.prepend('fg');

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });
//     });

//     describe('insertAt method', () => {
//         it('valid data index and string at start', () => {
//             expectedResult = ['f', 'g', 'a', 's', 'd'];
//             actualResult.insertAt('fg', 0);

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });

//         it('valid data index and char at start', () => {
//             expectedResult = ['f', 'a', 's', 'd'];
//             actualResult.insertAt('f', 0);

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });

//         it('valid data index and string in the middle', () => {
//             expectedResult = ['a', 'f', 'g', 's', 'd'];
//             actualResult.insertAt('fg', 1);

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });

//         it('valid data index bigger than array length', () => {
//             expectedResult = ['a', 's', 'd', 'f', 'g'];
//             actualResult.insertAt('fg', 10);

//             assert.deepEqual(actualResult._stringArray, expectedResult, 'should append string at the end of array');
//         });
//     });

//     describe('remove method', () => {
//         it('valid data index and length of 1', () => {
//             expectedResult = ['a', 'd'];
//             actualResult.remove(1, 1);

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });

//         it('valid data index and length of 2', () => {
//             expectedResult = ['a'];
//             actualResult.remove(1, 2);

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });

//         it('valid data index and length of 0', () => {
//             expectedResult = ['a', 's', 'd'];
//             actualResult.remove(1, 0);

//             assert.deepEqual(actualResult._stringArray, expectedResult);
//         });
//     });

//     describe('toString method', () => {
//         it('valid data array with values', () => {
//             expectedResult = 'asd';

//             assert.deepEqual(actualResult.toString(), expectedResult);
//         });

//         it('valid data empty array', () => {
//             expectedResult = '';
//             actualResult = new StringBuilder();

//             assert.deepEqual(actualResult.toString(), expectedResult);
//         });
//     });
// });

//06 Payment Package
// describe('PaymentPackage class', () => {
//     let actualResult;
//     let expectedResult;
//     let pp;

//     beforeEach(() => {
//         pp = new PaymentPackage('Beer', 10);
//         expectedResult = null;
//         actualResult = null;
//     })

//     describe('name property logic', () => {
//         it('set invalid value boolean for name', () => {
//             expectedResult = 'Name must be a non-empty string';
//             actualResult = () => pp.name = false;

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set invalid value empty string for name', () => {
//             expectedResult = 'Name must be a non-empty string';
//             actualResult = () => pp.name = '';

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set valid value for name and get right output', () => {
//             expectedResult = 'Beer';
//             actualResult = pp.name;

//             assert.equal(actualResult, expectedResult);
//         });
//     });

//     describe('value property logic', () => {
//         it('set invalid value boolean for value', () => {
//             expectedResult = 'Value must be a non-negative number';
//             actualResult = () => pp.value = false;

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set invalid value -10 for value', () => {
//             expectedResult = 'Value must be a non-negative number';
//             actualResult = () => pp.value = -10;

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set valid value for vat and get right output', () => {
//             expectedResult = 25;
//             pp.value = 25;
//             actualResult = pp.value;

//             assert.equal(actualResult, expectedResult);
//         });
//     });

//     describe('vat property logic', () => {
//         it('set invalid vat boolean for value', () => {
//             expectedResult = 'VAT must be a non-negative number';
//             actualResult = () => pp.VAT = false;

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set invalid value -10 for value', () => {
//             expectedResult = 'VAT must be a non-negative number';
//             actualResult = () => pp.VAT = -10;

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set valid value for value and get right output', () => {
//             expectedResult = 25;
//             pp.VAT = 25;
//             actualResult = pp.VAT;

//             assert.equal(actualResult, expectedResult);
//         });

//         it('check if valid default value', () => {
//             expectedResult = 20;
//             actualResult = pp.VAT;

//             assert.equal(actualResult, expectedResult);
//         });
//     });

//     describe('active property logic', () => {
//         it('set invalid active with number for value', () => {
//             expectedResult = 'Active status must be a boolean';
//             actualResult = () => pp.active = 15;

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set invalid active with string for value', () => {
//             expectedResult = 'Active status must be a boolean';
//             actualResult = () => pp.active = 'sample';

//             assert.throws(actualResult, expectedResult);
//         });

//         it('set valid value for active and get right output', () => {
//             expectedResult = false;
//             pp.active = false;
//             actualResult = pp.active;

//             assert.equal(actualResult, expectedResult);
//         });

//         it('check if valid default value', () => {
//             expectedResult = true;
//             actualResult = pp.active;

//             assert.equal(actualResult, expectedResult);
//         });
//     });

//     describe('toString method logic', () => {
//         it('check method direct after object creation with default values', () => {
//             expectedResult = [
//                 `Package: Beer`,
//                 `- Value (excl. VAT): 10`,
//                 `- Value (VAT 20%): 12`
//             ].join('\n');
//             actualResult = pp.toString();

//             assert.equal(actualResult, expectedResult);
//         });

//         it('check method after changing default values', () => {
//             expectedResult = [
//                 `Package: Beer (inactive)`,
//                 `- Value (excl. VAT): 10`,
//                 `- Value (VAT 30%): 13`
//             ].join('\n');
//             pp.VAT = 30;
//             pp.active = false
//             actualResult = pp.toString();

//             assert.equal(actualResult, expectedResult);
//         });

//         it('check method after changing value to 0', () => {
//             expectedResult = [
//                 `Package: Beer`,
//                 `- Value (excl. VAT): 0`,
//                 `- Value (VAT 20%): 0`
//             ].join('\n');
//             pp.value = 0;
//             actualResult = pp.toString();

//             assert.equal(actualResult, expectedResult);
//         });
//     });
// });

//07 Warehouse - 72/100 judge
describe('Warehouse class', () => {
    let actualResult;
    let expectedResult;
    let wh;

    beforeEach(() => {
        wh = new Warehouse(1000);
        expectedResult = null;
        actualResult = null;
    })

    describe('constructor logic', () => {
        it('set invalid value boolean for capacity', () => {
            expectedResult = `Invalid given warehouse space`;
            actualResult = () => wh.capacity = false;

            assert.throws(actualResult, expectedResult);
        });

        it('set invalid value negative num for capacity', () => {
            expectedResult = `Invalid given warehouse space`;
            actualResult = () => wh.capacity = 0;

            assert.throws(actualResult, expectedResult);
        });

        it('set valid value capacity', () => {
            expectedResult = 1000;
            actualResult = wh.capacity;

            assert.equal(actualResult, expectedResult);
        });

        it('check default available products', () => {
            expectedResult = { 'Food': {}, 'Drink': {} };
            actualResult = wh.availableProducts;

            assert.deepEqual(actualResult, expectedResult);
        });
    });

    describe('occupiedCapacity logic', () => {
        it('empty available products object', () => {
            expectedResult = 0;
            actualResult = wh.occupiedCapacity();

            assert.equal(actualResult, expectedResult, 'should return 0')
        });

        it('only available food products', () => {
            expectedResult = 3;
            wh.availableProducts.Food['Pizza'] = 1;
            wh.availableProducts.Food['Burger'] = 2;
            actualResult = wh.occupiedCapacity();

            assert.equal(actualResult, expectedResult, 'should return 3')
        });

        it('only available drink products', () => {
            expectedResult = 5;
            wh.availableProducts.Drink['Beer'] = 3;
            wh.availableProducts.Drink['Pepsi Twist'] = 2;
            actualResult = wh.occupiedCapacity();

            assert.equal(actualResult, expectedResult, 'should return 5')
        });

        it('with available food and drink products', () => {
            expectedResult = 10;
            wh.availableProducts.Food['Pizza'] = 3;
            wh.availableProducts.Food['Burger'] = 2;
            wh.availableProducts.Drink['Beer'] = 3;
            wh.availableProducts.Drink['Pepsi Twist'] = 2;
            actualResult = wh.occupiedCapacity();

            assert.equal(actualResult, expectedResult, 'should return 10')
        });
    });

    describe('addProduct method logic', () => {
        it('add product when no space', () => {
            expectedResult = `There is not enough space or the warehouse is already full`;
            actualResult = () => wh.addProduct('Food', 'Pizza', 1001);

            assert.throws(actualResult, expectedResult);
        });

        it('add new product food when has free capacity', () => {
            expectedResult = { Pizza: 20 };
            actualResult = wh.addProduct('Food', 'Pizza', 20);

            assert.deepEqual(actualResult, expectedResult);
        });

        it('add existing product when has free capacity', () => {
            expectedResult = { Pizza: 25 };
            wh.availableProducts.Drink['Pizza'] = 5;
            actualResult = wh.addProduct('Drink', 'Pizza', 20);

            assert.deepEqual(actualResult, expectedResult);
        });
    });

    describe('orderProducts method logic', () => {
        it('several drinks and reorder them', () => {
            expectedResult = { Beer: 20, Pepsi: 19, Water: 10 };
            wh.availableProducts = { Food: {}, Drink: { Water: 10, Pepsi: 19, Beer: 20 } }
            actualResult = wh.orderProducts('Drink');

            assert.deepEqual(actualResult, expectedResult);
        });

        it('several food and reorder them', () => {
            expectedResult = { Pizza: 20, Burger: 19, Steak: 10 };
            wh.availableProducts = { Food: { Steak: 10, Burger: 19, Pizza: 20 }, Drink: {} }
            actualResult = wh.orderProducts('Food');

            assert.deepEqual(actualResult, expectedResult);
        });

        it('reorder empty drink collection', () => {
            expectedResult = {};
            wh.availableProducts = { Food: { Steak: 10, Burger: 19, Pizza: 20 }, Drink: {} }
            actualResult = wh.orderProducts('Drink');

            assert.deepEqual(actualResult, expectedResult);
        });
    });

    describe('revision method logic', () => {
        it('empty warehouse', () => {
            expectedResult = 'The warehouse is empty';
            actualResult = wh.revision();

            assert.equal(actualResult, expectedResult);
        });

        it('empty food', () => {
            expectedResult = 'Product type - [Food]\n'
                + 'Product type - [Drink]\n'
                + '- Water 10\n'
                + '- Pepsi 19';
            wh.availableProducts = { Food: {}, Drink: { Water: 10, Pepsi: 19 } }
            actualResult = wh.revision();

            assert.equal(actualResult, expectedResult);
        });

        it('empty drink', () => {
            expectedResult = 'Product type - [Food]\n'
                + '- Pizza 10\n'
                + '- Burger 19\n'
                + 'Product type - [Drink]';
            wh.availableProducts = { Food: { Pizza: 10, Burger: 19 }, Drink: {} }
            actualResult = wh.revision();

            assert.equal(actualResult, expectedResult);
        });

        it('correct output with food and drinks', () => {
            expectedResult = 'Product type - [Food]\n'
                + '- Pizza 10\n'
                + '- Burger 19\n'
                + 'Product type - [Drink]\n'
                + '- Water 10\n'
                + '- Pepsi 19';
            wh.availableProducts = { Food: { Pizza: 10, Burger: 19 }, Drink: { Water: 10, Pepsi: 19 } }
            actualResult = wh.revision();

            assert.equal(actualResult, expectedResult);
        });
    });

    describe('scrapeAProduct method logic', () => {
        it('not existing product', () => {
            expectedResult = `Beer do not exists`;
            actualResult = () => wh.scrapeAProduct('Beer', 10);

            assert.throw(actualResult, expectedResult);
        });

        it('existing product with bigger available quantity', () => {
            expectedResult = {Beer: 21};
            wh.availableProducts = { Food: {}, Drink: { Beer: 31 } }
            actualResult = wh.scrapeAProduct('Beer', 10);

            assert.deepEqual(actualResult, expectedResult);
        });

        it('existing product with lower available quantity', () => {
            expectedResult = {Beer: 0};
            wh.availableProducts = { Food: {}, Drink: { Beer: 5 } }
            actualResult = wh.scrapeAProduct('Beer', 10);

            assert.deepEqual(actualResult, expectedResult);
        });
    });
});
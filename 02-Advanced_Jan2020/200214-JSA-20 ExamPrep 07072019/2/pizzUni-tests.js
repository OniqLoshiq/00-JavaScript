let assert = require('chai').assert;
let PizzUni = require('./pizzUni-class.js');


describe('PizzUni tests', () => {
    let actualResult;
    let expectedResult;
    let pizzi;

    beforeEach(() => {
        pizzi = new PizzUni();
        expectedResult = null;
        actualResult = null;
    });

    describe('test private properties with object initialization', () => {
        it('should have initialized private properties', () => {
            expectedResult = [];
            let expectedProducts = {
                pizzas: ["Italian Style", "Barbeque Classic", "Classic Margherita"],
                drinks: ["Coca-Cola", "Fanta", "Water"]
            };

            assert.deepEqual(pizzi.registeredUsers, expectedResult);
            assert.deepEqual(pizzi.orders, expectedResult);
            assert.deepEqual(pizzi.availableProducts.hasOwnProperty('pizzas'), true);
            assert.deepEqual(pizzi.availableProducts.hasOwnProperty('drinks'), true);
            assert.deepEqual(pizzi.availableProducts, expectedProducts);
        });
    });

    describe('registerUser method', () => {
        it('register new user and return it', () => {
            let email = '123@proba.bg';
            expectedResult = {email, orderHistory: []};
            actualResult = pizzi.registerUser(email);

            assert.deepEqual(actualResult, expectedResult);
            assert.equal(pizzi.registeredUsers.length, 1);
            assert.equal(pizzi.registeredUsers.some(u => u.email === email), true);
        });

        it('register user with existing email and throw error', () => {
            let email = '123@proba.bg'
            expectedResult = `This email address (${email}) is already being used!`;
            pizzi.registerUser(email);
            actualResult = () => pizzi.registerUser(email);

            assert.throw(actualResult, expectedResult);
        });
    });

    describe('make and order method', () => {
        it('make order with invalid email', () => {
            expectedResult = 'You must be registered to make orders!';
            actualResult = () => pizzi.makeAnOrder('invalid@mail.bg');

            assert.throw(actualResult, expectedResult);
        });

        it('make order with invalid pizza', () => {
            let email = '123@proba.bg';
            expectedResult = 'You must order at least 1 Pizza to finish the order.';
            pizzi.registerUser(email);
            actualResult = () => pizzi.makeAnOrder(email, 'Wrong pizza');

            assert.throw(actualResult, expectedResult);
        });

        it('make order with valid email and pizza and invalid drink', () => {
            let email = '123@proba.bg';
            let pizza = 'Italian Style';
            let drink = 'Beer';
            let currentUser = pizzi.registerUser(email);
            actualResult = pizzi.makeAnOrder(email, pizza, drink);
            expectedResult = 0;
            let expectedUserOrderhistory = {orderedPizza: pizza};
            let expectedOrder = {orderedPizza: pizza, email, status: 'pending'};

            assert.equal(actualResult, expectedResult);
            assert.equal(currentUser.orderHistory.length, 1);
            assert.deepEqual(currentUser.orderHistory[0], expectedUserOrderhistory);
            assert.equal(pizzi.orders.length, 1);
            assert.deepEqual(pizzi.orders[0], expectedOrder);
        });

        it('make order with valid email, pizza and drink', () => {
            let email = '123@proba.bg';
            let pizza = 'Italian Style';
            let drink = 'Fanta';
            let currentUser = pizzi.registerUser(email);
            actualResult = pizzi.makeAnOrder(email, pizza, drink);
            expectedResult = 0;
            let expectedUserOrderhistory = {orderedPizza: pizza, orderedDrink: drink};
            let expectedOrder = {orderedPizza: pizza, orderedDrink: drink, email, status: 'pending'};

            assert.equal(actualResult, expectedResult);
            assert.equal(currentUser.orderHistory.length, 1);
            assert.deepEqual(currentUser.orderHistory[0], expectedUserOrderhistory);
            assert.equal(pizzi.orders.length, 1);
            assert.deepEqual(pizzi.orders[0], expectedOrder);
        });
    });

    describe('complete order method', () => {
        it('change order of first pending order', () => {
            let email = '123@proba.bg';
            let pizza = 'Italian Style';
            let drink = 'Fanta';
            pizzi.registerUser(email);
            let orderIndex = pizzi.makeAnOrder(email, pizza, drink);

            actualResult = {orderedPizza: pizza, orderedDrink: drink, email, status: 'completed'};
            expectedResult = pizzi.completeOrder();

            assert.deepEqual(actualResult, expectedResult);
            assert.deepEqual(actualResult, pizzi.orders[orderIndex]);
        });
    });

    describe('details about my order method', () => {
        it('return order status pending with valid id', () =>{
            let email = '123@proba.bg';
            let pizza = 'Italian Style';
            let drink = 'Fanta';
            pizzi.registerUser(email);
            pizzi.makeAnOrder(email, pizza, drink);

            expectedResult = 'Status of your order: pending';
            actualResult = pizzi.detailsAboutMyOrder(0);

            assert.equal(actualResult, expectedResult);
        });

        it('return order status completed with valid id', () =>{
            let email = '123@proba.bg';
            let pizza = 'Italian Style';
            let drink = 'Fanta';
            pizzi.registerUser(email);
            pizzi.makeAnOrder(email, pizza, drink);
            pizzi.completeOrder();

            expectedResult = 'Status of your order: completed';
            actualResult = pizzi.detailsAboutMyOrder(0);

            assert.equal(actualResult, expectedResult);
        });

        it('return undefiend with invalid id', () =>{
            expectedResult = undefined;
            actualResult = pizzi.detailsAboutMyOrder(0);

            assert.equal(actualResult, expectedResult);
        });
    });
});
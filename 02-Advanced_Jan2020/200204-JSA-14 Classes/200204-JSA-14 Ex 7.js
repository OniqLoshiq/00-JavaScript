//01 Data Class
class HttpRequest {
    constructor(method, uri, version, message) {
        this.method = method;
        this.uri = uri;
        this.version = version;
        this.message = message;
        this.response = undefined;
        this.fulfilled = false;
    }
}

//02 Tickets
function ticketsProblem(ticketInput, sortingParam) {
    class Ticket {
        constructor(destination, price, status) {
            this.destination = destination;
            this.price = Number(price);
            this.status = status;
        }
    }

    const tickets = [];

    for (let i = 0; i < ticketInput.length; i++) {
        const element = ticketInput[i];
        let [destination, price, status] = element.split('|');

        tickets.push(new Ticket(destination, price, status));
    }

    if (sortingParam === 'price') {
        return tickets.sort((a, b) => a[sortingParam] - b[sortingParam]);
    }

    return tickets.sort((a, b) => a[sortingParam].localeCompare(b[sortingParam]));

    //console.log(sortedArr);
}

ticketsProblem(['Philadelphia|94.20|available',
    'New York City|95.99|available',
    'New York City|95.99|sold',
    'Boston|126.20|departed'],
    'destination'
);

//03 Unity
class Rat {
    rats = [];

    constructor(name) {
        this.name = name;
    }

    unite(otherRat) {
        if (otherRat instanceof Rat) {
            this.rats.push(otherRat);
        }
    }

    getRats() {
        return this.rats;
    }

    toString() {
        let unitedRatNames = rats.map(r => `##${r.name}`).join("/n");
        return this.name + "/n" + unitedRatNames;
    }
}

//04 Length Limite
class Stringer {
    constructor(innerString, innerLength) {
        this.innerLength = Number(innerLength);
        this.innerString = innerString;
    }

    increase(length) {
        this.innerLength += length;
    }

    decrease(length) {
        this.innerLength = this.innerLength - length < 0 ? 0 : this.innerLength - length;
    }

    toString() {
        let symbols = this.innerString.length - this.innerLength;

        return symbols <= 0 ? this.innerString : this.innerLength === 0 ? '...' : this.innerString.slice(0, symbols) + '...';
    }
}

let test = new Stringer("Test", 5);
console.log(test.toString()); // Test

test.decrease(3);
console.log(test.toString()); // Te...

test.decrease(5);
console.log(test.toString()); // ...

test.increase(4);
console.log(test.toString()); // Test

//05 Extensible Class -> copy only the IIFE function after the result
let result = (function () {
    let counter = 0;

    return class Extensible {
        constructor() {
            this.id = counter++;
        }

        extend(template) {
            Object.entries(template).map(([key, value]) => {
                if (typeof value === 'function') {
                    Extensible.prototype[key] = value;
                } else {
                    this[key] = value;
                }
            })


        }
    }
})();

//for testing Extensible class
// let Extensible = result;

// let obj1 = new Extensible();
// let obj2 = new Extensible();
// let obj3 = new Extensible();

// var template = {
//     extensionData: 5,
//     extensionMethod: function (value) {
//         return value + 1;
//     }
// };
// obj1.extend(template);
// console.log(obj1.id);
// console.log(obj2.id);
// console.log(obj3.id);

//06 Sorted List
class List {
    list = [];

    constructor() {
        this.size = 0;
    }

    add(element) {
        this.list.push(element);
        this.list.sort((a, b) => a - b);
        this.size++;
    }

    remove(index) {
        if (index >= 0 && index <= this.list.length - 1) {
            this.list.splice(index, 1);
            this.size--;
        }

    }

    get(index) {
        if (index >= 0 && index <= this.list.length - 1) {
            return this.list[index];
        }
    }
}

let list = new List();
list.add(5);
list.add(3);
list.remove(0);
console.log(list.get(0));

//07 Instance validation
class CheckingAccount {
    constructor(clientId, email, firstName, lastName) {
        this.clientId = Number(clientId);
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    set clientId(val) {
        CheckingAccount._validateValue(val, /^[0-9]{6}$/ ,"Client ID must be a 6-digit number")
        this._clientId = val;
    }

    get clientId() {
        return this._clientId;
    }

    set email(val) {
        CheckingAccount._validateValue(val, /[A-Za-z0-9]+@[A-Za-z]+.[A-Za-z]+/ ,"Invalid e-mail")
        this._email = val;
    }

    get email() {
        return this._email;
    }

    set firstName(val) {
        CheckingAccount._validateValue(val, /.{3,20}/ ,"First name must be between 3 and 20 characters long");
        CheckingAccount._validateValue(val, /^[A-Za-z]+$/ ,"First name must contain only Latin characters");
        this._firstName = val;
    }

    get firstName() {
        return this._firstName;
    }

    set lastName(val) {
        CheckingAccount._validateValue(val, /.{3,20}/ ,"Last name must be between 3 and 20 characters long");
        CheckingAccount._validateValue(val, /^[A-Za-z]+$/ ,"Last name must contain only Latin characters");
        this._lastName = val;
    }

    get lastName() {
        return this._lastName;
    }

    static _validateValue(val, regExp, errMessage) {
        if (!regExp.test(val)) {
            throw new TypeError(errMessage);
        }
    }
}

let acc = new CheckingAccount('423415', 'petkan@another.co.uk', 'Petkan', 'Draganov');


//08 Kitchen
class Kitchen {
    menu = {};
    productsInStock = {};
    actionsHistory = [];

    constructor(budget) {
        this.budget = Number(budget);
    }

    loadProducts(products) {
        for (let i = 0; i < products.length; i++) {
            let productsData = products[i].split(" ");
            let name = productsData[0];
            let quantity = Number(productsData[1]);
            let price = Number(productsData[2]);

            if (this.budget < price) {
                this.actionsHistory.push(`There was not enough money to load ${quantity} ${name}`);
            } else {
                this.budget -= price;

                if (!this.productsInStock[name]) {
                    this.productsInStock[name] = 0;
                }

                this.productsInStock[name] += quantity;

                this.actionsHistory.push(`Successfully loaded ${quantity} ${name}`);
            }
        }

        return this.actionsHistory.join("\n");
    }

    addToMenu(meal, products, price) {
        if (!this.menu[meal]) {

            this.menu[meal] = { price: price, products: products };

            //THIS DOES NOT WORK FOR TEST 6 IN JUDGE --> SUPER SH!T
            // this.menu[meal] = { price: price, products: {} };

            // for (let i = 0; i < products.length; i++) {
            //     let [name, quantity] = products[i].split(" ");

            //     this.menu[meal].products[name] = +quantity;
            // }

            return `Great idea! Now with the ${meal} we have ${Object.keys(this.menu).length} meals on the menu, other ideas?`;
        }

        return `The ${meal} is already in our menu, try something different.`;
    }

    showTheMenu() {
        if (Object.keys(this.menu).length === 0) {
            return "Our menu is not ready yet, please come later...";
        }

        let result = Object.keys(this.menu).map(meal => `${meal} - $ ${this.menu[meal].price}`);
        return result.join("\n").trim() + '\n';
    }

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`;
        }

        //CHANGED LOGIC CUZ OF addToMenu FOR TEST 6
        // let neededProducts = Object.entries(this.menu[meal].products);

        // for (let i = 0; i < neededProducts.length; i++) {
        //     let [name, quantity] = [...neededProducts[i]];

        //     if (!this.productsInStock[name] || this.productsInStock[name] < quantity) {
        //         return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
        //     }
        // }
        
        let neededProducts = this.menu[meal].products;

        for (let i = 0; i < neededProducts.length; i++) {
            let [name, quantity] = [...neededProducts[i].split(" ")];

            if (!this.productsInStock[name] || this.productsInStock[name] < quantity) {
                return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
            }
        }

        for (let i = 0; i < neededProducts.length; i++) {
            //CHANGED LOGIC CUZ OF addToMenu FOR TEST 6
            //let [name, quantity] = [...neededProducts[i]];

            let [name, quantity] = [...neededProducts[i].split(" ")];

            this.productsInStock[name] -= quantity;
        }

        this.budget += this.menu[meal].price;

        return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`;
    }
}
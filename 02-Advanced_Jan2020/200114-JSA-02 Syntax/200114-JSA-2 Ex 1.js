//01 Fruit
function fruit(...params) {
    let fruitName = params.shift();
    let paramsNew = params.map(Number);
    let fruitInKg = paramsNew[0] / 1000;
    let price = paramsNew[1] * fruitInKg;
    console.log(`I need $${price.toFixed(2)} to buy ${fruitInKg.toFixed(2)} kilograms ${fruitName}.`);
}

fruit('apple', 1563, 2.35);

//02 Greatest Common Divisor
function gcd(x, y) {
    while (y) {
        [x, y] = [y, x % y]
    }
    console.log(x);
}

gcd(15, 5);

//03 Same Numbers
function sameNumbers(x) {
    let numsArrayAsString = x.toString().split('');
    let numsArray = numsArrayAsString.map(Number);
    console.log(!numsArrayAsString.some(y => y !== numsArrayAsString[0]));
    console.log(numsArray.reduce((a, b) => a + b, 0));
}

sameNumbers(2222222);

//04 Time to walk
function timeToWalk(steps, footprint, speed) {
    let pathLengthInMeters = steps * footprint;
    let timeToWalkSeconds = Math.ceil((pathLengthInMeters / 1000) / speed * 3600);
    let restTimeSeconds = Math.floor(pathLengthInMeters / 500) * 60;

    timeToWalkSeconds += restTimeSeconds;

    let result = new Date(null, null, null, null, null, timeToWalkSeconds);
    console.log(result.toTimeString().split(' ')[0]);

    // let hours = Math.floor(timeToWalkSeconds / 3600);
    // let minutes = Math.floor(timeToWalkSeconds / 60) % 60;
    // let seconds = timeToWalkSeconds % 60;

    // console.log([hours, minutes, seconds]
    //     .map(x => x < 10 ? "0" + x : x)
    //     .join(":"))
}

timeToWalk(4000, 0.60, 5);

//05 Calorie Object
function calorieObject(input){
    let result = {};

    result = input.reduce((acc, curr, i, arr) => {
        if(i % 2 === 0){
           acc[curr] = +arr[i+1];
        }
        return acc;
    }, {});

    console.log(result);
}

calorieObject(['Potato', '93', 'Skyr', '63', 'Cucumber', '18', 'Milk', '42']);

//06 Road Radar
function roadRadar(input) {
    const roadSpeedLimit = {
        "residential": 20,
        "city": 50,
        "interstate": 90,
        "motorway": 130
    };

    let speedDifference = input[0] - roadSpeedLimit[input[1]];

    if (speedDifference <= 0) return;
    else if (speedDifference <= 20) console.log("speeding");
    else if (speedDifference <= 40) console.log("excessive speeding");
    else console.log("reckless driving");
}

roadRadar([120, 'interstate']);

//07 Cooking by numbers
function cookingByNumbers(input) {
    const commandsList = {
        "chop": (x) => x / 2,
        "dice": (x) => Math.sqrt(x),
        "spice": (x) => x + 1,
        "bake": (x) => x * 3,
        "fillet": (x) => x * 0.8,
    }

    let num = +input.shift();

    for (let i = 0; i < input.length; i++) {
        num = commandsList[input[i]](num);
        console.log(num);
    }
}

cookingByNumbers(['9', 'dice', 'spice', 'chop', 'bake', 'fillet']);

//08 Validity Checker
function validityChecker(input) {
    let x1 = +input.shift();
    let y1 = +input.shift();
    let x2 = +input.shift();
    let y2 = +input.shift();

    let distanceP1ToCenter = Math.sqrt(x1 ** 2 + y1 ** 2);
    let distanceP2ToCenter = Math.sqrt(x2 ** 2 + y2 ** 2);
    let distanceP1ToP2 = Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);

    function isPointValid(num){
        return num % 1 === 0 ? "valid" : "invalid";
    }
    
    console.log(`{${x1}, ${y1}} to {0, 0} is ${isPointValid(distanceP1ToCenter)}`);
    console.log(`{${x2}, ${y2}} to {0, 0} is ${isPointValid(distanceP2ToCenter)}`);
    console.log(`{${x1}, ${y1}} to {${x2}, ${y2}} is ${isPointValid(distanceP1ToP2)}`);
}

validityChecker([2, 1, 1, 1]);
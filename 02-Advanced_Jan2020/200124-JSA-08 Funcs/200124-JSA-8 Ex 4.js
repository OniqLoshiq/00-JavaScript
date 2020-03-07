//01 Sort Array
function sortArray(inputArr, sortType) {
    let sorterObj = sorter();
    return (sorterObj[sortType](inputArr));

    function sorter() {
        return {
            asc: (arr) => (arr.sort((a, b) => a - b)),
            desc: (arr) => (arr.sort((a, b) => b - a)),
        };
    }
}

sortArray([14, 7, 17, 6, 8], 'asc');

//02 Argument Info
function argumentInfo(...input) {
    let result = input.reduce((acc, curr) => {
        let type = typeof (curr);
        if (!acc[type]) {
            acc[type] = 0;
        }
        acc[type] += 1;
        console.log(`${type}: ${curr}`)
        return acc;
    }, {});

    Object.entries(result).sort((a, b) => b[1] - a[1])
        .map(x => console.log(`${x[0]} = ${x[1]}`));
}

//03 Personal BMI
function personalBMI(...input) {
    let data = [...input];
    let name = data.shift();
    let [age, weight, height] = [...data].map(Number);
    let bmi = Math.round(weight / ((height / 100) ** 2));
    let status = getStatus(bmi);

    let obj = {
        name: name,
        personalInfo: {
            age: age,
            weight: weight,
            height: height,
        },
        BMI: bmi,
        status: status,
    };

    if (bmi >= 30) {
        obj.recommendation = "admission required";
    }

    return obj;

    function getStatus(bmi) {
        if (bmi < 18.5) return "underweight";
        else if (bmi < 25) return "normal";
        else if (bmi < 30) return "overweight";
        else return "obese";
    }
}

//04 Vector Math
function vectorMath() {
    let solver = (function () {
        return {
            add: (a, b) => ([a[0] + b[0], a[1] + b[1]]),
            multiply: (a, b) => ([a[0] * b, a[1] * b]),
            length: (a) => Math.sqrt(a[0] ** 2 + a[1] ** 2),
            dot: (a, b) => (a[0] * b[0] + a[1] * b[1]),
            cross: (a, b) => (a[0] * b[1] - a[1] * b[0])
        };
    })()
}

//05 Breakfast Robot
function breakfastRobot() {
    function solver = (function () {
        let stock = {
            protein: 0,
            carbohydrate: 0,
            fat: 0,
            flavour: 0
        };

        let commandMap = {
            restock,
            prepare,
            report
        };

        let meals = {
            apple: {
                carbohydrate: 1,
                flavour: 2
            },
            lemonade: {
                carbohydrate: 10,
                flavour: 20
            },
            burger: {
                carbohydrate: 5,
                fat: 7,
                flavour: 3
            },
            eggs: {
                protein: 5,
                fat: 1,
                flavour: 1
            },
            turkey: {
                protein: 10,
                carbohydrate: 10,
                fat: 10,
                flavour: 10
            }
        }

        function restock(element, quantity) {
            stock[element] += quantity;
            return "Success";
        }

        function prepare(recipe, quantity) {
            let orderedMeal = Object.assign({}, meals[recipe]);
            Object.keys(orderedMeal).map(x => orderedMeal[x] *= quantity);

            let successfullOrder = true;
            for (const key in orderedMeal) {
                if (orderedMeal.hasOwnProperty(key)) {
                    if (stock[key] < orderedMeal[key]) {
                        successfullOrder = false;
                        return `Error: not enough ${key} in stock`;
                    } else {
                        stock[key] -= orderedMeal[key];
                    }
                }
            }

            if (successfullOrder) {
                return "Success";
            }
        }

        function report() {
            return Object.entries(stock).map(entr => `${entr[0]}=${entr[1]}`).join(" ");
        }

        return function (inputLine) {
            let parameters = inputLine.split(" ");
            if (parameters.length === 1) {
                return commandMap.report();
            } else {
                return commandMap[parameters[0]](parameters[1], +parameters[2]);
            }
        };
    })
}

//06 Function sum
function functionSum(){
    let solver = (function(){
        let sum = 0;

        return function add(x){
            sum += x;
            add.toString = () => sum;
            return add;
        };
    })()
}

//07 Monkey patcher
function monkeyPatcher(){
    let solver = (function () {
        let totalVotes = 0;

        let commandMap = {
            upvote,
            downvote,
            score
        };
        
        function upvote(post){
            post.upvotes++;
            totalVotes++;
        }

        function downvote(post){
            post.downvotes++;
            totalVotes++;
        }

        function score(post){
            let rating = "";

            let ratio = (post.upvotes) / totalVotes * 100;

            if(totalVotes < 10){
                rating = "new";
            } else if (post.upvotes < post.downvotes){
                rating = "unpopular";
            } else if((post.upvotes > 100 || post.downvotes > 100) && ratio <= 66){
                rating = "controversial";
            } else if(ratio > 66){
                rating = "hot";
            } else {
                rating = "new";
            }

            let upvotesToPrint = post.upvotes;
            let downvotesToPrint = post.downvotes;

            if(totalVotes > 50){
                let corection = Math.ceil(Math.max(upvotesToPrint, downvotesToPrint) * 0.25);

                upvotesToPrint += corection;
                downvotesToPrint += corection;
            }

            return [upvotesToPrint, downvotesToPrint, upvotesToPrint - downvotesToPrint, rating];
        }

        function setTotalVotes(upv,dwnv){
            totalVotes = upv + dwnv;
        }

        return {
            call: function (post, command){
                setTotalVotes(post.upvotes, post.downvotes);
                return commandMap[command](post);
            }
        };
    })()
}




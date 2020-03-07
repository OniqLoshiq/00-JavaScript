//01 Point on rectangular border
function pointOnBorder(input){
    let x1 = Number(input.shift());
    let y1 = Number(input.shift());
    let x2 = Number(input.shift());
    let y2 = Number(input.shift());
    let x = Number(input.shift());
    let y = Number(input.shift());

    let firstCondition = (x == x1 || x == x2) && (y >= y1 && y <= y2);
    let secondCondition = (y == y1 || y == y2) && (x >= x1 && x <= x2);

    if(firstCondition || secondCondition){
        console.log('Border');
    } else {
        console.log('Inside / Outside');
    }
}

pointOnBorder(['2','-3','12','3','8','-1']);
pointOnBorder(['2','-3','12','3','12','-1']);

//02 Cinema
function cinema(input){
    let typeProjection = input.shift();
    let rows = Number(input.shift());
    let columns = Number(input.shift());

    let income = rows * columns;

    if(typeProjection == "Premiere"){
        income *= 12;
    } else if (typeProjection == "Normal"){
        income *= 7.5;
    } else if (typeProjection == "Discount"){
        income *= 5;
    }

    console.log(income.toFixed(2) + ' leva');
}

cinema(['Premiere','10','12']);

//03 Summer outfit
function summerOutfit(input){
    let degrees = Number(input.shift());
    let dayTime = input.shift();

    let outfit = "";
    let shoes = "";

    if(degrees >= 10 && degrees <= 18){
        if(dayTime == "Morning"){
            outfit = "Sweatshirt";
            shoes = "Sneakers";
        } else if(dayTime == "Afternoon" || dayTime == "Evening"){
            outfit = "Shirt";
            shoes = "Moccasins";
        }
    } else if(degrees > 18 && degrees <= 24){
        if(dayTime == "Afternoon"){
            outfit = "T-Shirt";
            shoes = "Sandals";
        } else if(dayTime == "Morning" || dayTime == "Evening"){
            outfit = "Shirt";
            shoes = "Moccasins";
        }
    } else if(degrees >= 25){
        if(dayTime == "Morning"){
            outfit = "T-Shirt";
            shoes = "Sandals";
        } else if(dayTime == "Afternoon"){
            outfit = "Swim Suit";
            shoes = "Barefoot";
        } else if(dayTime == "Evening"){
            outfit = "Shirt";
            shoes = "Moccasins";
        }
    }

    console.log(`It's ${degrees} degrees, get your ${outfit} and ${shoes}.`);
}

summerOutfit(['16','Morning']);

//04 New house
function newHouse(input){
    let flowerType = input.shift();
    let flowerNumber = Number(input.shift());
    let budget = Number(input.shift());

    let rosePrice = 5;
    let dahliaPrice = 3.8;
    let tulipsPrice = 2.8;
    let narcissusPrice = 3;
    let gladiolusPrice = 2.5;

    let expenses = 0;

    switch(flowerType){
        case "Roses": 
            expenses = flowerNumber * rosePrice;

            if(flowerNumber > 80){
                expenses *= 0.9;
            }
        break;
        case "Dahlias": 
        expenses = flowerNumber * dahliaPrice;

            if(flowerNumber > 90){
                expenses *= 0.85;
            }
        break;
        case "Tulips": 
        expenses = flowerNumber * tulipsPrice;

        if(flowerNumber > 80){
            expenses *= 0.85;
        }
        break;
        case "Narcissus": 
        expenses = flowerNumber * narcissusPrice;

        if(flowerNumber < 120){
            expenses *= 1.15;
        }
        break;
        case "Gladiolus": 
        expenses = flowerNumber * gladiolusPrice;

        if(flowerNumber < 80){
            expenses *= 1.2;
        }
        break;
        default: break;
    }

    let difference = Math.abs(budget - expenses);

    if(budget >= expenses){
        console.log(`Hey, you have a great garden with ${flowerNumber} ${flowerType} and ${difference.toFixed(2)} leva left.`);
    } else {
        console.log(`Not enough money, you need ${difference.toFixed(2)} leva more.`);
    }
}

newHouse(['Roses','55', '250']);

//05 Fishing boat
function fishingBoat(input){
    let budget = Number(input.shift());
    let season = input.shift();
    let numberOfFishermen = Number(input.shift());

    let cost = 0;

    if(season == "Spring"){
        cost += 3000;
    } else if(season == "Summer" || season == "Autumn"){
        cost += 4200;
    } else if(season == "Winter"){
        cost += 2600;
    }

    let discount = 0;

    if(numberOfFishermen <= 6){
        discount += 10;
    } else if(numberOfFishermen > 6 && numberOfFishermen <= 11){
        discount += 15;
    } else if(numberOfFishermen > 11){
        discount += 25;
    }

    cost *= (1 - (discount / 100));

    if(numberOfFishermen % 2 == 0 && season != "Autumn"){
        cost *= 0.95;
    }

    let difference = Math.abs(budget - cost);

    if(budget >= cost){
        console.log(`Yes! You have ${difference.toFixed(2)} leva left.`);
    } else {
        console.log(`Not enough money! You need ${difference.toFixed(2)} leva.`);
    }
}

fishingBoat(['3000','Summer', '11']);

//06 Journey
function journey(input){
    let budget = Number(input.shift());
    let season = input.shift();

    let destination ;
    let typeOfJouney ;
    let expenses = 0;

    if(budget <= 100){
        destination = "Bulgaria";

        if(season == "summer"){
            expenses = budget * 0.3;
            typeOfJouney = "Camp";
        } else if (season == "winter"){
            expenses = budget * 0.7;
            typeOfJouney = "Hotel";
        }
    } else if(budget <= 1000){
        destination = "Balkans";

        if(season == "summer"){
            expenses = budget * 0.4;
            typeOfJouney = "Camp";
        } else if (season == "winter"){
            expenses = budget * 0.8;
            typeOfJouney = "Hotel";
        }
    } else if(budget > 1000){
        destination = "Europe";

        expenses = budget * 0.9;
        typeOfJouney = "Hotel";
    }

    console.log(`Somewhere in ${destination}`);
    console.log(`${typeOfJouney} - ${expenses.toFixed(2)}`);
}

journey(['50','summer']);

//07 Operation between numbers
function operationBetweenNumbers(input){
    let number1 = Number(input.shift());
    let number2 = Number(input.shift());
    let operator = input.shift();

    let operatorResult = 0;

    if((operator == "/" || operator == "%") && number2 == 0){
        console.log(`Cannot divide ${number1} by zero`)
    } else if (operator == "/"){
        operatorResult = number1 / number2;

        let printResult = `${number1} ${operator} ${number2} = ${operatorResult.toFixed(2)}`;
        console.log(printResult);
    } else {
        switch(operator){
            case "+": operatorResult = number1 + number2; break;
            case "-": operatorResult = number1 - number2; break;
            case "*": operatorResult = number1 * number2; break;
            case "%": operatorResult = number1 % number2; break;
        }
        
        let printResult = `${number1} ${operator} ${number2} = ${operatorResult}`;

        if(operator == "%"){
            console.log(printResult);
        } else {
            if(operatorResult % 2 == 0){
                console.log(printResult + " - even");
            } else {
                console.log(printResult + " - odd");
            }
        }
    }
} 

operationBetweenNumbers(['10','12', '+']);

//08 Hotel room
function hotelRoom(input){ 
    let month = input.shift();
    let days = Number(input.shift());
   
    let studioCost = 0.0;
    let apartmentCost = 0.0;

    if(month == "May" || month == "October"){
        studioCost = days * 50;
        apartmentCost = days * 65;

        if(days > 14){
            studioCost *= 0.7;
        } else if (days > 7){
            studioCost *= 0.95;
        }
    } else if (month == "June" || month == "September"){
        studioCost = days * 75.2;
        apartmentCost = days * 68.7;

        if(days > 14){
            studioCost *= 0.8;
        }
    } else if (month == "July" || month == "August"){
        studioCost = days * 76;
        apartmentCost = days * 77;
    }

    if(days > 14){
        apartmentCost *= 0.9;
    }

    console.log(`Apartment: ${apartmentCost.toFixed(2)} lv.`);
    console.log(`Studio: ${studioCost.toFixed(2)} lv.`);
}

hotelRoom(['May', '15']);

//09 On time for the exam
function onTime(input) {
    let examHour = Number(input.shift());
    let examMinutes = Number(input.shift());
    let arrivalHours = Number(input.shift());
    let arrivalMinutes = Number(input.shift());

    let examTotalMinutes = examHour * 60 + examMinutes;
    let arrivalTotalMinutes = arrivalHours * 60 + arrivalMinutes;

    let difference = Math.abs(examTotalMinutes - arrivalTotalMinutes);

    if (examTotalMinutes > arrivalTotalMinutes) {
        if (difference > 30) {
            console.log('Early');
        } else if (difference <= 30) {
            console.log('On time');
        }

        if (difference <= 59) {
            console.log(`${difference} minutes before the start`);
        } else {
            let minutes = difference % 60;
            let minutesToPrint = minutes < 10 ? "0" + minutes : minutes.toString();
            console.log(`${parseInt(difference / 60)}:${minutesToPrint} hours before the start`);
        }
    } else if (examTotalMinutes < arrivalTotalMinutes) {
        console.log('Late');

        if (difference <= 59) {
            console.log(`${difference} minutes after the start`);
        } else {
            let minutes = difference % 60;
            let minutesToPrint = minutes < 10 ? "0" + minutes : minutes.toString();
            console.log(`${parseInt(difference / 60)}:${minutesToPrint} hours after the start`);
        }
    } else {
        console.log('On time');
    }
}

onTime(['9', '30', '9', '50']);
onTime(['11', '30', '8', '12']);
onTime(['11', '30', '12', '29']);

//10 Volleyball
function volleyball(input) {
    let yearType = input.shift();
    let holidays = Number(input.shift());
    let timesTravelingHome = Number(input.shift());

    let weekendsInSofia = 48 - timesTravelingHome;
    let freeWeekends = weekendsInSofia * 3 / 4;

    let playTime = freeWeekends + timesTravelingHome + (holidays * 2 / 3);

    if (yearType == "leap") {
        playTime *= 1.15;
    }

    console.log(Math.floor(playTime));
}

volleyball(['leap', '5', '2']);
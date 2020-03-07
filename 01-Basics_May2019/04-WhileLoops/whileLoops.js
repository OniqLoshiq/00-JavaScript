//01 Old Library
function oldLibrary(input) {
    let bookTitle = input.shift();
    let totalBooks = Number(input.shift());

    let counter = 0;
    let bookIsFound = false;

    while (counter < totalBooks) {
        let nextBook = input.shift();

        if (nextBook == bookTitle) {
            bookIsFound = true;
            break;
        }

        counter++;
    }

    if (bookIsFound) {
        console.log(`You checked ${counter} books and found it.`);
    } else {
        console.log(`The book you search is not here!`);
        console.log(`You checked ${counter} books.`);
    }
}

oldLibrary(['Troy', '8', 'Stronger', 'Life Style', 'Troy']);

//02 Exam preparation
function examPreparation(input) {
    let numberOfAllowedPoorGrades = Number(input.shift());

    let task;
    let totalScore = 0;
    let numberOfTasks = 0;
    let lastTask;
    let numberOfPoorGrades = 0;

    while ((task = input.shift()) != "Enough") {
        let taskGrade = Number(input.shift());

        totalScore += taskGrade;
        lastTask = task;
        numberOfTasks++;

        if (taskGrade <= 4) numberOfPoorGrades++;
        if (numberOfAllowedPoorGrades == numberOfPoorGrades) break;
    }

    if (numberOfAllowedPoorGrades != numberOfPoorGrades) {
        console.log(`Average score: ${(totalScore / numberOfTasks).toFixed(2)}`);
        console.log(`Number of problems: ${numberOfTasks}`);
        console.log(`Last problem: ${lastTask}`);
    } else {
        console.log(`You need a break, ${numberOfPoorGrades} poor grades.`)
    }
}

examPreparation(['3', 'Money', '6', 'Story', '4', 'Spring Time', '5', 'Bus', '6', 'Enough']);

//03 Vacation
function vacation(input) {
    let vacationCost = Number(input.shift());
    let availableMoney = Number(input.shift());

    let consecutiveSpendingDays = 0;
    let days = 0;

    while (vacationCost > availableMoney && consecutiveSpendingDays < 5) {
        let operation = input.shift();
        let money = Number(input.shift());

        days++;

        if (operation == "save") {
            availableMoney += money;
            consecutiveSpendingDays = 0;
        } else if (operation == "spend") {
            consecutiveSpendingDays++;
            availableMoney -= money;

            if (availableMoney < 0) availableMoney = 0;
        }
    }

    if (consecutiveSpendingDays == 5) {
        console.log(`You can't save the money.`);
        console.log(days);
    } else {
        console.log(`You saved the money for ${days} days.`);
    }
}

vacation(['2000', '1000', 'spend', '1200', 'save', '2000']);

//04 Walking
function walking(input) {
    let stepsToReach = 10000;
    let totalSteps = 0;

    while (totalSteps < stepsToReach) {
        let command = input.shift();
        let steps = 0;

        if (command == "Going home") {
            steps = Number(input.shift());
            totalSteps += steps;
            break;
        } else {
            steps = Number(command);
            totalSteps += steps;
        }
    }

    if (totalSteps >= stepsToReach) {
        console.log('Goal reached! Good job!');
    } else {
        let stepsLeft = stepsToReach - totalSteps;
        console.log(`${stepsLeft} more steps to reach goal.`)
    }
}

walking(['1000', '1500', '2000', '6500']);
walking(['1500', '300', '2500', '3000', 'Going home', '200']);

//05 Coins
function coins(input) {
    let change = Math.floor(Number(input.shift()) * 100);
    let coins = 0;

    coins += parseInt(change / 200);
    change %= 200;

    coins += parseInt(change / 100);
    change %= 100;

    coins += parseInt(change / 50);
    change %= 50;

    coins += parseInt(change / 20);
    change %= 20;

    coins += parseInt(change / 10);
    change %= 10;

    coins += parseInt(change / 5);
    change %= 5;

    coins += parseInt(change / 2);
    change %= 2;

    coins += change;

    console.log(coins);
}

coins(['1.23']);
coins(['0.56']);
coins(['2.73']);

//06 Cake
function cake(input){
    let cakeLenght = Number(input.shift());
    let cakeWidth = Number(input.shift());

    let totalCakePieces = cakeLenght * cakeWidth;
    let command;

    while((command = input.shift()) != "STOP"){
        totalCakePieces -= command;

        if(totalCakePieces < 0){
            break;
        }
    }

    if(totalCakePieces >= 0){
        console.log(`${totalCakePieces} pieces are left.`)
    } else {
        console.log(`No more cake left! You need ${Math.abs(totalCakePieces)} pieces more.`)
    }
}

cake(['10','10','20','20','20','20','21']);
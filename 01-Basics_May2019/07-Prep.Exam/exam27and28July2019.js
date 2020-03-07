//01 Savings
function savings(input) {
    let income = Number(input.shift());
    let months = Number(input.shift());
    let monthlyExpenses = Number(input.shift());

    let moneyToSavePerMonth = income - monthlyExpenses - (income * 0.3);
    let percenetSavedMoneyPerMonth = moneyToSavePerMonth / income * 100;
    let savedMoney = moneyToSavePerMonth * months;

    console.log(`She can save ${percenetSavedMoneyPerMonth.toFixed(2)}%`);
    console.log(savedMoney.toFixed(2));
}

savings(['1500', '3', '800']);
savings(['2050', '5', '900']);

//01 Lemonade Stand
function lemonadeStand(input) {
    let lemons = Number(input.shift());
    let sugar = Number(input.shift());
    let water = Number(input.shift());

    let pricePerCupLemonade = 1.2;
    let cupSize = 150;

    let lemonJuice = lemons * 980;
    let lemonade = lemonJuice + water * 1000 + 0.30 * sugar;

    let soldCups = Math.floor(lemonade / cupSize);
    let earnedMoney = soldCups * pricePerCupLemonade;

    console.log(`All cups sold: ${soldCups}`);
    console.log(`Money earned: ${earnedMoney.toFixed(2)}`);
}

lemonadeStand(['5', '3.5', '5']);
lemonadeStand(['250', '20', '100']);

//02 Reservation
function reservation(input) {
    let dayOfReservation = input.shift();
    let monthOfReservation = input.shift();
    let dayOfVacation = input.shift();
    let monthOfVacation = input.shift();
    let dayOfLeaving = input.shift();
    let monthOfLeaving = input.shift();

    let daysOfVacation = dayOfLeaving - dayOfVacation;
    let constOfVacation = 0.0;

    if (monthOfVacation != monthOfReservation) {
        constOfVacation = daysOfVacation * 25 * 0.8;
    } else {
        let differenceInDays = dayOfVacation - dayOfReservation;

        if (differenceInDays < 10) {
            constOfVacation = daysOfVacation * 30;
        } else {
            constOfVacation = daysOfVacation * 25;
        }
    }

    console.log(`Your stay from ${dayOfVacation}/${monthOfVacation} to ${dayOfLeaving}/${monthOfLeaving} will cost ${constOfVacation.toFixed(2)}`);
}

reservation(['21', '7', '28', '8', '30', '8']);
reservation(['10', '5', '15', '5', '18', '5']);

//02 Summer shopping
function summerShopping(input) {
    let budget = Number(input.shift());
    let towel = Number(input.shift());
    let discount = Number(input.shift());

    let sunshade = towel * 2 / 3;
    let flipFlops = 0.75 * sunshade;
    let bag = (flipFlops + towel) / 3;

    let sumToPay = (towel + flipFlops + sunshade + bag) * (1 - discount / 100);
    let moneyDifference = Math.abs(budget - sumToPay);

    if (budget - sumToPay >= 0) {
        console.log(`Annie's sum is ${sumToPay.toFixed(2)} lv. She has ${moneyDifference.toFixed(2)} lv. left.`);
    } else {
        console.log(`Annie's sum is ${sumToPay.toFixed(2)} lv. She needs ${moneyDifference.toFixed(2)} lv. more.`);
    }
}

summerShopping(['40', '15', '5']);
summerShopping(['25', '6', '10']);
summerShopping(['30', '17', '3']);

//03 Luggage tax
function luggageTax(input) {
    let suitcaseWidth = Number(input.shift());
    let suitcaseHeight = Number(input.shift());
    let suitcaseDept = Number(input.shift());
    let isPriorityInput = input.shift();

    let isPriority = isPriorityInput == 'true';
    let suitcaseSize = suitcaseDept * suitcaseHeight * suitcaseWidth;
    let tax = 0.0;

    if (suitcaseSize <= 50) {
        tax = 0;
    } else if (suitcaseSize > 50 && suitcaseSize <= 100) {
        tax = isPriority ? 0 : 25;
    } else if (suitcaseSize > 100 && suitcaseSize <= 200) {
        tax = isPriority ? 10 : 50;
    } else if (suitcaseSize > 200 && suitcaseSize <= 300) {
        tax = isPriority ? 20 : 100;
    }

    console.log(`Luggage tax: ${tax.toFixed(2)}`);
}

luggageTax(['5', '7', '7', 'false']);
luggageTax(['2', '5', '3', 'false']);
luggageTax(['10', '4', '5', 'true']);
luggageTax(['5', '4', '3', 'true']);

//03 Cruise shipt
function cruiseShip(input) {
    let cruiseType = input.shift();
    let cabinType = input.shift();
    let days = Number(input.shift());

    let cabinPrice = 0.0;

    if (cruiseType == "Aegean") {
        switch (cabinType) {
            case "standard cabin": cabinPrice = 23; break;
            case "cabin with balcony": cabinPrice = 26.6; break;
            case "apartment": cabinPrice = 39.8; break;
        }
    } else if (cruiseType == "Adriatic") {
        switch (cabinType) {
            case "standard cabin": cabinPrice = 22.99; break;
            case "cabin with balcony": cabinPrice = 25; break;
            case "apartment": cabinPrice = 34.99; break;
        }
    } else if (cruiseType == "Mediterranean") {
        switch (cabinType) {
            case "standard cabin": cabinPrice = 27.5; break;
            case "cabin with balcony": cabinPrice = 30.2; break;
            case "apartment": cabinPrice = 40.5; break;
        }
    }

    let discountCoeff = days > 7 ? 0.75 : 1;

    let cruiseCost = cabinPrice * 4 * days * discountCoeff;

    console.log(`Annie's holiday in the ${cruiseType} sea costs ${cruiseCost.toFixed(2)} lv.`);
}

cruiseShip(['Aegean', 'standard cabin', '10']);
cruiseShip(['Adriatic', 'apartment', '5']);
cruiseShip(['Mediterranean', 'cabin with balcony', '12']);

//04 Best plane tickests
function bestPlaneTickets(input) {
    let lowestWaitingFlightName = input.shift();
    let lowestWaitingFlightCostInEUR = Number(input.shift());
    let lowestWaitingFlightWaitingMinutes = Number(input.shift());

    let command = "";

    while ((command = input.shift()) != "End") {
        let flightName = command;
        let flightCostInEUR = Number(input.shift());
        let flightWaitingMinutes = Number(input.shift());

        if (flightWaitingMinutes < lowestWaitingFlightWaitingMinutes) {
            lowestWaitingFlightWaitingMinutes = flightWaitingMinutes;
            lowestWaitingFlightCostInEUR = flightCostInEUR;
            lowestWaitingFlightName = flightName;
        }
    }

    let lowestWaitingFlightCostInBGN = lowestWaitingFlightCostInEUR * 1.96;
    let hoursToWait = parseInt(lowestWaitingFlightWaitingMinutes / 60);
    let minutesToWait = lowestWaitingFlightWaitingMinutes % 60;

    console.log(`Ticket found for flight ${lowestWaitingFlightName} costs ${lowestWaitingFlightCostInBGN.toFixed(2)} leva with ${hoursToWait}h ${minutesToWait}m stay`)
}

bestPlaneTickets(['W64301', '60', '140', 'W30510', '110', '40', 'W51440', '160', '70', 'FR0066', '75', '75', 'End']);

//04 Darts tournament
function dartsTournament(input) {
    let currentPoints = Number(input.shift());

    let numberOfMoves = 0;

    while (currentPoints > 0) {
        let sector = input.shift();
        numberOfMoves++;
        let points = 0;

        if (sector == "bullseye") break;

        switch (sector) {
            case "number section":
                points = Number(input.shift()); break;
            case "double ring":
                points = Number(input.shift()) * 2; break;
            case "triple ring":
                points = Number(input.shift()) * 3; break;
        }
        currentPoints -= points;
    }

    if (currentPoints > 0) {
        console.log(`Congratulations! You won the game with a bullseye in ${numberOfMoves} moves!`);
    } else if (currentPoints == 0) {
        console.log(`Congratulations! You won the game in ${numberOfMoves} moves!`);
    } else {
        console.log(`Sorry, you lost. Score difference: ${Math.abs(currentPoints)}.`);
    }
}

dartsTournament(['150', 'double ring', '20', 'triple ring', '10', 'number section', '20', 'triple ring', '20']);
dartsTournament(['101', 'triple ring', '7', 'double ring', '19', 'bullseye']);
dartsTournament(['75', 'triple ring', '17', 'number section', '16', 'triple ring', '13', 'double ring', '10']);

//05 Seats
function seats(input) {
    let seats = Number(input.shift());

    for (let i = 0; i < seats; i++) {
        let code = input.shift();
        let number = "";

        if (code.length == 4) {
            let firstSymbolCode = code.charCodeAt(0);

            if (firstSymbolCode >= 65 && firstSymbolCode <= 90) {
                number = code[0] + code[1] + code[2];
            } else {
                number = code[3] + code[1] + code[2];
            }
        } else {
            number = code[0] + code.charCodeAt(1);
        }

        console.log(`Seat decoded: ${number}`);
    }
}

seats(['3', '042W', 'W981', 'W24578']);
seats(['4', 'Y456', 'Y8909', 'Y8976', 'L3472']);

//05 Cruise games
function cruiseGames(input) {
    let playerName = input.shift();
    let playedGames = Number(input.shift());

    let volleyballPoints = 0;
    let tennisPoints = 0;
    let badmintonPoints = 0;

    let volleyballGames = 0;
    let tennisGames = 0;
    let badmintonGames = 0;

    let isVolleyballScoreValid = true;
    let isTennisScoreValid = true;
    let isBadmintonScoreValid = true;

    for (let i = 0; i < playedGames; i++) {
        let gameName = input.shift();
        let points = Number(input.shift());

        switch (gameName) {
            case "volleyball":
                volleyballPoints += points * 1.07;
                volleyballGames++;
                break;
            case "tennis":
                tennisPoints += points * 1.05;
                tennisGames++;
                break;
            case "badminton":
                badmintonPoints += points * 1.02;
                badmintonGames++;
                break;
        }
    }

    let volleyballAverageScore = 0;
    let tennisAverageScore = 0;
    let badmintonAverageScore = 0;

    if (volleyballGames > 0) {
        volleyballAverageScore = volleyballPoints / volleyballGames;

        if (volleyballAverageScore < 75)
            isVolleyballScoreValid = false;
    }

    if (tennisGames > 0) {
        tennisAverageScore = tennisPoints / tennisGames;

        if (tennisAverageScore < 75)
            isTennisScoreValid = false;
    }

    if (badmintonGames > 0) {
        badmintonAverageScore = badmintonPoints / badmintonGames;

        if (badmintonAverageScore < 75)
            isBadmintonScoreValid = false;
    }

    let totalPoints = Math.floor(volleyballPoints + badmintonPoints + tennisPoints);

    if (isVolleyballScoreValid && isTennisScoreValid && isBadmintonScoreValid) {
        console.log(`Congratulations, ${playerName}! You won the cruise games with ${totalPoints} points.`);
    } else {
        console.log(`Sorry, ${playerName}, you lost. Your points are only ${totalPoints}.`);
    }
}

cruiseGames(['Pepi', '3', 'volleyball', '78', 'tennis', '98', 'badminton', '105']);
cruiseGames(['Annie', '5', 'badminton', '34', 'tennis', '76', 'badminton', '10', 'volleyball', '62', 'badminton', '56']);
cruiseGames(['Ivan', '7', 'volleyball', '70', 'tennis', '100', 'badminton', '64', 'volleyball', '125', 'tennis', '62', 'tennis', '72', 'badminton', '87']);

//06 Trip expenses
function tripExpenses(input) {
    let days = Number(input.shift());
    let dailyMoney = 60;

    for (let i = 0; i < days; i++) {
        let command = "";
        let boughtProducts = 0;

        while (dailyMoney > 0 && (command = input.shift()) != "Day over") {
            let productPrice = Number(command);

            if (productPrice < dailyMoney) {
                boughtProducts++;
                dailyMoney -= productPrice;
            } else if (productPrice == dailyMoney) {
                boughtProducts++;
                dailyMoney -= productPrice;
                console.log(`Daily limit exceeded! You've bought ${boughtProducts} products.`)
                break;
            }
        }

        if (dailyMoney > 0) {
            console.log(`Money left from today: ${dailyMoney.toFixed(2)}. You've bought ${boughtProducts} products.`);
        }

        dailyMoney += 60;
    }
}

tripExpenses(['3', '20', '40', '40', '15', 'Day over', '15', '5', '10', '17', '10', 'Day over']);
tripExpenses(['2', 'Day over', '100', '20']);
tripExpenses(['2', 'Day over', '130', '100', '40', '20']);

//06 Baking competition
function backingCompetition(input) {
    let participants = Number(input.shift());

    let charityMoney = 0.0;
    let totalSweets = 0;

    for (let i = 0; i < participants; i++) {
        let participantName = input.shift();
        let command = "";
        let cakes = 0;
        let cookies = 0;
        let waffles = 0;

        while ((command = input.shift()) != "Stop baking!") {
            let sweetType = command;
            let sweetPieces = Number(input.shift());

            totalSweets += sweetPieces;

            switch (sweetType) {
                case "cookies":
                    cookies += sweetPieces;
                    charityMoney += sweetPieces * 1.5;
                    break;
                case "cakes":
                    cakes += sweetPieces;
                    charityMoney += sweetPieces * 7.8;
                    break;
                case "waffles":
                    waffles += sweetPieces;
                    charityMoney += sweetPieces * 2.3;
                    break;
            }
        }

        console.log(`${participantName} baked ${cookies} cookies, ${cakes} cakes and ${waffles} waffles.`);
    }

    console.log(`All bakery sold: ${totalSweets}`);
    console.log(`Total sum for charity: ${charityMoney.toFixed(2)} lv.`)
}

backingCompetition(['3', 'Iva', 'cookies', '5', 'cakes', '3', 'Stop baking!', 'George', 'cakes', '7', 'waffles', '2', 'Stop baking!', 'Ivan', 'cookies', '6', 'Stop baking!']);
backingCompetition(['2', 'Annie', 'cakes', '3', 'waffles', '6', 'cookies', '2', 'Stop baking!', 'Petya', 'waffles', '8', 'Stop baking!']);
backingCompetition(['3', 'George', 'cookies', '10', 'Stop baking!', 'Annie', 'waffles', '8', 'Stop baking!', 'Ivan', 'cookies', '6', 'waffles', '3', 'Stop baking!']);

//01 Sum Seconds
function sumSeconds(input){
    let secondsFirst = Number(input.shift());
    let secondsSecond = Number(input.shift());
    let secondsThird = Number(input.shift());

    let totalTime = secondsFirst + secondsSecond + secondsThird;
    let minutes = parseInt(totalTime / 60);
    let seconds = totalTime % 60;

    if(seconds < 10){
        console.log(minutes + ':0' + seconds);
    } else {
        console.log(minutes + ':' + seconds);
    }
}

sumSeconds(['35','45','44']);

//02 Bonus score
function bonusScore(input){
    let number = Number(input);

    let bonusPoints = 0;

    if(number <= 100)
    {
        bonusPoints = 5;
    } else if (number <= 1000){
        bonusPoints = number * 0.2;
    } else if (number > 1000){
        bonusPoints = number * 0.1;
    }

    if(number % 2 == 0){
        bonusPoints += 1;
    }

    if(number % 10 == 5){
        bonusPoints += 2;
    }

    console.log(bonusPoints);
    console.log(bonusPoints + number);
}

bonusScore(2703);

//03 Speed info
function speedInfo(input){
    let speed = Number(input);

    if(speed <= 10) {
        console.log('slow');
    } else if(speed <= 50){
        console.log('average');
    } else if(speed <= 150){
        console.log('fast');
    } else if(speed <= 1000){
        console.log('ultra fast');
    } else {
        console.log('extremely fast');
    }
}

speedInfo(160);

//04 Metric convertor
function metricConvertor(input){
    let inputNumber = Number(input.shift());
    let inputMetric = input.shift();
    let convertedMetric = input.shift();

    let outputNumber = 0;

    if(inputMetric == convertedMetric){
        outputNumber = inputNumber;
    }

    if(convertedMetric == "mm"){
        if (inputMetric == "cm"){
            outputNumber = inputNumber * 10;
        } else if (inputMetric == "m"){
            outputNumber = inputNumber * 1000;
        }
    } else if (convertedMetric == "cm"){
        if(inputMetric == "mm"){
            outputNumber = inputNumber / 10;
        } else if (inputMetric == "m"){
            outputNumber = inputNumber * 100;
        }
    } else if (convertedMetric == "m"){
        if(inputMetric == "mm"){
            outputNumber = inputNumber / 1000;
        } else if (inputMetric == "cm"){
            outputNumber = inputNumber / 100;
        }
    }

    console.log(outputNumber.toFixed(3));
}

metricConvertor(['12','mm','m']);

//05 Time + 15 minutes
function add15Minutes(input){
    let hours = Number(input.shift());
    let minutes = Number(input.shift());

    let totalMinutes = hours * 60 + minutes + 15;
    let minutesToPrint = totalMinutes % 60;
    let hoursToPrint = Math.floor(totalMinutes / 60);

    if(hoursToPrint > 23){
        hoursToPrint = 0;
    }

    if(minutesToPrint < 10){
        console.log(`${hoursToPrint}:0${minutesToPrint}`);
    } else {
        console.log(`${hoursToPrint}:${minutesToPrint}`);
    }
}

add15Minutes(['23','59']);

//06 GodzillaVsKong
function godzillaVsKong(input){
    let budget = Number(input.shift());
    let supernumeraries = Number(input.shift());
    let clothesPricePerSupernumerary = Number(input.shift());

    let decorPrice = budget * 0.1;
    let supernumeraryExpenses = supernumeraries * clothesPricePerSupernumerary;

    if(supernumeraries > 150){
        supernumeraryExpenses *= 0.9;
    }

    let totalExpenses = decorPrice + supernumeraryExpenses;

    let differenceMoney = Math.abs(budget - totalExpenses);

    if(budget >= totalExpenses){
        console.log('Action!');
        console.log('Wingard starts filming with '+ differenceMoney.toFixed(2) + ' leva left.');
    } else {
        console.log('Not enough money!');
        console.log('Wingard needs '+ differenceMoney.toFixed(2) + ' leva more.');
    }
}

godzillaVsKong(['15437.62','186','57.99']);

//07 WorldSwimmingRecord
function wordSwimmingRecord(input){
    let recordInSeconds = Number(input.shift());
    let distanceInMeters = Number(input.shift());
    let timeForOneMeterInSeconds = Number(input.shift());

    let slowingCycles = Math.floor(distanceInMeters / 15);
    let totalSwimingTimeInSeconds = distanceInMeters * timeForOneMeterInSeconds + slowingCycles * 12.5;

    let difference = Math.abs(recordInSeconds - totalSwimingTimeInSeconds);

    if(recordInSeconds > totalSwimingTimeInSeconds){
        console.log(`Yes, he succeeded! The new world record is ${totalSwimingTimeInSeconds.toFixed(2)} seconds.`);
    } else {
        console.log(`No, he failed! He was ${difference.toFixed(2)} seconds slower.`);
    }
}

wordSwimmingRecord(['10464','1500','20']);

//08 Scholarship
function scholarship(input){
    let income = Number(input.shift());
    let averageScore = Number(input.shift());
    let minimumSalary = Number(input.shift());

    let socialScholarship = minimumSalary * 0.35;
    let scoreScholarship = averageScore * 25;

    let canGetSocialScholarship = averageScore > 4.5 && income < minimumSalary;
    let canGetScoreScholarship = averageScore >= 5.5;

    if(canGetSocialScholarship && canGetScoreScholarship){
        if(socialScholarship > scoreScholarship){
            console.log(`You get a Social scholarship ${parseInt(socialScholarship)} BGN`);
        } else {
            console.log(`You get a scholarship for excellent results ${parseInt(scoreScholarship)} BGN`);
        }
    } else if(canGetSocialScholarship){
        console.log(`You get a Social scholarship ${parseInt(socialScholarship)} BGN`);
    } else if(canGetScoreScholarship){
        console.log(`You get a scholarship for excellent results ${parseInt(scoreScholarship)} BGN`);
    } else {
        console.log('You cannot get a scholarship!');
    }
}

scholarship(['480.00','4.60','450.00']);
scholarship(['300.00','5.65','420.00']);
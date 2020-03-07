//01 Matrix
function matrix(input) {
    let a = Number(input.shift());
    let b = Number(input.shift());
    let c = Number(input.shift());
    let d = Number(input.shift());

    for (let num1 = a; num1 <= b; num1++) {
        for (let num2 = a; num2 <= b; num2++) {
            for (let num3 = c; num3 <= d; num3++) {
                for (let num4 = c; num4 <= d; num4++) {
                    let sumD1 = num1 + num4;
                    let sumD2 = num2 + num3;

                    if (sumD1 == sumD2 && num1 != num2 && num3 != num4) {
                        console.log(`${num1}${num2}`);
                        console.log(`${num3}${num4}`);
                        console.log();
                    }
                }
            }
        }
    }
}

matrix(['5', '7', '5', '6']);

//02 Number pyramid
function numberPyramid(input) {
    let n = Number(input.shift());

    let num = 1;
    let shouldBreak = false;
    let currentRow = "";

    for (let rows = 1; rows <= n; rows++) {
        for (let cols = 1; cols <= rows; cols++) {
            if (num > n) {
                shouldBreak = true;
                break;
            }

            currentRow += num + " ";
            num++;
        }
        console.log(currentRow);
        currentRow = "";
        if (shouldBreak) {
            break;
        }
    }
}

numberPyramid(['15']);

//03 Coding
function coding(input) {
    let num = Number(input.shift());
    let numSymbols = num.toString();

    for (let i = 0; i < numSymbols.length; i++) {
        let currentNum = num % 10;
        num = parseInt(num / 10);

        if (currentNum == 0) {
            console.log('ZERO');
        } else {
            let symbolToRepat = String.fromCharCode(currentNum + 33);
            console.log(symbolToRepat.repeat(currentNum));
        }
    }
}

coding(['2049']);
coding(['123456789']);

//04 Equal sums even odd position
function equalSumOfEvenAndOddPosition(input) {
    let num1 = Number(input.shift());
    let num2 = Number(input.shift());
    let printResult = "";

    for (let i = num1; i <= num2; i++) {
        let oddPosSum = 0;
        let evenPosSum = 0;

        let num = i;

        for (let y = 0; y < 6; y++) {
            let currentNum = num % 10;
            num = parseInt(num / 10);

            if (y % 2 == 0) {
                evenPosSum += currentNum;
            } else {
                oddPosSum += currentNum;
            }
        }

        if (oddPosSum == evenPosSum) {
            printResult += i + " ";
        }
    }

    console.log(printResult);
}

equalSumOfEvenAndOddPosition(['100000', '100050']);
equalSumOfEvenAndOddPosition(['299900', '300000']);

//05 Equal sum of right and left position
function equalSumOfRightAndLeftPosition(input) {
    let num1 = Number(input.shift());
    let num2 = Number(input.shift());
    let printResult = "";

    for (let i = num1; i <= num2; i++) {
        let rightPosSum = 0;
        let leftPosSum = 0;
        let middleNum = 0;

        let num = i;

        for (let y = 0; y < 5; y++) {
            let currentNum = num % 10;
            num = parseInt(num / 10);

            if (y <= 1) {
                rightPosSum += currentNum;
            } else if (y > 2) {
                leftPosSum += currentNum;
            } else if (y == 2) {
                middleNum = currentNum;
            }
        }

        if (rightPosSum < leftPosSum) {
            rightPosSum += middleNum;
        } else if (leftPosSum < rightPosSum) {
            leftPosSum += middleNum;
        }

        if (rightPosSum == leftPosSum) {
            printResult += i + " ";
        }
    }

    console.log(printResult);
}

equalSumOfRightAndLeftPosition(['10000', '10100']);

//06 Sum prime non prime
function sumPrimeNonPrime(input) {
    let primeSum = 0;
    let nonPrimeSum = 0;
    let cmd = "";

    while ((cmd = input.shift()) != 'stop') {
        let num = parseInt(cmd);

        if (num < 0) {
            console.log('Number is negative.');
            continue;
        }

        let isPrime = true;

        if (num == 1) {
            isPrime = false;
        } else if (num == 2) {
            isPrime = true;
        } else {
            let limit = Math.floor(Math.sqrt(num));

            for (let i = 2; i <= limit; i++) {
                if (num % i == 0) {
                    isPrime = false;
                    break;
                }
            }
        }

        if (isPrime) primeSum += num;
        else nonPrimeSum += num;
    }

    console.log(`Sum of all prime numbers is: ${primeSum}`);
    console.log(`Sum of all non prime numbers is: ${nonPrimeSum}`);
}

sumPrimeNonPrime(['30', '83', '33', '-1', '20', 'stop']);

//07 Train the trainers
function trainTrainers(input) {
    let trainers = Number(input.shift());
    let cmd = ""
    let totalAverageGrade = 0;
    let totalPresentations = 0;

    while ((cmd = input.shift()) != "Finish") {
        let presentationName = cmd;
        totalPresentations ++;
        let sumOfGrades = 0;

        for (let i = 0; i < trainers; i++) {
            let grade = parseFloat(input.shift());
            sumOfGrades += grade;
        }

        let averageGradeOfPresentation = sumOfGrades / trainers;
        totalAverageGrade += averageGradeOfPresentation;

        console.log(`${presentationName} - ${averageGradeOfPresentation.toFixed(2)}.`);
    }

    console.log(`Student's final assessment is ${(totalAverageGrade/totalPresentations).toFixed(2)}.`);
}

trainTrainers(['2', 'While-Loop', '6.00', '5.50', 'For-Loop', '5.84', '5.66', 'Finish']);
trainTrainers(['3', 'Arrays', '4.53', '5.23', '5.00', 'Lists', '5.83', '6.00', '5.42', 'Finish']);

//08 Fishing
function fishing(input){
    let quota = Number(input.shift());
    let cmd = "";
    let caughtFishes = 0;
    let priceToPay = 0;
    let priceToRecieve = 0;

    while ((cmd = input.shift()) != "Stop") {
        caughtFishes++;

        let fishName = cmd;
        let fishKg = Number(input.shift());
        let fishPrice = 0;

        for (let i = 0; i < fishName.length; i++) {
            fishPrice += fishName.charCodeAt(i);
        }

        fishPrice /= fishKg;

        if(caughtFishes % 3 == 0) priceToRecieve += fishPrice;
        else priceToPay += fishPrice;

        if(quota == caughtFishes) break;
    }

    let priceDiff = Math.abs(priceToPay - priceToRecieve);

    if(quota == caughtFishes){
        console.log('Lyubo fulfilled the quota!');
    }

    if(priceToRecieve >= priceToPay){
        console.log(`Lyubo's profit from ${caughtFishes} fishes is ${priceDiff.toFixed(2)} leva.`);
    } else {
        console.log(`Lyubo lost ${priceDiff.toFixed(2)} leva today.`);
    }
}

fishing(['3', 'catfish', '70', 'carp', '20', 'trench', '14']);
fishing(['10', 'Pike', '15', 'Grass Carp', '40', 'Common Rudd', '7', 'Perch', '20', 'Stop']);
fishing(['6', 'Bluefish', '17.4', 'Garfish', '14.9', 'Stop']);


//09 Password generator
function passwordGenerator(input){
    let n = Number(input.shift());
    let l = Number(input.shift());
    let resultToPrint = "";

    for (let c1 = 1; c1 < n; c1++) {
        for (let c2 = 1; c2 < n; c2++) {
            for (let c3 = 0; c3 < l; c3++) {
                for (let c4 = 0; c4 < l; c4++) {
                    let limitC5 = c1 >= c2 ? c1 : c2;
                    limitC5 += 1;

                    for (let c5 = limitC5; c5 <= n; c5++) {
                        let char3 = String.fromCharCode(97 + c3);
                        let char4 = String.fromCharCode(97 + c4);

                        resultToPrint += (`${c1}${c2}${char3}${char4}${c5}`)+ " ";
                    }
                }
            }
        }
    }

    console.log(resultToPrint);
}

passwordGenerator(['2', '4']);
passwordGenerator(['3', '1']);

//10 Special numbers
function specialNumbers(input){
    let n = Number(input.shift());
    let resultToPrint = "";

    let limit = n >= 10 ? 9 : n;

    for (let n1 = 1; n1 <= limit; n1++) {
        if(n % n1 != 0) continue;
        for (let n2 = 1; n2 <= limit; n2++) {
            if(n % n2 != 0) continue;
            for (let n3 = 1; n3 <= limit; n3++) {
                if(n % n3 != 0) continue;
                for (let n4 = 1; n4 <= limit; n4++) {
                    if(n % n4 != 0) continue;
                    resultToPrint += (`${n1}${n2}${n3}${n4} `)
                }
            }
        }
    }

    console.log(resultToPrint);
}

specialNumbers(['3']);
specialNumbers(['11']);
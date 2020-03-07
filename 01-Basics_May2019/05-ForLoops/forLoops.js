//01 Numbers ending in 7
function numbersEndingIn7() {
    for (let i = 0; i <= 1000; i++) {
        if (i % 10 == 7) {
            console.log(i)
        }
    }
}

//02 Half sum element
function halfSum(input) {
    let n = Number(input.shift());
    let sum = 0;
    let maxNumber = 0;

    for (let index = 0; index < n; index++) {
        let num = Number(input.shift());

        sum += num;

        if (maxNumber < num) {
            maxNumber = num;
        }
    }

    sum -= maxNumber;

    if (sum == maxNumber) {
        console.log("Yes");
        console.log(`Sum = ${sum}`);
    } else {
        console.log("No");
        console.log(`Diff = ${Math.abs(maxNumber - sum)}`);
    }
}

halfSum(['4', '6', '1', '2', '3']);
halfSum(['3', '1', '1', '10']);

//03 Odd / even position
function oddEvenPosition(input) {
    let n = Number(input.shift());

    let oddSum = 0;
    let oddMin = Number.MAX_SAFE_INTEGER;
    let oddMax = Number.MIN_SAFE_INTEGER;
    let evenSum = 0;
    let evenMin = Number.MAX_SAFE_INTEGER;
    let evenMax = Number.MIN_SAFE_INTEGER;

    for (let i = 1; i <= n; i++) {
        let num = Number(input.shift());

        if (i % 2 == 0) {
            evenSum += num;
            if (evenMin > num) evenMin = num;
            if (evenMax < num) evenMax = num;

        } else {
            oddSum += num;
            if (oddMin > num) oddMin = num;
            if (oddMax < num) oddMax = num;
        }
    }

    console.log(`OddSum=${oddSum.toFixed(2)},`);
    console.log(`OddMin=${oddMin == Number.MAX_SAFE_INTEGER ? 'No' : oddMin.toFixed(2)},`);
    console.log(`OddMax=${oddMax == Number.MIN_SAFE_INTEGER ? 'No' : oddMax.toFixed(2)},`);
    console.log(`EvenSum=${evenSum.toFixed(2)},`);
    console.log(`EvenMin=${evenMin == Number.MAX_SAFE_INTEGER ? 'No' : evenMin.toFixed(2)},`);
    console.log(`EvenMax=${evenMax == Number.MIN_SAFE_INTEGER ? 'No' : evenMax.toFixed(2)}`);
}

oddEvenPosition(['6', '2', '3', '5', '4', '2', '1']);
oddEvenPosition(['1', '-5']);

//04 Equal pairs
function equalPairs(input){
    let n = Number(input.shift());

    let pairSum = 0;
    let maxDifference = 0;

    let n1 = Number(input.shift());
    let n2 = Number(input.shift());
    let previousSum = n1 + n2;

    for (let i = 1; i < n; i++) {
        let num1 = Number(input.shift());
        let num2 = Number(input.shift());
        
        pairSum = num1 + num2;

        if(previousSum != pairSum){
            let difference = Math.abs(previousSum - pairSum);
            if(maxDifference < difference) maxDifference = difference;
        }

        previousSum = pairSum;
    }

    if(maxDifference == 0){
        console.log(`Yes, value=${previousSum}`);
    } else {
        console.log(`No, maxdiff=${maxDifference}`);
    }
}

equalPairs(['3', '1', '2', '0', '3', '4', '-1']);
equalPairs(['1', '5', '5']);
equalPairs(['4', '1', '1', '3', '1', '2', '-2', '0', '0']);

//05 Histogram
function histogram(input){
    let n = Number(input.shift());

    let numsUnder200 = 0;
    let numsBetween200And399 = 0;
    let numsBetween400And599 = 0;
    let numsBetween600And799 = 0;
    let numsBiggetThan800 = 0;

    for (let i = 0; i < n; i++) {
        let num = Number(input.shift());
        
        if(num < 200) numsUnder200++;
        if(num >= 200 && num <= 399) numsBetween200And399++;
        if(num >= 400 && num <= 599) numsBetween400And599++;
        if(num >= 600 && num <= 799) numsBetween600And799++;
        if(num >= 800) numsBiggetThan800++;
    }

    console.log(`${(numsUnder200 / n * 100).toFixed(2)}%`);
    console.log(`${(numsBetween200And399 / n * 100).toFixed(2)}%`);
    console.log(`${(numsBetween400And599 / n * 100).toFixed(2)}%`);
    console.log(`${(numsBetween600And799 / n * 100).toFixed(2)}%`);
    console.log(`${(numsBiggetThan800 / n * 100).toFixed(2)}%`);
}

histogram(['3', '1', '2', '999']);
histogram(['7', '800', '801', '250', '199', '399', '599', '799']);

//06 Divide without reminder
function divideWithoutReminder(input){
    let n = Number(input.shift());

    let numsDivideBy2 = 0;
    let numsDivideBy3 = 0;
    let numsDivideBy4 = 0;

    for (let i = 0; i < n; i++) {
        let num = Number(input.shift());
        
        if(num % 2 == 0) numsDivideBy2++;
        if(num % 3 == 0) numsDivideBy3++;
        if(num % 4 == 0) numsDivideBy4++;
    }

    console.log(`${(numsDivideBy2 / n * 100).toFixed(2)}%`);
    console.log(`${(numsDivideBy3 / n * 100).toFixed(2)}%`);
    console.log(`${(numsDivideBy4 / n * 100).toFixed(2)}%`);
}

divideWithoutReminder(['10', '680', '2', '600', '200', '800', '799', '199', '46', '128', '65']);

//07 Salary
function salary(input){
    let tabs = Number(input.shift());
    let salary = Number(input.shift());

    for (let i = 0; i < tabs; i++) {
        let tabName = input.shift();
        
        if(tabName == "Facebook"){
            salary -= 150;
        } else if (tabName == "Instagram"){
            salary -= 100;
        } else if (tabName == "Reddit"){
            salary -= 50;
        }

        if(salary <= 0){
            break;
        }
    }

    if(salary <= 0){
        console.log("You have lost your salary.")
    } else {
        console.log(salary);
    }
}

salary(['10','750', 'Facebook', 'Dev.bg', 'Instagram', 'Facebook', 'Reddit', 'Facebook', 'Facebook']);
salary(['3','500', 'Github.com', 'Stackoverflow.com', 'softuni.bg']);
//01 USD to BGN
function convertor(input){
    let usd = Number(input.shift());
    let bgn = usd * 1.79549;
    console.log(bgn.toFixed(2));
}

convertor(['20']);

//02 Radians to Degrees
function radiantsToDegrees(input){
    let radians = Number(input.shift());
    let degrees = radians * 180 / Math.PI;
    console.log(degrees.toFixed(0));
}

radiantsToDegrees(['3.1416']);

//03 2D Rectangle Area
function rectangleAreaAndPerimeter(input){
    let x1 = Number(input.shift());
    let y1 = Number(input.shift());
    let x2 = Number(input.shift());
    let y2 = Number(input.shift());

    let a = Math.abs(x1 - x2);
    let b = Math.abs(y1 - y2);
    console.log((a * b).toFixed(2));
    console.log((2 * (a + b)).toFixed(2));
}

rectangleAreaAndPerimeter(['60', '20', '10', '50']);

//04 Tailoring Workshop
function tailorWorkshop(input){
    let numOfTables = Number(input.shift());
    let lengthOfTable = Number(input.shift());
    let widthOfTable = Number(input.shift());

    let tableclothDolarPricePerSquareMeter = 7;
    let quadsDolarPricePerSquareMeter = 9;

    let tableclothTotalArea = numOfTables * (lengthOfTable + 0.3 * 2) * (widthOfTable + 0.3 * 2);
    let quadsTotalArea = numOfTables * Math.pow(lengthOfTable / 2, 2);

    let totalPriceInDolars = (tableclothTotalArea * tableclothDolarPricePerSquareMeter) + (quadsTotalArea * quadsDolarPricePerSquareMeter);
    let totalPriceInBGN = totalPriceInDolars * 1.85;

    console.log(totalPriceInDolars.toFixed(2) + ' USD');
    console.log(totalPriceInBGN.toFixed(2) + ' BGN');
}

tailorWorkshop(['5', '1.00', '0.50']);

//05 Dance hall
function danceHall(input){
    let lengthOfRoom = Number(input.shift());
    let widthOfRoom = Number(input.shift());
    let wardrobeSide = Number(input.shift());
    
    let dancerNeededSpaceInMeters = 7040 / 10000;

    let roomArea = lengthOfRoom * widthOfRoom;
    let benchArea = roomArea / 10;
    let wardrobeArea = wardrobeSide * wardrobeSide;

    let freeArea = roomArea - (benchArea + wardrobeArea);
    let dancers = Math.floor(freeArea / dancerNeededSpaceInMeters);

    console.log(dancers);
}

danceHall(['50', '25', '2']);

//06 Charity Campaign
function charityCampaign(input){
    let daysOfCampaign = Number(input.shift());
    let confectioners = Number(input.shift());
    let cakesPerConfectionerPerDay = Number(input.shift());
    let wafflesPerConfectionerPerDay = Number(input.shift());
    let pancakesPerConfectionerPerDay = Number(input.shift());
    
    let cakePrice = 45;
    let wafflePrice = 5.8;
    let pancake = 3.2;

    let workingConstant = daysOfCampaign * confectioners;

    let totalCakesPrice =  workingConstant * cakesPerConfectionerPerDay * cakePrice;
    let totalWafflesPrice =  workingConstant * wafflesPerConfectionerPerDay * wafflePrice;
    let totalPancakesPrice =  workingConstant * pancakesPerConfectionerPerDay * pancake;
    
    let totalPrice = totalCakesPrice + totalWafflesPrice + totalPancakesPrice;

    let totalPriceForCharity = totalPrice * 7 / 8;

    console.log(totalPriceForCharity.toFixed(2));
}

charityCampaign(['20', '8', '14', '30', '16']);

//07 Alcohol Market
function alcoholMarket(input){
    let whiskeyPricePerLiter = Number(input.shift());
    let beerLiters = Number(input.shift());
    let whineLiters = Number(input.shift());
    let schnappsLiters = Number(input.shift());
    let whiskeyLiters = Number(input.shift());

    let schnappsPricePerLiter = whiskeyPricePerLiter / 2;
    let whinePricePerLiter = schnappsPricePerLiter * 0.6;
    let beerPricePerLiter = schnappsPricePerLiter * 0.2;

    let whiskeyTotalPrice = whiskeyPricePerLiter * whiskeyLiters;
    let schnappsTotalPrice = schnappsPricePerLiter * schnappsLiters;
    let whineTotalPrice = whinePricePerLiter * whineLiters;
    let beerTotalPrice = beerPricePerLiter * beerLiters;

    let totalPriceToPay = (whiskeyTotalPrice + schnappsTotalPrice + whineTotalPrice + beerTotalPrice);

    console.log(totalPriceToPay.toFixed(2));
}

alcoholMarket(['50', '10', '3.5', '6.5', '1']);
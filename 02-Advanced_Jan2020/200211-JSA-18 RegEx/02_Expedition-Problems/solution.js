function solve() {
    let key = document.getElementById('string').value;
    let str = document.getElementById('text').value;

    let regCoords = /(?<coordinates>(north|east)).*?(?<digits>[\d]{2})[^,]*,[^,]*?(?<decimals>[\d]{6})/gmi;
    let regMsg = new RegExp(`(${key})(.+)(${key})`, 'mi');

    let message = str.match(regMsg)[2];

    let coordinatesData = regCoords.exec(str);
    let coordsObj = {north: 0, east: 0, message: `Message: ${message}`};

    while(coordinatesData){
        let coordinate = coordinatesData.groups.coordinates.toLowerCase();
        coordsObj[coordinate] = coordinate === 'north' ? `${coordinatesData.groups.digits}.${coordinatesData.groups.decimals} N` : `${coordinatesData.groups.digits}.${coordinatesData.groups.decimals} E`;
        coordinatesData = regCoords.exec(str);
    }

    let resultDom = document.getElementById('result');
    Object.values(coordsObj).map(v => resultDom.innerHTML += `<p>${v}</p>`);
}
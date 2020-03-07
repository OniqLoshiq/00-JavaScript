function solve() {
    let [str, printOpt] = document.getElementById('string').value.split(', ');

    let regexName = / [A-Z][A-Za-z]*-[A-Z][A-Za-z]*( |\.-[A-Z][A-Za-z]* )/m;
    let regexAirport = / [A-Z]{3}\/[A-Z]{3} /m;
    let regexFlight = / [A-Z]{1,3}[\d]{1,5} /m;
    let regexCompany = /- [A-Z][a-z]*\*[A-Z][a-z]* /m;
    
    let name = str.match(regexName)//[0].trim().replace(/-/g, ' ');
    let airport = str.match(regexAirport)[0].trim().split('/');
    let flight = str.match(regexFlight)[0].trim();
    let company = str.match(regexCompany)[0];
    company = company.slice(2, company.length - 1).replace('*', ' ');

    let airportObj = {
        name: () => `Mr/Ms, ${name}, have a nice flight!`,
        flight: () => `Your flight number ${flight} is from ${airport[0]} to ${airport[1]}.`,
        company: () => `Have a nice flight with ${company}.`,
        all: () => `Mr/Ms, ${name}, your flight number ${flight} is from ${airport[0]} to ${airport[1]}. Have a nice flight with ${company}.`
    }

    document.getElementById('result').textContent = airportObj[printOpt]();
}
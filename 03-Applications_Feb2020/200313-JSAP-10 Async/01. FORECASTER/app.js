function attachEvents() {
    let getURL = 'https://judgetests.firebaseio.com/locations.json';
    let todayURL = 'https://judgetests.firebaseio.com/forecast/today/{code}.json';
    let forecastURL = 'https://judgetests.firebaseio.com/forecast/upcoming/{code}.json';

    let $submitBtn = document.getElementById('submit');
    let $location = document.getElementById('location');
    let $current = document.getElementById('current');
    let $forecast = document.getElementById('upcoming');
    let $weatherBlock = document.getElementById('forecast');

    let weatherSymbols = {
        's': '&#x2600;',
        'p': '&#x26C5;',
        'o': '&#x2601;',
        'r': '&#x2614;',
        'd': '&#176;'
    }

    $submitBtn.addEventListener('click', getLocation);

    async function getLocation() {
        let location = $location.value;

        try {
            let resposnse = await fetch(getURL);
            let locations = await resposnse.json();
            
            let currLoc = locations.find(l => l.name.toLowerCase() === location.toLowerCase());

            if(!currLoc){
                throw new Error();
            }

            $weatherBlock.style.display = 'none';
            $location.value = "";
            $current.innerHTML = "";
            $forecast.innerHTML = "";

            let currConditionsURL = todayURL.replace('{code}', currLoc.code);
            let responseCurrConditions = await fetch(currConditionsURL);
            let currConditions = await responseCurrConditions.json();

            let forecastConditionsURL = forecastURL.replace('{code}', currLoc.code);
            let responseForcastConditions = await fetch(forecastConditionsURL);
            let forecastConditions = await responseForcastConditions.json();

            createCurrentHtml(currConditions);
            createForecastHtml(forecastConditions);

            $weatherBlock.style.display = 'block';

        } catch (error) {
            errorHandling();
        }
    }

    function createForecastHtml(forecastConditions){
        let divLabel = createHTMLElement('div', ['label'], 'Three-day forecast');
        let divForecast = createHTMLElement('div', ['forecast-info']);

        forecastConditions.forecast.forEach(f => {
            let spanUpcoming = createHTMLElement('span', ['upcoming']);
            let spanSymbol = createHTMLElement('span', 'symbol', weatherSymbols[f.condition[0].toLowerCase()]);
            let spanTemp = createHTMLElement('span', ['forecast-data'], `${f.low}${weatherSymbols.d}/${f.high}${weatherSymbols.d}`);
            let spanCond = createHTMLElement('span', ['forecast-data'], f.condition);

            spanUpcoming.appendChild(spanSymbol);
            spanUpcoming.appendChild(spanTemp);
            spanUpcoming.appendChild(spanCond);

            divForecast.appendChild(spanUpcoming);
        })

        $forecast.appendChild(divLabel);
        $forecast.appendChild(divForecast);
    }

    function createCurrentHtml(currConditions){
        let loc = currConditions.name;
        let low = currConditions.forecast.low;
        let high = currConditions.forecast.high;
        let condition = currConditions.forecast.condition;

        let divLabel = createHTMLElement('div', ['label'], 'Current conditions');

        let divForecast = createHTMLElement('div', ['forecasts']);
        let spanSymbol = createHTMLElement('span', ['condition', 'symbol'], weatherSymbols[condition[0].toLowerCase()]);
        let spanCondition = createHTMLElement('span', ['condition']);
        let spanLoc = createHTMLElement('span', ['forecast-data'], loc);
        let spanTemp = createHTMLElement('span', ['forecast-data'], `${low}${weatherSymbols.d}/${high}${weatherSymbols.d}`);
        let spanCond = createHTMLElement('span', ['forecast-data'], condition);


        spanCondition.appendChild(spanLoc);
        spanCondition.appendChild(spanTemp);
        spanCondition.appendChild(spanCond);

        divForecast.appendChild(spanSymbol);
        divForecast.appendChild(spanCondition);

        $current.appendChild(divLabel);
        $current.appendChild(divForecast);
    }

    function errorHandling() {
        let elem = document.querySelector('#content');
        let h3Elem = createHTMLElement('h3', ['error'], 'Wrong input');
        h3Elem.style.color = 'red';
        h3Elem.style.textAlign = 'center';

        elem.insertBefore(h3Elem, elem.firstChild);

        setTimeout(() => {
            document.querySelector('#content').children[0].remove();
        }, 3000)
    }

    function createHTMLElement(element, classArray, text) {
        let elem = document.createElement(element);

        if (classArray) {
            elem.classList.add(...classArray);
        }

        if (text) {
            elem.innerHTML = text;
        }

        return elem;
    }
}

attachEvents();
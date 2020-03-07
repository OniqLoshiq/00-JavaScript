function solve() {
    let clear = document.querySelector('button.clear');
    let expression = document.getElementById('expressionOutput');
    let result = document.getElementById('resultOutput');

    clear.addEventListener('click', e => {
        expression.innerHTML = '';
        result.innerHTML = '';
    });

    const operatorsMap = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => a / b,
    }

    let calcKeys = document.getElementsByClassName('keys')[0];

    calcKeys.addEventListener('click', ({target}) => {
        let value = target.value;

        if(value !== undefined){
            if(value === '='){
                let calcParams = expression.innerHTML.trim().split(' ');

                result.innerHTML = calcParams.length === 2 ? 'NaN' : mathCal(calcParams);
                return;
            }
            
            if(operatorsMap.hasOwnProperty(value)){
                expression.innerHTML += ` ${value} `;
            } else {
                expression.innerHTML += value;
            }
        }
    });

    function mathCal(params){
        return operatorsMap[params[1]](Number(params[0]), Number(params[2]));
    }
}
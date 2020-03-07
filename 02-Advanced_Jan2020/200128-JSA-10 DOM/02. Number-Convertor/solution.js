function solve() {
    let selector = document.getElementById('selectMenuTo');
    let newElements = ['Binary', 'Hexadecimal'];

    for (let i = 0; i < 2; i++) {
        let newOption = document.createElement('option');
        newOption.setAttribute('value', newElements[i].toLowerCase());
        newOption.innerHTML = newElements[i];
        selector.appendChild(newOption);
    }

    let btn = document.getElementsByTagName('button')[0];

    btn.addEventListener('click', e => {
        let numberToConvert = document.getElementById('input').value;
        let convertSystem = selector.value;
        document.getElementById('result').value = converterObj[convertSystem](numberToConvert);
    })

    let converterObj = {
        binary: (num) => Number(num).toString(2),
        hexadecimal: (num) => Number(num).toString(16).toUpperCase(),
    }
}
function solve() {
    let btns = document.getElementsByTagName('button');
    let tableElement = document.getElementsByTagName('table')[0];
    let checkElement = document.getElementById('check');

    let isSudomuValid = true;

    //Quick check
    btns[0].addEventListener('click', e => {
        let inputValues = Array.from(document.querySelectorAll('td input')).map(i => i.value);

        if (inputValues.some(n => n === "" || +n < 1 || +n > 3)) {
            isSudomuValid = false;
            addResultChanges(isSudomuValid);
            isSudomuValid = true;
            return;
        } else {
            let counter = 0;
            for (let i = 0; i < inputValues.length; i += 3) {
                let [rowValue1, rowValue2, rowValue3] = [inputValues[i], inputValues[i + 1], inputValues[i + 2]];
                let [colValue1, colValue2, colValue3] = [inputValues[counter], inputValues[counter + 3], inputValues[counter + 6]];

                if (rowValue1 === rowValue2 || rowValue1 === rowValue3 || rowValue2 === rowValue3 ||
                    colValue1 === colValue2 || colValue1 === colValue3 || colValue2 === colValue3) {
                    isSudomuValid = false;
                    addResultChanges(isSudomuValid);
                    isSudomuValid = true;
                    return;
                }
                counter++;
            }
        }

        addResultChanges(isSudomuValid);
    });

    //Clear
    btns[1].addEventListener('click', e => {
        document.querySelectorAll('td input').forEach(i => i.value = "");

        tableElement.removeAttribute('style');
        checkElement.removeAttribute('style');
        checkElement.firstElementChild.textContent = "";
    });

    function addResultChanges(isValid) {
        if (isValid) {
            tableElement.style = 'border: 2px solid green';
            checkElement.style = 'color: green';
            checkElement.firstElementChild.textContent = 'You solve it! Congratulations!';
            return;
        }

        tableElement.style = 'border: 2px solid red';
        checkElement.style = 'color: red';
        checkElement.firstElementChild.textContent = 'NOP! You are not done yet...';
    }
}
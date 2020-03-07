function solve() {
    const asciiUpperCaseStart = 65;

    let btn = document.getElementsByTagName('button')[0];
    let list = document.getElementsByTagName('li');
    
    btn.addEventListener('click', e => {
        let inputName = document.getElementsByTagName('input')[0].value;
        let inputRow = (inputName.toUpperCase()).charCodeAt(0) - asciiUpperCaseStart;
        let currentName = inputName[0].toUpperCase() + inputName.slice(1).toLowerCase();

        if(list[inputRow].textContent === ""){
            list[inputRow].textContent = currentName;
        } else {
            list[inputRow].textContent += `, ${currentName}`;
        }

        document.querySelector('article > input').value = "";
    });
}
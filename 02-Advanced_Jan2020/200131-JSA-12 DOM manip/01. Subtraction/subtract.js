function subtract() {
    const firstElement = +document.getElementById("firstNumber").value;
    const secondElement = +document.getElementById("secondNumber").value;

    let result = firstElement - secondElement;

    document.getElementById("result").textContent = result;
}
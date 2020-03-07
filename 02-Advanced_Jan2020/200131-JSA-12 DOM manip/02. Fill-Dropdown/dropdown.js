function addItem() {
    const $inputText = document.getElementById('newItemText');
    const $inputValue = document.getElementById('newItemValue');

    let text = $inputText.value;
    let value = $inputValue.value;

    let newElement = document.createElement('option');
    newElement.textContent = text;
    newElement.setAttribute('value', value);

    document.getElementById('menu').appendChild(newElement);

    $inputText.value = "";
    $inputValue.value = "";
}
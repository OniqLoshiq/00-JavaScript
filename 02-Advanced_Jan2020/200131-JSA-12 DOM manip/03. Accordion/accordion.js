function toggle() {
    const $btnElement = document.querySelector('#accordion > .head .button');
    const $textBox = document.getElementById("extra");

    if($btnElement.textContent === 'More'){
        $textBox.style.display = 'block';
        $btnElement.textContent = 'Less';
    } else {
        $btnElement.textContent = 'More';
        $textBox.style.display = 'none';
    }
}
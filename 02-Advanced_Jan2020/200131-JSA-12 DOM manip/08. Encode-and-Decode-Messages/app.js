function encodeAndDecodeMessages() {
    const $textAreas = document.getElementsByTagName('textarea');
    const $btns = document.getElementsByTagName('button');

    $btns[0].addEventListener('click', encode);
    $btns[1].addEventListener('click', decode);

    function encode() {
        let msg = $textAreas[0].value.split("").map(c =>
            String.fromCharCode(c.charCodeAt(0) + 1)).join("");
        $textAreas[0].value = "";
        $textAreas[1].value = msg;
    }

    function decode() {
        $textAreas[1].value = $textAreas[1].value.split("").map(c =>
            String.fromCharCode(c.charCodeAt(0) - 1)).join("");
    }
}
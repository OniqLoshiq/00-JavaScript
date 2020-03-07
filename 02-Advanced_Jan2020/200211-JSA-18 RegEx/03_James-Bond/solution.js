function solve() {
    let [key, ...codedMsg] = JSON.parse(document.getElementById('array').value);
    let regexMsg = RegExp(`(?<key>(^| )${key})[\\s]+(?<msg>[!%$#A-Z]{8,})([ .,]|$)`, 'gmi');
    let resultElement = document.getElementById('result');

    codedMsg.forEach(line => {
        let match = regexMsg.exec(line);

        while (match) {
            if (match.groups.msg === match.groups.msg.toUpperCase()) {
                let decodedMsg = match.groups.msg.replace(/!/g, 1).replace(/%/g, 2).replace(/#/g, 3).replace(/\$/g, 4).toLowerCase();
                line = line.replace(match.groups.msg, decodedMsg);
            }

            match = regexMsg.exec(line);
        }

        resultElement.innerHTML += `<p>${line}</p>`
    });
}

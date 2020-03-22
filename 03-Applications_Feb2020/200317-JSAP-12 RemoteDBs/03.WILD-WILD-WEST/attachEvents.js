function attachEvents() {
    //CHANGE the URL with your own
    let url = 'https://jsappdb.firebaseio.com/wildwest/';
    let addPlayerBtn = document.getElementById('addPlayer');
    let players = document.getElementById('players');
    let playerProperties = ['name', 'money', 'bullets'];
    let currentPlayer = '';
    let currentPlayerId = '';
    
    let saveBtn = document.getElementById('save');
    let reloadBtn = document.getElementById('reload');

    saveBtn.addEventListener('click', save);
    reloadBtn.addEventListener('click', reload);
    addPlayerBtn.addEventListener('click', addPlayer);

    loadAllPlayers();

    function addPlayer() {
        let nameField = document.getElementById('addName');
        let name = nameField.value;

        if (name) {
            let player = {
                name,
                money: 500,
                bullets: 6
            }

            fetch(url + '.json', {
                method: "POST",
                body: JSON.stringify(player)
            })
                .then(() => nameField.value = "")
                .then(loadAllPlayers);
        }
    }

    function loadAllPlayers() {
        fetch(url + '.json')
            .then(res => res.json())
            .then(data => {
                players.innerHTML = "";

                Object.entries(data).forEach(([id, obj]) => {
                    let divPlayer = createHTMLElment('div', 'player', { name: 'data-id', value: id });

                    for (let i = 0; i < playerProperties.length; i++) {
                        let prop = playerProperties[i];
                        let divProp = createHTMLElment('div', null, null, `${prop[0].toUpperCase() + prop.slice(1)}: ${obj[prop]}`);
                        divPlayer.appendChild(divProp);
                    }

                    let playBtn = createHTMLElment('button', 'play', null, 'Play');
                    playBtn.addEventListener('click', startGame);

                    let deleteBtn = createHTMLElment('button', 'delete', null, 'Delete');
                    deleteBtn.addEventListener('click', deletePlayer);

                    divPlayer.appendChild(playBtn);
                    divPlayer.appendChild(deleteBtn);

                    players.appendChild(divPlayer);
                })
            })
    }

    function startGame() {
        currentPlayerId = this.parentNode.dataset.id;

        fetch(url + `${currentPlayerId}.json`)
            .then(res => res.json())
            .then(player => {
                saveBtn.style.display = 'block';
                reloadBtn.style.display = 'block';
                document.getElementById('canvas').style.display = 'block';
                currentPlayer = player;

                loadCanvas(player);
            })
            .then(() => {
                let allPlayBtns = Array.from(document.querySelectorAll('.play'));

                allPlayBtns.forEach(b => b.disabled = true);
            })
    }

    function deletePlayer() {
        let playerId = this.parentNode.dataset.id;

        fetch(url + `${playerId}.json`, {
            method: 'DELETE'
        })
            .then(() => {
                this.parentNode.remove();
            })
            .then(() => {
                if (saveBtn.style.display === 'block') {
                    location.reload();
                }
            })
    }

    function reload() {
        if (currentPlayer.money >= 60) {
            currentPlayer.money -= 60;
            currentPlayer.bullets += 6;
        }
    }

    function save() {
        fetch(url + `${currentPlayerId}.json`, {
            method: "PATCH",
            body: JSON.stringify(currentPlayer)
        })
            .then(() => {
                saveBtn.style.display = 'none';
                reloadBtn.style.display = 'none';
                document.getElementById('canvas').style.display = 'none';
                currentPlayer = '';
                currentPlayerId = '';
            })
            .then(loadAllPlayers);
    }

    function createHTMLElment(element, className, attribute, text) {
        let elem = document.createElement(element);

        if (className) {
            elem.className = className;
        }

        if (attribute) {
            elem.setAttribute(attribute.name, attribute.value);
        }

        if (text) {
            elem.textContent = text;
        }

        return elem;
    }
}
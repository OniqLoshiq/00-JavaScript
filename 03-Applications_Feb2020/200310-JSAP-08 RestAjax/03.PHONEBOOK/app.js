function attachEvents() {
    $phonebook = document.querySelector('#phonebook');
    $create = document.querySelector('#btnCreate');
    $load = document.querySelector('#btnLoad');
    $person = document.querySelector('#person');
    $phone = document.querySelector('#phone');

    $create.addEventListener('click', createContact);
    $load.addEventListener('click', loadAllContacts);
    $phonebook.addEventListener('click', deleteContact);

    function createContact() {
        let contact = {
            person: $person.value,
            phone: $phone.value
        }

        fetch(`https://jsex-a9160.firebaseio.com/phonebook/.json`, {
            method: 'post',
            body: JSON.stringify(contact)
        })
            .then(() => {
                $person.value = '';
                $phone.value = '';
                loadAllContacts();
            })
    }

    function loadAllContacts() {
        $phonebook.innerHTML = '';

        fetch(`https://jsex-a9160.firebaseio.com/phonebook.json`)
            .then(res => res.json())
            .then(data => {
                Object.entries(data).forEach(([id, { person, phone }]) => {
                    let liElem = document.createElement('li');
                    liElem.textContent = `${person}: ${phone}`;

                    let btn = document.createElement('button');
                    btn.textContent = 'DELETE';
                    btn.value = id;

                    liElem.appendChild(btn);
                    $phonebook.appendChild(liElem);
                });
            })
            .catch(() => {
                alert('There should be at least one contact in the phonebook!');
            });
    }

    function deleteContact(e) {
        if(e.target.tagName.toUpperCase() === 'BUTTON'){
            let contactBtn = e.target;
            let id = contactBtn.value;
            fetch(`https://jsex-a9160.firebaseio.com/phonebook/${id}.json`, {
                method: 'delete'
            })
            .then(() => {
                contactBtn.parentNode.remove();
            })
        }
    }
}

attachEvents();
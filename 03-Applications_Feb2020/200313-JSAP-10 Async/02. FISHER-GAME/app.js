function attachEvents() {
    let $addBtn = document.querySelector('fieldset > button.add');
    let $loadBtn = document.querySelector('aside > button.load');
    let $catches = document.getElementById('catches');

    let GET_POST_ULR = 'https://jsex-a9160.firebaseio.com/catches.json';
    let ID_URL = 'https://jsex-a9160.firebaseio.com/catches/{catchId}.json';

    $addBtn.addEventListener('click', addCatch);
    $loadBtn.addEventListener('click', loadCatches);

    function addCatch() {
        let inputs = document.querySelectorAll('fieldset#addForm > input');
        let inputValues = Array.from(inputs).map(i => i.value);

        if (inputValues.some(v => !v)) {
            let h4Elem = createHtmlElement('h4', null, null, 'Cannot have empty fields!!!');
            h4Elem.style.color = 'red';
            document.querySelector('#addForm').appendChild(h4Elem);

            setTimeout(() => {
                document.querySelector('#addForm').lastElementChild.remove();
            }, 2500)
        } else {
            let catchObj = createCatchObjFromFields(inputs);

            fetch(GET_POST_ULR, {
                method: 'POST',
                "content-type": 'application/json',
                body: JSON.stringify(catchObj)
            })
                .then(() => {
                    inputs.forEach(i => i.value = "");
                })
                .catch(errorHandler)
        }
    }

    async function loadCatches() {
        try {
            let response = await fetch(GET_POST_ULR);
            let catchesObj = await response.json();
            let catchesIds = Object.keys(catchesObj);

            $catches.innerHTML = "";

            if (!catches) {
                let h5Elem = createHtmlElement('h5', null, null, 'No catches yet ...');
                $catches.appendChild(h5Elem);
            } else {
                catchesIds.forEach(id => {
                    let divCatch = createHtmlElement('div', 'catch', [{ name: 'data-id', value: id }]);

                    // Object.keys(catchesObj[id]) is ordering the keys alphabeticly
                    let keys = ['angler', 'weight', 'species', 'location', 'bait', 'captureTime'];

                    keys.forEach(p => {
                        createCatchInputField(divCatch, catchesObj[id], p);
                    });

                    let btnUpdate = createHtmlElement('button', 'update', null, 'Update');
                    btnUpdate.addEventListener('click', updateCatch);

                    let btnDelete = createHtmlElement('button', 'delete', null, 'Delete');
                    btnDelete.addEventListener('click', deleteCatch);

                    appendChildren(divCatch, [btnUpdate, btnDelete]);

                    $catches.appendChild(divCatch);
                })
            }
        } catch (error) {
            errorHandler();
        }

    }

    function updateCatch(e) {
        let catchDiv = e.target.parentNode;
        let updateURL = getCurrentIdURL(catchDiv);

        let inputs = catchDiv.querySelectorAll('input');
        let catchObj = createCatchObjFromFields(inputs);

        fetch(updateURL, {
            method: 'PUT',
            "content-type": 'application/json',
            body: JSON.stringify(catchObj)
        })
            .catch(errorHandler)
    }

    async function deleteCatch(e) {
        let catchDiv = e.target.parentNode;
        let deleteURL = getCurrentIdURL(catchDiv);

        try {
            await fetch(deleteURL, { method: "DELETE" });
            catchDiv.remove();
        } catch (error) {
            errorHandler();
        }
    }

    function createCatchInputField(parent, obj, property) {
        let labelText = property[0].toUpperCase() + property.slice(1);
        let label = createHtmlElement('label', null, null, labelText);

        let typeValue = 'text';

        if (property === 'weight' || property === 'currentTime') {
            typeValue = 'number';
        }

        let input = createHtmlElement('input', 'property', [{ name: 'type', value: typeValue }, { name: 'value', value: obj[property] }]);
        let hr = createHtmlElement('hr');

        appendChildren(parent, [label, input, hr]);
    }

    function createHtmlElement(element, className, attributes, text) {
        let elem = document.createElement(element);

        if (className) {
            elem.className = className;
        }

        if (attributes) {
            attributes.forEach(a => elem.setAttribute(a.name, a.value));
        }

        if (text) {
            elem.textContent = text;
        }

        return elem;
    }

    function appendChildren(parent, childrenArray) {
        childrenArray.forEach(c => parent.appendChild(c));
    }

    function errorHandler() {
        let h3Elem = createHtmlElement('h3', null, null, 'Something went wrong!!!');
        h3Elem.style.color = 'red';
        document.querySelector('h1').appendChild(h3Elem);

        setTimeout(() => {
            document.querySelector('h1').lastElementChild.remove();
        }, 3000)
    }

    function getCurrentIdURL(catchDiv) {
        let catchId = catchDiv.getAttribute('data-id');
        return ID_URL.replace('{catchId}', catchId);
    }

    function createCatchObjFromFields(inputs){
        let inputValues = Array.from(inputs).map(i => i.value);
        let [angler, weight, species, location, bait, captureTime] = inputValues;

        return {
            angler,
            weight,
            species,
            location,
            bait,
            captureTime
        };
    }
}

attachEvents();
import { getAllBooksRequest, createBookRequest, getBookRequest, deleteBookRequest, updateBookRequest }
    from './firebase-helper.js'

(function solve() {
    let $table = document.getElementsByTagName('tbody')[0];
    let $form = document.getElementsByTagName('form')[0];
    let $loadBtn = document.getElementById('loadBooks');

    const fieldNames = ['title', 'author', 'isbn', 'tags'];

    $form.addEventListener('submit', createBook);
    $loadBtn.addEventListener('click', loadAllBooks);

    loadAllBooks();

    function createBook(e) {
        e.preventDefault();
        let formFields = getFormFields();
        let bookObj = getFormObj(formFields);

        if (Object.values(bookObj).some(v => !v)) {
            errorHandler();
        } else {
            createBookRequest(bookObj)
                .then(() => clearFormFields(formFields));
        }
    }

    function loadAllBooks() {
        getAllBooksRequest()
            .then(data => {
                $table.innerHTML = "";

                Object.keys(data).forEach(id => {
                    let bookRow = document.createElement('tr');
                    bookRow.setAttribute('data-id', id);
                    bookRow.addEventListener('click', bookFunctionality);
                    let bookData = "";

                    for (let i = 0; i < fieldNames.length; i++) {
                        let fieldValue = data[id][fieldNames[i]];

                        if(fieldNames[i] === 'tags' ){
                            if(fieldValue[0]){
                                fieldValue = fieldValue.join(', ');
                            } else {
                                fieldValue = 'empty tags'
                            }
                        }
                        bookData += `<td>${fieldValue}</td>\n`
                    }

                    bookData +=
                        `<td>
                        <button>Edit</button>
                        <button>Delete</button>
                    </td>`;

                    bookRow.innerHTML = bookData;
                    $table.appendChild(bookRow);
                })
            })
    }

    async function bookFunctionality(e) {
        let elem = e.target;
        let bookId = e.target.closest('tr').dataset.id;
        let formFields = getFormFields();

        if (elem.tagName.toUpperCase() === 'TD') {
            clearFormFields(formFields);

            await getBookRequest(bookId)
                .then(data => {
                    fillFormObj(formFields, data);
                });
        } else if (elem.tagName.toUpperCase() === 'BUTTON') {
            if (elem.textContent === 'Delete') {
                await deleteBookRequest(bookId)
                    .then(elem.closest('tr').remove())
                    .then(() => clearFormFields(formFields));
            } else if (elem.textContent === 'Edit') {
                let bookObj = getFormObj(formFields);

                if (Object.values(bookObj).some(v => !v)) {
                    errorHandler();
                } else {
                    await updateBookRequest(bookId, bookObj)
                        .then(() => clearFormFields(formFields))
                        .then(() => loadAllBooks());
                }
            }
        }
    }

    function getFormFields() {
        return $form.getElementsByTagName('input');
    }

    function getFormObj(formFields) {
        return fieldNames.reduce((acc, curr) => {
            let value = formFields.namedItem(curr).value;

            if(curr === 'tags'){
                value = value.split(',').map(t => t.trim());
            }
            acc[curr] = value;
            return acc;
        }, {});
    }

    function fillFormObj(formFields, bookObj) {
        for (let i = 0; i < fieldNames.length; i++) {
            let value = bookObj[fieldNames[i]];

            if(fieldNames[i] === 'tags'){
                value = value.join(', ');
            }
            formFields.namedItem(fieldNames[i]).value = value;
        }
    }

    function clearFormFields(formFields) {
        for (let i = 0; i < fieldNames.length; i++) {
            formFields.namedItem(fieldNames[i]).value = "";
        }
    }

    function errorHandler() {
        let h3Elem = document.createElement('h3');
        h3Elem.textContent = 'Cannot have empty fields'
        h3Elem.style.color = 'red';
        h3Elem.style.textAlign = 'center';

        document.querySelector('body').appendChild(h3Elem);

        setTimeout(() => {
            document.querySelector('body').lastElementChild.remove();
        }, 3000)
    }
})()
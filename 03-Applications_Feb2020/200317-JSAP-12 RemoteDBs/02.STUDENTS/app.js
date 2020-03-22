import { getAllStudentsRequest, createStudentRequest }
    from './firebase-helper.js'

(function solve() {
    let $table = document.getElementsByTagName('tbody')[0];
    let $form = document.getElementsByTagName('form')[0];

    const fieldNames = ['firstName', 'lastName', 'facultyNumber', 'grade'];

    $form.addEventListener('submit', createStudent);

    loadAllStudents();

    function createStudent(e) {
        e.preventDefault();
        let formFields = getFormFields();
        let studentObj = getFormObj(formFields);

        if (Object.values(studentObj).some(v => !v)) {
            errorHandler();
        } else {
            getAllStudentsRequest()
                .then(students => {
                    let studentId = students ? Object.keys(students).length : 0;

                    createStudentRequest(studentId, studentObj)
                        .then(() => clearFormFields(formFields))
                        .then(loadAllStudents);
                })
        }
    }

    function loadAllStudents() {
        getAllStudentsRequest()
            .then(data => {
                $table.innerHTML = "";
                if (data) {
                    Object.keys(data)
                        .sort((a, b) => Number(a) - Number(b))
                        .forEach(id => {
                            let studentRow = document.createElement('tr');
                            let studentData = `<td>${id}</td>\n`;

                            for (let i = 0; i < fieldNames.length; i++) {
                                studentData += `<td>${data[id][fieldNames[i]]}</td>\n`
                            }

                            studentRow.innerHTML = studentData;
                            $table.appendChild(studentRow);
                        })
                }
            })
    }

    function getFormFields() {
        return $form.getElementsByTagName('input');
    }

    function getFormObj(formFields) {
        return fieldNames.reduce((acc, curr) => {
            acc[curr] = formFields.namedItem(curr).value;
            return acc;
        }, {});
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
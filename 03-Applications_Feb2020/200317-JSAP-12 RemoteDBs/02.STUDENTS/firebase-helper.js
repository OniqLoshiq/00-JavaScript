//CHANGE the URL with your own
const firebaseUrl = 'https://jsappdb.firebaseio.com/students/';

export function getAllStudentsRequest(){
    return fetch(firebaseUrl + '.json').then(res => res.json());
}

export function createStudentRequest(studentId, studentObj){
    return fetch(firebaseUrl + `${studentId}.json`, {
        method: 'PUT',
        body: JSON.stringify(studentObj)
    });
}
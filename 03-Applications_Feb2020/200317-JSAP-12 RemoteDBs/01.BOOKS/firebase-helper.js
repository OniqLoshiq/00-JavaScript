//CHANGE the URL with your own
//IF you are using the tags field, please separate them with comma (',');
const firebaseUrl = 'https://jsappdb.firebaseio.com/books/';

export function getAllBooksRequest(){
    return fetch(firebaseUrl + '.json').then(res => res.json());
}

export function getBookRequest(bookId){
    return fetch(firebaseUrl + `${bookId}.json`).then(res => res.json());
}

export function createBookRequest(bookObj){
    return fetch(firebaseUrl + '.json', {
        method: 'POST',
        body: JSON.stringify(bookObj)
    });
}

export function updateBookRequest(bookId, bookObj){
    return fetch(firebaseUrl + `${bookId}.json`, {
        method: 'PUT',
        body: JSON.stringify(bookObj)
    });
}

export function deleteBookRequest(bookId){
    return fetch(firebaseUrl + `${bookId}.json`, {
        method: 'DELETE'
    });
}
export default function (dbName, token) {
    let dbURL = 'https://jsroutingapp.firebaseio.com/';

    if(!dbName){
        throw new Error('Invalid database!')
    }

    dbURL = dbURL + dbName;

    function createEntity(data){
        return fetch(`${dbURL}.json` + (token ? `?auth=${token}` : ''), {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => res.json());
    }

    function getAll(){
        return fetch(`${dbURL}.json` + (token ? `?auth=${token}` : '')).then(res => res.json());
    }

    function getById(id){
        return fetch(`${dbURL}/${id}.json` + (token ? `?auth=${token}` : '')).then(res => res.json());
    }

    function patchEntity(id, data){
        return fetch(`${dbURL}/${id}.json` + (token ? `?auth=${token}` : ''), {
            method: 'PATCH',
            body: JSON.stringify(data)
        }).then(res => res.json());
    }

    function deleteEntity(id){
        return fetch(`${dbURL}/${id}.json` + (token ? `?auth=${token}` : ''), {
            method: 'Delete'
        }).then(res => res.json());
    }

    return {
        createEntity,
        getAll,
        getById,
        patchEntity,
        deleteEntity
    }
}
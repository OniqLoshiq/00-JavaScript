export default function (collectionName) {
    const collection = collectionName;
    const db = firebase.firestore();

    if(!collectionName){
        throw new Error ('Please provide collection name!')
    }

    async function getAll(){
        return (await db.collection(collection).get()).docs;
    }

    async function getById(id){
        return db.collection(collection).doc(id).get();
    }

    async function add(entity){
        return db.collection(collection).add(entity).then(res => res.id);
    }

    async function update(id, entity){
        return db.collection(collection).doc(id).update(entity);
    }

    async function remove (id) {
        db.collection(collection).doc(id).delete();
    }

    return {
        getAll,
        getById,
        add,
        update,
        remove
    }
}
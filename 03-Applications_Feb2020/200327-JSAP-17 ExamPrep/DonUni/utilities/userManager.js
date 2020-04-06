export default function(){
    const userDb = firebase.auth();

    function createUser(email, password){
        return userDb.createUserWithEmailAndPassword(email, password);
    }

    function signIn(email, password){
        return userDb.signInWithEmailAndPassword(email, password);
    }

    function signOut(){
        return userDb.signOut();
    }

    function getCurrentUser(){
        return userDb.currentUser;
    }

    return {
        createUser,
        signIn,
        signOut,
        getCurrentUser
    }
}
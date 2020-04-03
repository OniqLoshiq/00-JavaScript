import fireBaseFactory from '../utilities/firebase-requests.js';

export default {
    register: (username, password) => {
        return firebase.auth().createUserWithEmailAndPassword(username, password)
        .then(res => {
            let user = res.user;
            let requester = fireBaseFactory('users', user.xa);
            let userObj = {
                username: username,
                teamId: '',
                teams: []
            }
            requester.patchEntity(user.uid, userObj);
        })
    },
    login: (username, password) => {
        return firebase.auth().signInWithEmailAndPassword(username, password);
    },
    logout: () => {
        return firebase.auth().signOut();
    },
    getUser: (userId, token) => {
        let requester = fireBaseFactory('users', token);
        return requester.getById(userId);
    },
    setTeam: async (userId, token, teamId) => {
        let requester = fireBaseFactory('users', token);
        let user = await requester.getById(userId);
        let teams = user.teams ? [...user.teams, teamId] : [teamId];
        let team = {teamId, teams};
        return requester.patchEntity(userId, team);
    },
    joinTeam: (userId, token, teamId) => {
        let requester = fireBaseFactory('users', token);

        return requester.patchEntity(userId, {teamId: teamId});
    },
    leaveTeam: (userId, token) => {
        let requester = fireBaseFactory('users', token);

        return requester.patchEntity(userId, {teamId: ''});
    }

}
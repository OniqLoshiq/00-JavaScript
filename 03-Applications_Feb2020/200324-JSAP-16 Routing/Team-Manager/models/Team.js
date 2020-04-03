import fireBaseFactory from '../utilities/firebase-requests.js';

export default {
    listTeams: () => {
        let requester = fireBaseFactory('teams', sessionStorage.getItem('token'));
        return requester.getAll();
    },
    create: (data) => {
        let requester = fireBaseFactory('teams', sessionStorage.getItem('token'));
        return requester.createEntity(data);
    },
    getTeamMembers: async (teamId) => {
        let requester = fireBaseFactory('users', sessionStorage.getItem('token'));
        let members = await requester.getAll().then(data => {
            let users = data ? Object.values(data).filter(u => u.teamId === teamId) : null;
            return users;
        });
        let usernames = members.map(t => Object.assign({}, {username: t.username}));
        return usernames;
    },
    getTeam: (id) => {
        let requester = fireBaseFactory('teams', sessionStorage.getItem('token'));
        return requester.getById(id);
    },
    edit: (teamId, data) => {
        let requester = fireBaseFactory('teams', sessionStorage.getItem('token'));
        return requester.patchEntity(teamId, data);
    }
}
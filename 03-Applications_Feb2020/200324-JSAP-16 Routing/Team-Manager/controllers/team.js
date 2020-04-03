import extend from '../utilities/context.js';
import models from '../models/models.js';

export default {
    get: {
        catalog: (context) => {
            models.Team.listTeams().then(data => {
                let teams = data ? Object.entries(data).map(([id, value]) => ({ _id: id, ...value })) : null;
                context.teams = teams;
            })
                .then(async () => {
                    await extend(context);
                })
                .then(async () => {
                    context.partials.team = await context.load('../views/catalog/team.hbs')
                    context.partial('../views/catalog/teamCatalog.hbs');
                })
        },
        create: async (context) => {
            await extend(context);
            context.partials.createForm = await context.load('../views/create/createForm.hbs');
            await context.partial('../views/create/createPage.hbs');
        },
        team: async (context) => {
            let teamId = context.params.id.slice(1);

            await models.Team.getTeam(teamId).then((d) => {
                context.name = d.name;
                context.comment = d.comment;
            });

            await models.User.getUser(sessionStorage.getItem('userId'), sessionStorage.getItem('token'))
                .then(user => {
                    context.isOnTeam = user.teamId === teamId;
                    context.isAuthor = user.teams ? Object.values(user.teams).some(t => t === teamId) : false;
                });

            await models.Team.getTeamMembers(teamId).then(members => {
                context.members = members;
            });

            await extend(context);
            context.teamId = teamId;
            context.partials.teamControls = await context.load('../views/catalog/teamControls.hbs');
            context.partials.teamMember = await context.load('../views/catalog/teamMember.hbs');
            context.partials.createForm = await context.load('../views/create/createForm.hbs');
            context.partial('../views/catalog/details.hbs');
        },
        join: (context) => {
            let teamId = context.params.id.slice(1);
            sessionStorage.setItem('teamId', teamId);
            models.User.joinTeam(sessionStorage.getItem('userId'), sessionStorage.getItem('token'), teamId)
                .then(() => {
                    extend(context)
                })
                .then(() => {
                    context.redirect('#/home');
                });
        },
        leave: async (context) => {
            await models.User.leaveTeam(sessionStorage.getItem('userId'), sessionStorage.getItem('token'));
            sessionStorage.setItem('teamId', '');
            await context;
            context.redirect('#/home');
        },
        edit: async (context) => {
            let teamId = context.params.id.slice(1);

            await models.Team.getTeam(teamId).then(team => {
                context.name = team.name;
                context.comment = team.comment;
            });

            await extend(context);
            context.teamId = teamId;

            context.partials.editForm = await context.load('../views/edit/editForm.hbs');
            context.partial('../views/edit/editPage.hbs');
        }
    },
    post: {
        create: (context) => {
            let data = context.params;
            models.Team.create(data)
                .then(res => {
                    let teamId = res.name;
                    sessionStorage.setItem('teamId', teamId);
                    models.User.setTeam(sessionStorage.getItem('userId'), sessionStorage.getItem('token'), teamId)
                        .then(() => {
                            extend(context)
                        })
                        .then(() => {
                            context.redirect('#/home');
                        });
                });
        },
        edit: (context) => {
            let data = context.params;
            let teamId = data.id.slice(1);
            
            models.Team.edit(teamId, {
                name: data.name,
                comment: data.comment
            })
                .then(() => {
                    extend(context);
                })
                .then(() => {
                    context.redirect('#/catalog');
                })
        }
    }
}
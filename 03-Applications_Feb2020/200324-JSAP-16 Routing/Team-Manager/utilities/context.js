export default async function (context) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            let token = user.xa;
            let userId = user.uid;
            let username = user.email;

            context.loggedIn = true;
            context.username = username;

            let teamId = sessionStorage.getItem('teamId');

            context.hasNoTeam = !teamId;
            context.hasTeam = !!teamId;
            context.teamId = teamId;

            sessionStorage.setItem('token', token);
            sessionStorage.setItem('userId', userId);
        } else {
            context.loggedIn = false;
            context.username = null;
            context.hasNoTeam = true;
            context.hasTeam = false;

            sessionStorage.clear();
        }
    });

    context.partials = {
        header: await context.load('../views/common/header.hbs'),
        footer: await context.load('../views/common/footer.hbs')
    };
}
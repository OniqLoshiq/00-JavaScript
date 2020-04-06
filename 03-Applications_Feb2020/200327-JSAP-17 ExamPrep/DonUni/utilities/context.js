import user from "../controllers/user.js";

export default async function (context) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            context.isLoggedIn = true;
            context.username = user.email;
        }
    });

    context.partials = {
        header: await context.load('../views/common/header.hbs'),
        footer: await context.load('../views/common/footer.hbs')
    };
}
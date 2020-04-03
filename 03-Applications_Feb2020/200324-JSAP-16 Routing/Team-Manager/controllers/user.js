import extend from '../utilities/context.js';
import models from '../models/models.js';

export default {
    get: {
        register: async (context) => {
            await extend(context);
            context.partials.registerForm = await context.load('../views/register/registerForm.hbs');

            context.partial('../views/register/registerPage.hbs')
        },
        login: async (context) => {
            await extend(context);
            context.partials.loginForm = await context.load('../views/login/loginForm.hbs');

            context.partial('../views/login/loginPage.hbs')
        },
        logout: async (context) => {
            await models.User.logout();
            await extend(context);

            context.redirect('#/home');
        },
    },
    post: {
        register: (context) => {
            let { username, password, repeatPassword } = context.params;

            if (password === repeatPassword) {
                models.User.register(username, password)
                    .then(() => {
                        sessionStorage.setItem('teamId', '');
                        extend(context);
                    })
                    .then(() => {
                        context.redirect('#/home');
                    });
            }
        },
        login: (context) => {
            let { username, password } = context.params;

            models.User.login(username, password)
                .then(async (res) => {
                    let teamId = (await models.User.getUser(res.user.uid, res.user.xa)).teamId;
                    sessionStorage.setItem('teamId', teamId);
                    extend(context);
                })
                .then(() => {
                    context.redirect('#/home');
                });
        }
    }
}
import userManager from '../utilities/userManager.js'
import extend from '../utilities/context.js'

const um = userManager();

export default {
    get: {
        login: async function (context) {
            await extend(context);

            context.partial('../views/user/login.hbs');
        },
        register: async function (context) {
            await extend(context);

            context.partial('../views/user/register.hbs');
        },
        logout: async function (context) {
            await um.signOut();

            await extend(context);
            context.redirect('#/home');
        },
    },
    post: {
        login: function (context) {
            let { username, password } = this.params;

            if (!username) {
                throw new Error('Enter a valid username!');
            }

            um.signIn(username, password)
                .then(() => {
                    extend(context);
                })
                .then(() => {
                    context.redirect('#/home');
                });
        },
        register: async function (context) {
            let { username, password, rePassword } = this.params;

            if (password !== rePassword) {
                throw new Error('Password does not match!');
            }

            if (!username) {
                throw new Error('Enter a valid username!');
            }

            um.createUser(username, password)
                .then(() => {
                    extend(context);
                })
                .then(() => {
                    context.redirect('#/home');
                });
        }
    }
}
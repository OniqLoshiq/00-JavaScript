const config = require('../config/config');
const UserManager = require('../services/userManager');
const um = new UserManager();

function ifLoggedRedirect(res) {
    if (res.locals.isLoggedIn) {
        return res.redirect('/');
    }
}

module.exports = {
    get: {
        register(req, res) {
            ifLoggedRedirect(res);
            res.render('users/register');
        },
        login(req, res) {
            ifLoggedRedirect(res);
            res.render('users/login');
        },
        logout(req, res) {
            res.clearCookie(config.cookie);
            res.redirect('/');
        }
    },
    post: {
        async register(req, res) {
            ifLoggedRedirect(res);

            if (res.locals.errorStatus) {
                return res.render('users/register');
            }

            const { username, password } = req.body;
            const token = await um.register(username, password);
            res.cookie(config.cookie, token);

            res.redirect('/');
        },
        async login(req, res) {
            ifLoggedRedirect(res);

            if (res.locals.errorStatus) {
                return res.render('users/login');
            }

            const { username, password } = req.body;
            const token = await um.login(username, password);

            if (!token) {
                return res.render('users/login', {
                    errorStatus: true,
                    validationErrors: ['Wrong username or password']
                });
            }

            res.cookie(config.cookie, token);
            res.redirect('/');
        }
    }
}
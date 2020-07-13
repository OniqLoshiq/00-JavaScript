const routes = require('../routes');
const { isLoggedIn } = require('../services/auth');

module.exports = (app) => {
    app.use(isLoggedIn);

    app.use('/', routes.home);
    app.use('/user', routes.users);
    app.use('/course', routes.courses);
}
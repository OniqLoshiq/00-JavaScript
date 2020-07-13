const config = require('../config/config');
const jwt = require('jsonwebtoken');

const isLoggedIn = function (req, res, next) {
    const token = req.cookies[config.cookie];
    
    try {
        jwt.verify(token, config.jwtSecret);
        res.locals.isLoggedIn = true;
    } catch (e) {
        res.locals.isLoggedIn = false;
    }

    return next();
}

const authentication = function (req, res, next) {
    const token = req.cookies[config.cookie];

    try {
        const decodedToken = jwt.verify(token, config.jwtSecret);
        res.locals.userId = decodedToken.id;
        res.locals.username = decodedToken.username;
        return next();
    } catch (e) {
        console.error(e);
        return res.redirect('/users/login');
    }
}

module.exports = {
    isLoggedIn,
    authentication
}
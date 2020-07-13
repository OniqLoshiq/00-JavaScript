const router = require('express').Router();
const controller = require('../controllers/home');
const {authentication} = require('../services/auth');

router.use(function (req, res, next){
    if(res.locals.isLoggedIn){
        return authentication(req, res, next);
    }
    next();
});

router.get('/', controller.get.home);

module.exports = router;

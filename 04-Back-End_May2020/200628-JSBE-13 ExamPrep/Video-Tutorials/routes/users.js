const router = require('express').Router();
const controller = require('../controllers/users');
const { authentication } = require('../services/auth');
const { validateRegisterUserRules, validateLoginUserRules, validateUserResults } = require('../services/validationServices')

router.get('/login', controller.get.login);
router.get('/register', controller.get.register);
router.get('/logout', authentication, controller.get.logout);

router.post('/login', validateLoginUserRules(), validateUserResults, controller.post.login);
router.post('/register', validateRegisterUserRules(), validateUserResults, controller.post.register);

module.exports = router;

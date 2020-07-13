const router = require('express').Router();
const controller = require('../controllers/courses');
const {authentication} = require('../services/auth');

router.get('/create', authentication, controller.get.create);
router.get('/edit/:id',authentication, controller.get.edit);
router.get('/delete/:id', authentication, controller.get.delete);
router.get('/details/:id', authentication, controller.get.details);
router.get('/enroll/:id', authentication, controller.get.enroll);

router.post('/create', authentication, controller.post.create);
router.post('/edit/:id', authentication, controller.post.edit);
router.post('/search', authentication, controller.post.search);

module.exports = router;
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

function validateRegisterUserRules() {
    return [
        body('username')
            .exists({
                checkFalsy: true,
                checkNull: true
            })
            .withMessage('Username is required')
            .bail()
            .isLength({ min: 5 })
            .withMessage('Username should be minimum 5 symbols')
            .bail()
            .custom(value => {
                return /^[A-Za-z0-9]+$/.test(value);
            })
            .withMessage('Username should contain only english letters and numbers')
            .bail()
            .custom(async value => {
                const result = await User.exists({ username: value });

                if (result) {
                    throw new Error('Username already exists');
                }

                return true;
            }),
        body('password')
            .exists({
                checkFalsy: true,
                checkNull: true
            })
            .withMessage('Password is required')
            .bail()
            .isLength({ min: 5 })
            .withMessage('Password should be minimum 5 symbols'),
        body('repeatPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match')
                }
                return true;
            })
    ]
}

function validateLoginUserRules() {
    return [
        body('username')
            .exists({
                checkFalsy: true,
                checkNull: true
            })
            .withMessage('Username is required'),
            //OPTIONAL VALIDATION
            // .bail()
            // .custom(async value => {
            //     const result = await User.exists({ username: value });

            //     if (!result) {
            //         throw new Error('Wrong username or password');
            //     }

            //     return true;
            // }),
        body('password')
            .exists({
                checkFalsy: true,
                checkNull: true
            })
            .withMessage('Password is required')
            //OPTIONAL VALIDATION
            // .bail()
            // .custom(async (value, { req }) => {
            //     const password = (await User.findOne({username: req.body.username}, 'password').lean()).password;

            //     const passwordMatch = await bcrypt.compare(value, password);

            //     if(!passwordMatch){
            //         throw new Error('Wrong username or password');
            //     }

            //     return true;
            // })
    ]
}

function validateUserResults(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.locals.errorStatus = true;
        res.locals.validationErrors = errors.array().map(err => err.msg);
    }

    return next();
}

function getErrorMessages(err){
    return Object.keys(err.errors).reduce((acc, curr) => {
        acc.push(err.errors[curr].message);
        return acc;
    }, []);
}

module.exports = {
    validateRegisterUserRules,
    validateUserResults,
    validateLoginUserRules,
    getErrorMessages
}
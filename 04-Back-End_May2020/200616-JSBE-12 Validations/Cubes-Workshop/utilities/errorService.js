const { body, validationResult } = require('express-validator');
const User = require('../models/user');

function getErrorMessages(err) {
    return Object.keys(err.errors).reduce((acc, curr) => {
        acc.push(err.errors[curr].message);
        return acc;
    }, []);
}

function validateUserRules() {
    return [
        body('username')
            .exists()
            .withMessage('Username is required')
            .isLength({ min: 5 })
            .withMessage('Username should be minimum 5 symbols')
            .custom(value => {
                return /^[A-Za-z0-9]+$/.test(value);
            })
            .withMessage('Username should contain only english letters and numbers')
            .custom(async value => {
                const result = await User.exists({username: value});

                if(result){
                    throw new Error('Username already exists');
                }

                return true;
            }),
        body('password')
            .exists()
            .withMessage('Password is required')
            .isLength({ min: 8 })
            .withMessage('Password should be minimum 8 symbols'),
        body('repeatPassword')
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error('Password confirmation does not match')
                }
                return true;
            })
    ]
}

function validateUserResults(req, res, next) {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log(errors.array());
        req.validationErrors = errors.array().map(err => err.msg);
    }

    return next();
}


module.exports = {
    getErrorMessages,
    validateUserRules,
    validateUserResults
}
const env = process.env.NODE_ENV || 'development'
const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]

const homeController = require('../controllers/home');
const userController = require('../controllers/users');
const cubesController = require('../controllers/cubes');
const accessoriesController = require('../controllers/accessories');
const {isLoggedIn} = require('../utilities/authService');
const { validationResult } = require('express-validator');

module.exports = (app) => {
    //Authentication logic
    app.use(isLoggedIn);

    //Routers logic
    app.use('/', homeController);
    app.use('/user', userController);
    app.use('/cube', cubesController);
    app.use('/accessory', accessoriesController);

    app.all('*', (req, res) => {
        res.render('404', {
            title: "Error Page",
            isLoggedIn: req.isLoggedIn
        });
    })
};
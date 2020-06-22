const express = require('express');
const router = express.Router();
const UserManager = require('../utilities/userManager');
const { isLoggedIn, authAccess } = require('../utilities/authService');

const um = new UserManager();

router.get('/register', (req, res) => {
    if (req.isLoggedIn) {
        return res.redirect('/');
    }

    res.render('registerUser', {
        title: 'Register User',
        isLoggedIn: req.isLoggedIn
    })
});

router.post('/register', async (req, res, next) => {
    if (req.isLoggedIn) {
        return res.redirect('/');
    }

    const { username, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
        return res.end('Passwords do not match!');
    };

    try {
        const token = await um.register(username, password);
        res.cookie('aid', token);

        res.redirect('/')
    } catch (e) {
        console.log(e)
        next()
    }
});

router.get('/login', (req, res) => {
    if (req.isLoggedIn) {
       return res.redirect('/');
    }

    res.render('loginUser', {
        title: 'Login User',
        isLoggedIn: req.isLoggedIn
    })
});

router.post('/login', async (req, res, next) => {
    if (req.isLoggedIn) {
        res.redirect('/');
    }

    const { username, password } = req.body;

    try {
        const token = await um.login(username, password);

        if (token) {
            res.cookie('aid', token);
            return res.redirect('/')
        }

        res.render('loginUser', {
            title: 'Login User',
            isLoggedIn: req.isLoggedIn
        })
    } catch (e) {
        console.log(e)
        next()
    }
});

router.get('/logout', authAccess, (req, res) => {
    res.clearCookie('aid');
    res.redirect('/');
});

module.exports = router;
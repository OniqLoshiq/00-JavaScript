const express = require('express');
const router = express.Router();
const CubeManager = require('../utilities/cubeManager');

const cm = new CubeManager();

router.get('/', async (req, res) => {
    const cubes = await cm.getAll();
    
    res.render('index', {
        title: 'Cubes Workshop',
        isLoggedIn: req.isLoggedIn,
        cubes
    })
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Cubicle Info',
        isLoggedIn: req.isLoggedIn
    })
});

module.exports = router;
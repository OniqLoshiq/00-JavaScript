const express = require('express');
const router = express.Router();
const CubeManager = require('../utilities/cubeManager');

const cm = new CubeManager();

router.get('/', (req, res) => {
    cm.getAll((cubes) => {
        res.render('index', {
            title: 'Cubes Workshop',
            cubes
        })
    })
});

router.get('/about', (req, res) => {
    res.render('about', {
        title: 'Cubicle Info'
    })
});

module.exports = router;
const express = require('express');
const router = express.Router();
const CubeManager = require('../utilities/cubeManager');

const cm = new CubeManager();

router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create Cube'
    })
});

router.post('/create', (req, res) => {
    const cubeParams = Object.values(req.body);
    cm.create(...cubeParams, () => {
        res.redirect('/');
    });
});

router.get('/details/:id', (req, res) => {
    cm.getById(req.params.id, (cube) => {
        res.render('details', {
            title: 'Cube Details',
            ...cube
        })
    });
});

router.post('/search', (req, res) => {
    const { search, from, to } = req.body;

    cm.getByParams(search, from, to, (result) => {
        if (result.length > 0) {
            res.render('index', {
                title: 'Cubes Search Result',
                cubes: result
            });
        } else {
            res.redirect('/');
        }
    });
})


module.exports = router;
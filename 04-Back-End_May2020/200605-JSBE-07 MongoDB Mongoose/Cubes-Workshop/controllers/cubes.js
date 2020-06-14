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
    cm.create(...cubeParams, (err) => {
        if (err) {
            console.error(err);
            res.redirect('/cube/create')
        }

        res.redirect('/');
    });
});

router.get('/details/:id', async (req, res) => {
    const cube = await cm.getById(req.params.id)

    res.render('details', {
        title: 'Cube Details',
        ...cube
    });
});

router.post('/search', async (req, res) => {
    const { search, from, to } = req.body;

    const result = await cm.getByParams(search, from, to);

    if (result.length > 0) {
        res.render('index', {
            title: 'Cubes Search Result',
            cubes: result
        });
    } else {
        res.redirect('/');
    };
})


module.exports = router;
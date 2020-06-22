const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development'
const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]
const CubeManager = require('../utilities/cubeManager');
const { authAccess } = require('../utilities/authService');

const cm = new CubeManager();

router.get('/create', authAccess, (req, res) => {
    res.render('create', {
        title: 'Create Cube',
        isLoggedIn: req.isLoggedIn
    })
});

router.post('/create', authAccess, (req, res) => {
    const cubeParams = Object.values(req.body);
    cm.create(...cubeParams, req.userId, (err) => {
        if (err) {
            console.error(err);
            return res.redirect('/cube/create')
        }

        res.redirect('/');
    });
});

router.get('/details/:id', async (req, res) => {
    const cube = await cm.getById(req.params.id);
    let isCreator = false;

    if (req.isLoggedIn) {
        const decodedToken = jwt.verify(req.cookies['aid'], config.jwtSecret);
        isCreator = cube.creatorId.toString() === decodedToken.id;
    }

    res.render('details', {
        title: 'Cube Details',
        isLoggedIn: req.isLoggedIn,
        isCreator,
        ...cube
    });
});

router.post('/search', async (req, res) => {
    const { search, from, to } = req.body;

    const result = await cm.getByParams(search, from, to);

    if (result.length > 0) {
        res.render('index', {
            title: 'Cubes Search Result',
            isLoggedIn: req.isLoggedIn,
            cubes: result
        });
    } else {
        res.redirect('/');
    };
})

router.get('/edit/:id', authAccess, async (req, res) => {
    const cube = await cm.getById(req.params.id);

    const isCreator = cube.creatorId.toString() === req.userId;

    if (!isCreator) {
        return res.redirect('/');
    }

    const selectOptions = cm.generateSelectOptions(cube.difficultyLevel);

    res.render('edit', {
        title: 'Edit Cube',
        isLoggedIn: req.isLoggedIn,
        ...cube,
        selectOptions
    })
});

router.post('/edit/:id', authAccess, async (req, res) => {
    const cubeId = req.params.id;
    const cubeParams = Object.values(req.body);

    try {
        await cm.edit(cubeId, ...cubeParams);
    } catch (e) {
        console.error(e);
        return res.redirect('/')
    }

    res.redirect(`/cube/details/${cubeId}`);
});

router.get('/delete/:id', authAccess, async (req, res) => {
    const cube = await cm.getById(req.params.id);

    const isCreator = cube.creatorId.toString() === req.userId;

    if (!isCreator) {
        return res.redirect('/');
    }

    const selectOptions = cm.generateSelectOptions(cube.difficultyLevel);

    res.render('delete', {
        title: 'Delete Cube',
        isLoggedIn: req.isLoggedIn,
        selectOptions,
        ...cube
    })
});

router.post('/delete/:id', authAccess, async (req, res) => {
    const cubeId = req.params.id
    const cube = await cm.getById(cubeId);

    const isCreator = cube.creatorId.toString() === req.userId;

    if (!isCreator) {
        return res.redirect('/');
    }

    try {
        await cm.delete(cubeId)
    } catch(e){
        console.error(e);
        return res.redirect('/')
    } 

    res.redirect('/');
});



module.exports = router;
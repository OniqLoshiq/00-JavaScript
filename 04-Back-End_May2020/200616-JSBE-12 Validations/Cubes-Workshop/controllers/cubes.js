const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development'
const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]
const CubeManager = require('../utilities/cubeManager');
const { authAccess } = require('../utilities/authService');
const { getErrorMessages } = require('../utilities/errorService');

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
            const errorMessages = err.errors ? getErrorMessages(err) : [err.message];

            return res.render('create', {
                title: 'Create Cube',
                isLoggedIn: req.isLoggedIn,
                errStatus: true,
                errors: errorMessages
            });
        }

        res.redirect('/');
    });
});

router.get('/details/:id', async (req, res, next) => {
    try{
        const cube = await cm.getById(req.params.id);

    if(!cube){
        return next();
    }

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
    } catch(e){
        return next();
    }
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

router.get('/edit/:id', authAccess, async (req, res, next) => {
    try{
        const cube = await cm.getById(req.params.id);

        if(!cube){
            return next();
        }
    
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
    } catch(e) {
        return next();
    }
    
});

router.post('/edit/:id', authAccess, async (req, res, next) => {
    try{
        const cubeId = req.params.id;
    
        const cube = await cm.getById(cubeId);
    
        if(!cube){
            return next();
        }
    
        const cubeParams = Object.values(req.body);
        const selectOptions = cm.generateSelectOptions(cube.difficultyLevel);
    
        try {
            await cm.edit(cubeId, ...cubeParams);
        } catch (e) {
                res.status(422);
    
                const errorMessages = e.errors ? getErrorMessages(e) : [e.message];
    
                return res.render('edit', {
                    title: 'Edit Cube',
                    isLoggedIn: req.isLoggedIn,
                    errStatus: true,
                    errors: errorMessages,
                    ...cube,
                    selectOptions
                });
        }
    
        res.redirect(`/cube/details/${cubeId}`);
    } catch (err){
        return next();
    }
});

router.get('/delete/:id', authAccess, async (req, res, next) => {
    try{
        const cube = await cm.getById(req.params.id);

        if(!cube){
            return next();
        }
    
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
    } catch (e){
        return next();
    }
});

router.post('/delete/:id', authAccess, async (req, res, next) => {
    try{
        const cubeId = req.params.id
        const cube = await cm.getById(cubeId);
    
        if(!cube){
            return next();
        }
    
        const isCreator = cube.creatorId.toString() === req.userId;
    
        if (!isCreator) {
            return res.redirect('/');
        }
    
        try {
            await cm.delete(cubeId);
        } catch (e) {
            console.error(e);
            return res.redirect('/')
        }
    
        res.redirect('/');
    } catch (err){
        return next();
    }
});

module.exports = router;
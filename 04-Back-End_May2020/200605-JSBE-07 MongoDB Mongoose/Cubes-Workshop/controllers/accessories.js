const express = require('express');
const router = express.Router();
const AccessoryManager = require('../utilities/accessoryManager');
const CubeManager = require('../utilities/cubeManager');

const am = new AccessoryManager();
const cm = new CubeManager();

router.get('/create', (req, res) => {
    res.render('createAccessory', {
        title: 'Create Accessory'
    })
});

router.post('/create', (req, res) => {
    const accessoryParams = Object.values(req.body);
    am.create(...accessoryParams, (err) => {
        if(err){
            console.error(err);
            res.redirect('/accessory/create')
        } 

        res.redirect('/');
    });
});

router.get('/attach/:id', async (req, res) => {
    const cube = await cm.getById(req.params.id);
    const accessories = await am.getAll();

    let hasAllAccessories = cube.accessories.length === accessories.length;
    let accessoriesToList = accessories.filter((acc) => {
        return !cube.accessories.some(cacc => cacc._id.toString() == acc._id.toString())});

    res.render('attachAccessory', {
        title: 'Attach Accessory',
        hasAllAccessories,
        accessoriesToList,
        ...cube
    })
});

router.post('/attach/:id', async (req, res) => {
    const cubeId = req.params.id;
    const accessoryId = req.body.accessory;

    try{
        await cm.addAccessory(cubeId, accessoryId);
        await am.addCube(accessoryId, cubeId);
    } catch(err){
        console.error(err);
        throw(err);
    }
    
    res.redirect(`/cube/details/${cubeId}`)
});


module.exports = router;
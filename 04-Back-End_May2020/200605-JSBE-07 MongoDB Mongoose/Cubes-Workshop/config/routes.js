const homeController = require('../controllers/home');
const cubesController = require('../controllers/cubes');
const accessoriesController = require('../controllers/accessories');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/cube', cubesController);
    app.use('/accessory', accessoriesController);

    app.all('*', (req, res) => {
        res.render('404', {
            title: "Error Page"
        });
    })
};
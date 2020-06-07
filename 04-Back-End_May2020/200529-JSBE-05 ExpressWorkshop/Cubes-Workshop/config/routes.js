const homeController = require('../controllers/home');
const cubesController = require('../controllers/cubes');

module.exports = (app) => {
    app.use('/', homeController);
    app.use('/cube', cubesController);

    app.all('*', (req, res) => {
        res.render('404', {
            title: "Error Page"
        });
    })
};
const CourseManager = require('../services/courseManager');
const cm = new CourseManager();

module.exports = {
    get: {
        async home(req, res) {
            let courses;
            if (res.locals.isLoggedIn) {
                courses = await cm.getAllPublic();
            } else {
                courses = await cm.getTopThree();
            }
            
            res.render('home/home', {
                courses
            });
        }
    },
    post: {

    }
}
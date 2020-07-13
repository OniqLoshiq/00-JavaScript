const CourseManager = require('../services/courseManager');
const { getErrorMessages } = require('../services/validationServices');
const cm = new CourseManager();


module.exports = {
    get: {
        create(req, res) {
            res.render('courses/create');
        },
        async edit(req, res) {
            const { id } = req.params;
            const course = await cm.getById(id);

            res.render('courses/edit', {
                ...course
            });
        },
        async details(req, res) {
            const { id } = req.params;
            const course = await cm.getById(id);
            const isCreator = course.creator.toString() === res.locals.userId;
            const isEnrolled = course.enrolledUsers.map(u => u.toString()).some(u => u === res.locals.userId);

            res.render('courses/details', {
                isCreator,
                isEnrolled,
                ...course
            });
        },
        async delete(req, res) {
            const { id } = req.params;
            const course = await cm.getById(id);
            const isCreator = course.creator.toString() === res.locals.userId;

            if (isCreator) {
                await cm.delete(id);
            }

            res.redirect('/')
        },
        async enroll(req, res) {
            const { id } = req.params;
            await cm.enrollUser(id, res.locals.userId);

            res.redirect(`/course/details/${id}`)
        }
    },
    post: {
        async create(req, res) {
            const { title, description, imageUrl, isPublic } = req.body;

            const creatorId = res.locals.userId;

            try {
                await cm.create(title, description, imageUrl, isPublic, creatorId);
            } catch (e) {
                const errorMessages = e.errors ? getErrorMessages(e) : [e.message];

                return res.render('courses/create', {
                    errorStatus: true,
                    validationErrors: errorMessages,
                    title,
                    description,
                    imageUrl,
                    isPublic
                });
            }

            res.redirect('/');
        },
        async edit(req, res) {
            const id = req.params.id;
            const { title, description, imageUrl, isPublic } = req.body;

            try {
                await cm.edit(id, title, description, imageUrl, isPublic);
            } catch (e) {
                res.status(422);

                const errorMessages = e.errors ? getErrorMessages(e) : [e.message];

                return res.render('courses/edit', {
                    errorStatus: true,
                    validationErrors: errorMessages,
                    _id: id,
                    title,
                    description,
                    imageUrl,
                    isPublic
                });
            }

            res.redirect(`/course/details/${id}`)
        },
        async search(req, res) {
            const searchValue = req.body.search;

            const result = await cm.search(searchValue);

            res.render('home/home', {
                courses: result
            });
        }
    }
}
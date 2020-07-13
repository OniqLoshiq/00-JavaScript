const Course = require('../models/course');
const mongoose = require('mongoose');

class CourseManager {
    async create(title, description, imageUrl, isPublic, creatorId) {
        const createdDate = (new Date()).toString().slice(0, 24);
        const creator = mongoose.Types.ObjectId(creatorId);
        isPublic = isPublic ? true : false;
        const course = new Course({ title, description, imageUrl, isPublic, creator, createdDate });
        const createdCourse = await course.save();
    }

    async getById(id) {
        const courseId = mongoose.Types.ObjectId(id);

        const course = await Course.findById(courseId).lean();
        return course;
    }

    async getAllPublic() {
        const courses = await Course
            .find({ isPublic: true })
            .sort({ createdDate: -1 })
            .lean();
        return courses;
    }

    async getTopThree() {
        const courses = await Course
            .find({ isPublic: true })
            .sort({ enrolledUsers: -1 })
            .limit(3)
            .lean();

        return courses;
    }

    async enrollUser(courseId, userId) {
        await Course.updateOne({ _id: courseId }, {
            $push: { enrolledUsers: userId }
        });

        return true;
    }

    async delete(courseId) {
        const id = mongoose.Types.ObjectId(courseId);
        const course = await Course.findById(id);
        await course.remove(id);
    }

    async edit(courseId, title, description, imageUrl, isPublic) {
        const id = mongoose.Types.ObjectId(courseId);
        isPublic = isPublic ? true : false;

        await Course.findByIdAndUpdate(id, {
            $set: {
                title,
                description,
                imageUrl,
                isPublic
            }
        });
    }

    async search(value) {
        const regex = RegExp(value, 'i');

        const result = await Course
        .find({ isPublic: true, title: {$regex: regex} })
        .lean()

        return result;
    }
}

module.exports = CourseManager;
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title cannot be empty'],
        unique: true,
        minlength: [4, 'Title is too short, should be minimum 4 symbols']
    },
    description: {
        type: String,
        required: [true, 'Description cannot be empty'],
        maxlength: [50, 'Description is too long, should be maximum 50 symbols']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image url cannot be empty']
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdDate: {
        type: String
    },
    creator: {
        type: 'ObjectId',
        ref: 'User'
    },
    enrolledUsers: [{
        type: 'ObjectId',
        ref: 'User'
    }]
});

courseSchema.path('imageUrl').validate(function (url) {
    const regex = RegExp('^(http:\/\/|https:\/\/)', 'i');
    return regex.test(url);
}, 'Invalid image url!');

courseSchema.pre('save', function(err, course, next){
    if(err.name === 'MongoError' && err.code === 11000){
        err.message = "Cannot create course title to an already existing one!";
        return next();
    }
});

courseSchema.pre('findOneAndUpdate', function(next){
    this.options.runValidators = true;
    next();
});

courseSchema.post('findOneAndUpdate', function(err, course, next){
    if(err.name === 'MongoError' && err.code === 11000){
        err.message = "Cannot change course title to an already existing one!";
    }
    next();
});

module.exports = mongoose.model('Course', courseSchema);
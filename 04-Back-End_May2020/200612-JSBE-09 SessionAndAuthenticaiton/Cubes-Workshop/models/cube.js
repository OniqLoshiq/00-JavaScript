const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
        maxlength: 30
    },
    description: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 1500
    },
    imageUrl: {
        type: String,
        required: true
    },
    difficultyLevel: {
        type: Number,
        required: true,
        min: 1,
        max: 6
    },
    creatorId: {
        type: 'ObjectId',
        ref: 'User'
    },
    accessories: [{
        type: 'ObjectId',
        ref: 'Accessory'
    }]
});

cubeSchema.path('imageUrl').validate(function(url) {
    const regex = RegExp('^(http:\/\/|https:\/\/)', 'i');

    return regex.test(url)
}, 'Invalid image url string!');

module.exports = mongoose.model('Cube', cubeSchema);

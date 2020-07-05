const mongoose = require('mongoose');
const Accessory = require('../models/accessory');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name cannot be empty'],
        minlength: [5, 'Name should be minimum 5 symbols'],
        maxlength: [30, 'Name should be maximum 30 symbols'],
        match: [/^[A-Za-z0-9/\s]+$/, 'Cube name is not valid']
    },
    description: {
        type: String,
        required: [true, 'Description cannot be empty'],
        minlength: [20, 'Description is too short, minimum 20 symbols'],
        maxlength: [1500, 'Description is too long, maximum 1500 symbols'],
        match: [/^[A-Za-z0-9/\s]+$/, 'Description is not valid']
    },
    imageUrl: {
        type: String,
        required: [true, 'Image url cannot be empty']
    },
    difficultyLevel: {
        type: Number,
        required: [true, 'Difficulty level cannot be empty'],
        min: [1, 'Difficulty level should be between 1 and 6'],
        max: [6, 'Difficulty level should be between 1 and 6']
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

cubeSchema.post('save', function (err, cube, next) {
    if(err.name === 'MongoError' && err.code === 11000){
        err.message = 'Cannot create cube with an already existing name!';
        return next();
    }
    
    if(err.errors.difficultyLevel && err.errors.difficultyLevel.kind === 'Number'){
        err.errors.difficultyLevel.message = 'Difficulty level should be a number';
    }
    
    next();
});

cubeSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

cubeSchema.post('findOneAndUpdate', function (err, cube, next) {
    if(err.name === 'MongoError' && err.code === 11000){
        err.message = 'Cannot change cube name to an already existing one!';
    }
    
    next();
});

cubeSchema.pre('remove', async function (err, cube, next) {
    await Accessory.updateMany(
        {_id: {$in: this.accessories}},
        {$pull: {cubes: this._id}}
    );

    next();
});

cubeSchema.path('imageUrl').validate(function(url) {
    const regex = RegExp('^(http:\/\/|https:\/\/)', 'i');

    return regex.test(url)
}, 'Invalid image url string!');

module.exports = mongoose.model('Cube', cubeSchema);

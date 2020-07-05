const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: [true, 'Name cannot be empty'],
        minlength: [5, 'Name should be minimum 5 symbols'],
        maxlength: [30, 'Name should be maximum 30 symbols'],
        match: [/^[A-Za-z0-9/\s]+$/, 'Accessory name is not valid']
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
        required: [true, 'Image Url cannot be empty']
    },
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
});

accessorySchema.post('save', function (err, acc, next) {
    if(err.name === 'MongoError' && err.code === 11000){
        err.message = 'Cannot create accessory with an already existing name!';
        return next();
    }
    
    next();
});

accessorySchema.path('imageUrl').validate(function(url) {
    const regex = RegExp('^(http:\/\/|https:\/\/)', 'i');
    
    return regex.test(url)
}, 'Invalid image url string!');

module.exports = mongoose.model('Accessory', accessorySchema);

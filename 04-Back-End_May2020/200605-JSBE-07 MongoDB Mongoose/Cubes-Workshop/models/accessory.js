const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
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
    cubes: [{
        type: 'ObjectId',
        ref: 'Cube'
    }]
});

accessorySchema.path('imageUrl').validate(function(url) {
    const regex = RegExp('^(http:\/\/|https:\/\/)', 'i');
    
    return regex.test(url)
}, 'Invalid image url string!');

module.exports = mongoose.model('Accessory', accessorySchema);

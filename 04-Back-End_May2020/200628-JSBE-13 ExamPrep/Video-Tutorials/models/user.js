const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const config = require('../config/config');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [{
        type: 'ObjectId',
        ref: 'Course'
    }]
});

userSchema.methods.verifyPassword = async function(password) {
    const passwordMatch = await bcrypt.compare(password, this.password);

    return passwordMatch;
}

userSchema.pre('save', async function(err, user, next){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(+config.saltRounds);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }
    return;
});

module.exports = mongoose.model('User', userSchema);
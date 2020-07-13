const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


class UserManager {
    async register(username, password) {
        const user = new User({ username, password });
        const registeredUser = await user.save();

        const token = this._generateToken({ id: registeredUser._id, username: registeredUser.username });
        return token;
    }

    async login(username, password) {

        const user = await User.findOne({username});
        
        if(!user){
            return undefined;
        }
        
        const passwordMatch = await user.verifyPassword(password);

        if(!passwordMatch){
            return undefined;
        }

        const token = this._generateToken({ id: user._id, username: user.username });
        return token;
    }

    _generateToken(data) {
        const token = jwt.sign(data, config.jwtSecret);
        return token;
    }
}

module.exports = UserManager;
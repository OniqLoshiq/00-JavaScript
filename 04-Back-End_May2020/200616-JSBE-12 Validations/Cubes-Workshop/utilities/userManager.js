const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

class UserManager {
    async register(username, password) {
        const salt = await bcrypt.genSalt(+config.saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({ username, password: hashedPassword });
        const registeredUser = await user.save();

        const token = this._generateToken({ id: registeredUser._id, username: registeredUser.username });

        return token;
    }

    async login(username, password) {
        const user = await User.findOne({ username });
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
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
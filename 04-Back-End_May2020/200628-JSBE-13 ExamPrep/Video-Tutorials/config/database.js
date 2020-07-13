const config = require('./config');
const mongoose = require('mongoose');

module.exports = () => {
    return mongoose.connect(config.databaseUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
        console.log('Database is setup and running!')
    );
};
require('dotenv').config();

const config = require('./config/config');
const express = require('express');
const app = express();

require('./config/express')(app);
require('./config/routes')(app);

require('./config/database')().then(() => {
    app.listen(config.port, console.log(`Server is running on port ${config.port}! Have fun...`));
});


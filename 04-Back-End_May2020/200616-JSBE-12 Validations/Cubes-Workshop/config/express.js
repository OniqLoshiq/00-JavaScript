const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser')

module.exports = (app) => {
    app.engine('.hbs', handlebars({
        extname: '.hbs',
        helpers: {
            inc: function(value, options){
                return parseInt(value) + 1;
            }
        }
    }));

    app.set('view engine', '.hbs');

    app.use(express.urlencoded({ extended: true })); 

    app.use('/static', express.static('static'));

    app.use(cookieParser());
};
const env = process.env.NODE_ENV || 'development';

module.exports = {
    development: {
        port: process.env.PORT || 4000,
        databaseUrl: process.env.DB_URL,
        saltRounds: process.env.BCRYPT_SALT,
        jwtSecret:process.env.JWT_SECRET,
        cookie: 'auth-id'
    },
    production: {}
}[env];
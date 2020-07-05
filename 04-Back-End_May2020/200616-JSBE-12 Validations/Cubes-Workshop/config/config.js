module.exports = {
    development: {
        port: process.env.PORT || 3000,
        databaseUrl: process.env.DB_URL,
        saltRounds: process.env.BCRYPT_SALT,
        jwtSecret:process.env.JWT_SECRET
    },
    production: {}
};
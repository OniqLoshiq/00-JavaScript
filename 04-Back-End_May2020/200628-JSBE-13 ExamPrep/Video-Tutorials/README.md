1) create .env file
2) include DB_URL variable with your own mongoDB link
3) include BCRYPT_SALT variable with the number of salt rounds
4) include JWT_SECRET variable
5) use 'npm run start' to run the server

User validations are done by express-validator,
Course validations are done with mongoose build-in validator
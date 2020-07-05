const env = process.env.NODE_ENV || 'development'
const jwt = require('jsonwebtoken')
const config = require('../config/config')[env]

const authAccess = (req, res, next) => {
    const token = req.cookies['aid']

    if (!token) {
      return res.redirect('/')
    }
    
    try {
      const decodedToken = jwt.verify(token, config.jwtSecret);
      req.userId = decodedToken.id;
      req.username = decodedToken.username;
      next()
    } catch(e) {
      return res.redirect('/')
    }
  }

  const isLoggedIn = (req, res, next) => {
    const token = req.cookies['aid'];

    if(!token){
        req.isLoggedIn = false;
    }

    try {
        jwt.verify(token, config.jwtSecret);
        req.isLoggedIn = true;
    } catch(e){
      req.isLoggedIn = false;
    }

    next();
}

module.exports = {
  authAccess,
  isLoggedIn
}
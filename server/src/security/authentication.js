const config = require('../../config.json')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
let authentication = {};

authentication.generateToken = function(username) {
  return jwt.sign({username: username}, config.token_secret);
}

authentication.cryptPassword = async function(password) {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, function(err, salt) {
      if (err) {
        reject(err);
      } else {
        bcrypt.hash(password, salt, function(err, hash) {
          resolve(hash);
        });
      }
    });
  });
};

authentication.comparePassword = async function(plainPass, hashword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {
      if (err) {
        reject(err)
      } else {
        resolve(isPasswordMatch)
      }
    });
  });
};

authentication.authenticateToken = function(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, config.token_secret, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }

    req.user = user

    next()
  })
}

authentication.verify = function(request, response) {
  const authHeader = request.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  return new Promise((resolve) => {
    if (token == null) {
      resolve(false);
    }

    jwt.verify(token, config.token_secret, (error) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    })
  })
}

module.exports = authentication;
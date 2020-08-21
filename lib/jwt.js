const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../utils/constants');
const { errors } = require('../utils/constants');

/* -- TOKEN HANDLERS --*/
exports.generateToken = (doc) => jwt.sign(doc, jwtSecret, {
  expiresIn: jwtExpiresIn,
});

exports.validateToken = (token) => {
  if (token) {
    return jwt.verify(token, jwtSecret, (err, decoded) => {
      try {
        if (err || !decoded) {
          return { error: errors.AUTHENTICATION_FAILED };
        }
        return decoded;
      } catch (error) {
        console.log(error);
        return { error: errors.AUTHENTICATION_FAILED };
      }
    });
  }
  return { error: errors.NO_TOKEN_PROVIDED };
};

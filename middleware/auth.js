const jwt = require('jsonwebtoken');
const utils = require('../utils/utils');
const { errors, jwtSecret } = require('../utils/constants');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    return jwt.verify(token, jwtSecret, async (err, decoded) => {
      try {
        if (err || !decoded) {
          return utils.errorResponse(res, errors.AUTHENTICATION_FAILED, err);
        } else {
          // TODO: Find user in db and set data on req.user.
          // const user = User.find({uuid});
          // req.user = user;
          return utils.errorResponse(res, errors.AUTHENTICATION_FAILED);
        }
      } catch (error) {
        console.log(error);
        return utils.errorResponse(res, errors.AUTHENTICATION_FAILED, error);
      }
    });
  }
  return utils.errorResponse(res, errors.NO_TOKEN_PROVIDED);
};

// TODO: (MUS)
// exports.profileCompleted = (req, res, next) => {
//   if (req.user.fullName) return next();

//   return utils.errorResponse(res, errors.MUST_COMPLETE_PROFILE);
// };
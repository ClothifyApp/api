const jwt = require('../lib/jwt');
const utils = require('../utils/utils');
const User = require('../services/User');
const { errors } = require('../utils/constants');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  const { id, error } = jwt.validateToken(token);

  if (error) {
    return utils.errorResponse(res, error);
  }

  if (!id) {
    return utils.errorResponse(res, errors.AUTHENTICATION_FAILED);
  }

  const user = await User.getOne(id);

  if (user) {
    req.user = user;
    return next();
  }

  return utils.errorResponse(res, errors.AUTHENTICATION_FAILED);
};

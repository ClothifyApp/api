const jwt = require('../../lib/jwt');
const utils = require('../utils');

exports.authenticate = async (req, res, next) => {
    const token = req.headers['x-access-token'];
    const { error } = jwt.validateToken(token);
  
    if (error) {
      return utils.errorResponse(res, error);
    }
      
     return next();

  };
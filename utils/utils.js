const jwt = require('jsonwebtoken');

const {
  errorsObj,
  defaultError,
  jwtSecret,
  jwtExpiresIn,
} = require('./constants');

exports.okResponse = (res, httpCode, data, message) => {
  res.set('Access-Control-Allow-Origin', '*');
  return res.status(httpCode).json({ data, message });
};

exports.errorResponse = (res, id, extra) => {
  let error = errorsObj[id];
  error = error ? error : defaultError;

  return res.status(error.httpCode).json({
    error: {
      id: id,
      message: error.message,
      extra: extra,
    },
  });
};

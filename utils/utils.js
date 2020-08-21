const { errorsObj, defaultError } = require('./constants');

exports.okResponse = (res, httpCode, data, message) => {
  res.set('Access-Control-Allow-Origin', '*');
  return res.status(httpCode).json({ data, message });
};

exports.errorResponse = (res, id, extra) => {
  let error = errorsObj[id];
  error = error || defaultError;

  return res.status(error.httpCode).json({
    error: {
      id,
      message: error.message,
      extra,
    },
  });
};

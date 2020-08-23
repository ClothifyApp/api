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

exports.shuffleArray = (list) => {
  // eslint-disable-next-line no-plusplus
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    // eslint-disable-next-line no-param-reassign
    [list[i], list[j]] = [list[j], list[i]];
  }

  return list;
};

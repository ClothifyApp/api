exports.secondsSinceEpoch = (date) => {
  const now = (date) ? new Date(date) : new Date();
  const result = Math.round(now.getTime() / 1000);
  return result;
};

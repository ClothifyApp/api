exports.secondsSinceEpoch = (date) => {
  const now = (date) ? new Date(date) : new Date();
  console.log('Now date:', now);
  const result = Math.round(now.getTime() / 1000);
  console.log('result', result);
  return result;
}
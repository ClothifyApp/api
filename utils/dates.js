exports.secondsSinceEpoch = (date) => {
    const now = (date) ? new Date(date) : new Date();
    return Math.round(now.getTime() / 1000)
}
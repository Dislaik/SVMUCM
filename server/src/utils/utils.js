var utils = {};

utils.parseDateFormat = function(date) {
  return date.slice(0, 19).replace('T', ' '); 
}

utils.getCurrentUTCTimeZone = function() {
  let date = new Date(Date.now());
  let dateUTC = date.toISOString();
  return dateUTC.slice(0, 19).replace('T', ' ');
}

module.exports = utils;
const crypto = require("crypto");

var utils = {};

utils.parseDateFormat = function(date) {
  return date.slice(0, 19).replace('T', ' '); 
}

utils.getCurrentUTCTimeZone = function() {
  let date = new Date(Date.now());
  let dateUTC = date.toISOString();
  return dateUTC.slice(0, 19).replace('T', ' ');
}

utils.validateRUN = function(run) {
  run = run.replace(/\./g, '').replace('-', '').trim();
  
  if (run.length < 8) return false;

  let body = run.slice(0, -1);
  let dv = run.slice(-1).toUpperCase();
  
  let sum = 0;
  let multi = 2;
  
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multi;
    multi = multi < 7 ? multi + 1 : 2;
  }
  
  let dv_ = 11 - (sum % 11);
  
  if (dv_ === 11) dv_ = '0';
  else if (dv_ === 10) dv_ = 'K';
  else dv_ = dv_.toString();
  
  return dv === dv_;
}

utils.cleanRUN = function(p1) {
    return p1.replace(/[.-]/g, '');
}

utils.generateRandomNumbers = function() {
  const numbers = [];
  
  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * 10);
    numbers.push(randomNum);
  }

  return numbers.join(' ');
}

utils.generateSecurePassword = function(length = 12) {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    const randomIndex = crypto.randomInt(0, charset.length);
    password += charset[randomIndex];
  }

  return password;
}

module.exports = utils;
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

utils.validateRUN = function(rut) {
    // Limpiar el RUT, eliminando puntos, guiones y espacios
    rut = rut.replace(/\./g, '').replace('-', '').trim();
    
    // Verificar que el RUT tenga al menos 8 caracteres
    if (rut.length < 8) return false;

    // Extraer el dígito verificador
    let cuerpo = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();
    
    // Calcular el dígito verificador
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador < 7 ? multiplicador + 1 : 2;
    }
    
    let dvEsperado = 11 - (suma % 11);
    
    if (dvEsperado === 11) dvEsperado = '0';
    else if (dvEsperado === 10) dvEsperado = 'K';
    else dvEsperado = dvEsperado.toString();
    
    // Comparar el dígito verificador calculado con el ingresado
    return dv === dvEsperado;
}

utils.cleanRUN = function(p1) {
    return p1.replace(/[.-]/g, '');
}

utils.generateRandomNumbers = function() {
  const numbers = [];
  
  for (let i = 0; i < 5; i++) {
    const randomNum = Math.floor(Math.random() * 10); // Genera un número entre 0 y 9
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
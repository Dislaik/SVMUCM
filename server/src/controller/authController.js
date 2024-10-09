const { Utils } = require('sequelize');
const auth = require('../security/authentication');
const userService = require('../service/userService');
const utils = require('../utils/utils');

class AuthController {
  async register(request, response) {
    try {
      const { username, email, password, repeatPassword, firstName, lastName } = request.body;
      const error = {};

      if (username.trim() === '') {
        error.username = { error: 'Debe ingresar su RUN' }
      } else if (/[a-jl-zA-JL-Z]/.test(username)) {
        error.username = { error: 'El formato del RUT es inválido' }
      } else if (utils.cleanRUN(username).length < 8 || utils.cleanRUN(username).length > 12) {
        error.username = { error: 'El RUN debe tener entre 8 y 12 caracteres' }
      } else if (!utils.validateRUN(username)) {
        error.username = { error: 'El RUN ingresado no es válido' }
      } else if (await userService.existsByUsername(username)) {
        error.username = { error: 'Nombre de usuario ya esta registrado' }
      }

      if (firstName.trim() === '') {
        error.firstName = { error: 'Debe ingresar su nombre' }
      } else if (!/^[A-Za-z ]+$/.test(firstName)) {
        error.firstName = { error: 'Su nombre solo pueden contener letras' }
      }

      if (lastName.trim() === '') {
        error.lastName = { error: 'Debe ingresar su apellido' }
      } else if (!/^[A-Za-z ]+$/.test(lastName)) {
        error.lastName = { error: 'Su apellido solo pueden contener letras' }
      }

      if (email.trim() === '') { 
        error.email = { error: 'Debe ingresar su correo electronico' }
      } else if (!email.includes('@') || !email.includes('.')) {
        error.email = { error: 'El correo electronico debe ser uno valido'}
      } else if (await userService.existsByEmail(email)) {
        error.email = { error: 'El correo electronico ya esta registrado'}
      }

      if (password.trim() === '') {
        error.password = { error: 'Debe ingresar su contraseña' }
      } else if (password.lenght < 8 || password.lenght > 32) {
        error.password = { error: 'La contraseña debe tener una longitud de entre 8 a 32 caracteres'}
      } else if (!/[a-zA-Z]/.test(password)) {
        error.password = { error: 'La contraseña debe contener al menos una letra'}
      } else if (!/[0-9]/.test(password)) {
        error.password = { error: 'La contraseña debe contener al menos un número'}
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        error.password = { error: 'La contraseña debe contener al menos un símbolo'}
      } 
      
      if (repeatPassword.trim() === '') {
        error.repeatPassword = { error: 'Debe repetir su contraseña' }
      } else if (password != repeatPassword) {
        error.repeatPassword = { error: 'Las contraseñas no coinciden'}
      }

      if (Object.keys(error).length === 0) {
        const passwordCrypted = await auth.cryptPassword(password)
        const userObject = {
          username: username,
          password: passwordCrypted,
          email: email,
          first_name: firstName,
          last_name: lastName,
          image: 'http://localhost:8080/attachments/avatarDefault.png',
          id_role: 1,
          created_at: utils.getCurrentUTCTimeZone()
        }

        const user = await userService.create(userObject)

        if (user) {
          const keyToken = auth.generateToken(username);

          response.status(200).json({ ok: true, token: keyToken});
        } else {
          response.status(500).json({ fatalError: 'Hubo un error inesperado al crear el usuario' });
        }
      } else {
        response.status(400).json(error);
      }
      
    } catch (error) {
      response.status(500).json({ error: 'Hubo un error inesperado' });
    };
  };

  async login(request, response) {
    try {
      const { username, password } = request.body;
      const error = {};
      
      if (username.trim() === '') {
        error.username = { error: 'Debe ingresar su RUN' }
      } else if (/[a-jl-zA-JL-Z]/.test(username)) {
        error.username = { error: 'El formato del RUT es inválido' }
      } else if (utils.cleanRUN(username).length < 8 || utils.cleanRUN(username).length > 12) {
        error.username = { error: 'El RUN debe tener entre 8 y 12 caracteres' }
      } else if (!utils.validateRUN(username)) {
        error.username = { error: 'El RUN ingresado no es válido' }
      } else if (!await userService.existsByUsername(username)) {
        error.username = { error: "Nombre de usuario incorrecto"}
      }

      if (password.trim() === "") {
        error.password = { error: "Debe ingresar su contraseña"}
      }

      if (Object.keys(error).length === 0) {
        const user = await userService.getByUsername(username);

        if (await auth.comparePassword(password, user.password)) {
          const keyToken = auth.generateToken(username);

          response.status(200).json({ ok: true, token: keyToken});
        } else {
          error.password = { error: "Contraseña incorrecta"}
          response.status(400).json(error);
        }
      } else {
        response.status(400).json(error);
      }
    } catch (error) {
      response.status(500).json({ fatalError: 'Hubo un error inesperado' });
    }
  }

  async verify(request, response) {
    const result = await auth.verify(request, response)
  
    response.status(200).json(result);
  }
}

module.exports = new AuthController();
const auth = require('../security/authentication');
const userService = require('../service/userService');
const utils = require('../utils/utils');

class AuthController {
  async register(request, response) {
    try {
      const { username, email, password, firstName, lastName } = request.body;

      console.log(await userService.existsByUsername(username))

      if (await userService.existsByUsername(username)) {
        response.status(400).json({ error: 'Ya existe un usuario con ese nombre de usuario' });
      } else if (await userService.existsByEmail(email)) {
        response.status(400).json({ error: 'Ya existe un usuario con ese email' });
      } else {
        const passwordCrypted = await auth.cryptPassword(password)
        const user = {
          username: username,
          password: passwordCrypted,
          email: email,
          first_name: firstName,
          last_name: lastName,
          image: 'http://localhost:8080/attachments/avatarDefault.png',
          id_role: 1,
          created_at: utils.getCurrentUTCTimeZone()
        }
        //console.log(user);
        const result = await userService.create(user);
        //console.log(result)

        if (result) {
          response.status(200).json(result);
        } else {
          response.status(400).json({ error: 'Hubo un error inesperado' });
        }
      };
    } catch (error) {
      response.status(500).json({ error: 'Hubo un error inesperado' });
    };
  };

  async login(request, response) {
    try {
      const { username, password } = request.body;

      if (await userService.existsByUsername(username)) {
        const user = await userService.getByUsername(username);

        if (await auth.comparePassword(password, user.password)) {
          const token = auth.generateToken(username);

          response.status(200).json({ token: token});
        } else {
          response.status(400).json({ error: 'Nombre de usuario o contraseña no validos' });
        }
      } else {
        response.status(400).json({ error: 'Nombre de usuario o contraseña no validos' });
      }
    } catch (error) {
      response.status(500).json({ error: 'Hubo un error inesperado' });
    }
  }

  async verify(request, response) {
    const result = await auth.verify(request, response)
  
    response.status(200).json(result);
  }
}

module.exports = new AuthController();
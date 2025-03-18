const auth = require('../security/authentication'); // La seguridad de autenticación es llamada
const userService = require('../service/userService'); // El servicio User es llamado
const utils = require('../utils/utils'); // La clase Utils es llamada

// Controlador de la clase Auth, valida los datos recibidos y realiza actualizaciones y validaciones correspondientes en el modelo User
class AuthController {

  // Metodo para registrar nuevos User a traves de un conducto regular
  async register(request, response) {
    try {
      const { username, email, password, repeatPassword, firstName, lastName, address, phone } = request.body;
      const error = {};
      
      if (await userService.existsByUsername(username)) {
        error.username = 'Nombre de usuario ya esta registrado';
      }

      if (await userService.existsByEmail(email)) {
        error.email = 'El correo electronico ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const passwordCrypted = await auth.cryptPassword(password)
        const object = {
          username: username,
          password: passwordCrypted,
          email: email,
          first_name: firstName,
          last_name: lastName,
          address: address,
          phone: phone,
          image: 'http://localhost:8080/attachments/avatarDefault.png',
          id_role: 7,
          id_user_status: 1,
          created_at: new Date()
        }

        const p1 = await userService.create(object)
        
        if (p1) {
          const keyToken = auth.generateToken(username);

          return response.status(200).json({ ok: true, message: keyToken});
        } else {
          return response.status(400).json({ ok: false, error: 'Hubo un error inesperado al crear el usuario'});
        }
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    };
  };

  // Metodo para iniciar sesion de un User
  async login(request, response) {
    try {
      const { username, password } = request.body;
      const error = {};
      
    
      if (!await userService.existsByUsername(username)) {
        error.username = 'Nombre de usuario incorrecto';
      }

      if (Object.keys(error).length === 0) {
        const p1 = await userService.getByUsername(username);

        if (await auth.comparePassword(password, p1.password)) {
          const keyToken = auth.generateToken(username);

          if (p1.id_user_status.name === 'inactive') {
            error.username = "La cuenta del usuario no esta activa, contacta con un administrador.";

            return response.status(400).json({ ok: false, error: error});
          }

          return response.status(200).json({ ok: true, message: keyToken});
        } else {
          error.password = "Contraseña incorrecta";
          
          return response.status(400).json({ ok: false, error: error});
        }
      } else {
        return response.status(400).json({ ok: false, error: error});
      }
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo para verificar una sesion de User
  async verify(request, response) {
    const result = await auth.verify(request, response)
  
    return response.status(200).json(result);
  }
}

module.exports = new AuthController();
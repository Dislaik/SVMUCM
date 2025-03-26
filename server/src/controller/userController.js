const UserService = require('../service/userService'); // El servicio User es llamado
const auth = require('../security/authentication'); // La seguridad de autenticación es llamada
 
// Controlador de la clase User, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo User
class UserController {

  // Metodo que obtiene todos los datos de User
  async getAll(request, response) {
    try {
      const p1 = await UserService.getAll();
      
      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un User por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await UserService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un User por su nombre de usuario
  async getByUsername(request, response) {
    try {
      const { username } = request.params;
      const p1 = await UserService.getByUsername(username);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un User por su correo electronico
  async getByEmail(request, response) {
    try {
      const { email } = request.params;
      const p1 = await UserService.getByEmail(email);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que crea un User a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request;
      let error = {};
      
      if (await UserService.existsByUsername(body.username)) {
        error.username = 'El nombre de usuario ya esta registrado';
      }

      if (await UserService.existsByEmail(body.email)) {
        error.email = 'El correo electrónico ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const passwordCrypted = await auth.cryptPassword(body.password);
        const object = {
          username: body.username,
          password: passwordCrypted,
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          address: body.address,
          phone: body.phone,
          image: 'http://localhost:3000/attachments/avatarDefault.png',
          id_role: body.id_role.id,
          id_user_status: body.id_user_status.id,
          created_at: body.created_at
        }

        let p1 = await UserService.create(object);
        p1.id_role = body.id_role;
        p1.id_user_status = body.id_user_status;

        return response.status(200).json({ ok: true, message: p1 });
      }

      return response.status(400).json({ ok: false, error: error });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que actualiza un User a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const targetUser = await UserService.getByEmail(body.email);
      const aux = await UserService.getById(id);
      let error = {};

      if (targetUser && body.email === targetUser.email && Number(id) !== targetUser.id) {
        error.email = 'El correo electrónico ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        let password;

        if (body.password === aux.password) {
          password = aux.password;
        } else {
          password = await auth.cryptPassword(body.password);
        }

        const object = {
          username: body.username,
          password: password,
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          address: body.address,
          phone: body.phone,
          image: 'http://localhost:3000/attachments/avatarDefault.png',
          id_role: body.id_role.id,
          id_user_status: body.id_user_status.id,
          created_at: body.created_at
        } 

        let p1 = await UserService.update(id, object);

        if (!p1) {
          return response.status(404).json({ ok: true, message: null });
        }

        p1.id_role = body.id_role;
        p1.id_user_status = body.id_user_status;

        return response.status(200).json({ ok: true, message: p1 });
      }

      return response.status(400).json({ ok: false, error: error });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que devuelve el numero de usuarios por su rol
  async getCountByRoleId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await UserService.getCountByRoleId(id);

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }
}

module.exports = new UserController();
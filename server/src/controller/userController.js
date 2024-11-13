const userService = require('../service/userService');
const auth = require('../security/authentication');
const utils = require('../utils/utils');

class UserController {
  async getAll(request, response) {
    try {
      const users = await userService.getAll();
      
      response.status(200).json(users);
    } catch (error) {
      response.status(500).json({ error: 'Error fetching users' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const user = await userService.getById(id)

      if (user) {
        return response.status(200).json({ ok: true, message: user}); 
      }

      response.status(404).json({ ok: false, error: 'User not found'});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByUsername(request, response) {
    try {
      const { username } = request.params;
      const user = await userService.getByUsername(username)

      if (user) {
        return response.status(200).json({ ok: true, message: user});
      }

      response.status(404).json({ ok: false, error: 'User not found'});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async create(request, response) {
    try {
      const { body } = request;
      let error = {};
      
      if (await userService.existsByUsername(body.username)) {
        error.username = 'Nombre de usuario ya esta registrado';
      }

      if (await userService.existsByEmail(body.email)) {
        error.email = 'El correo electronico ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        
        const passwordCrypted = await auth.cryptPassword(body.password)
        const userObject = {
          username: body.username,
          password: passwordCrypted,
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          address: body.address,
          phone: body.phone,
          image: 'http://localhost:8080/attachments/avatarDefault.png',
          id_role: body.id_role.id,
          created_at: utils.getCurrentUTCTimeZone()
        }

        let user = await userService.create(userObject);
        user.id_role = body.id_role;

        return response.status(200).json({ ok: true, message: user});
      }

      response.status(200).json({ ok: false, error: error});
    } catch (error) {
      response.status(500).json({ ok: false,  error: error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const user = await userService.getById(id)
      let password;
      console.log(body.password === user.password)
      if (body.password === user.password) {
        password = user.password;
      } else {
        password = await auth.cryptPassword(body.password);
      }


      const userObject = {
        username: body.username,
        password: password,
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        address: body.address,
        phone: body.phone,
        image: 'http://localhost:8080/attachments/avatarDefault.png',
        id_role: body.id_role.id,
        created_at: body.created_at
      } 
      console.log(userObject)

      const userUpdate = await userService.update(id, userObject);
      if (!userUpdate) {
        return response.status(404).json({ ok: false,  error: 'User not found' });
      }

      return response.status(200).json({ ok: true, message: userUpdate});
    } catch (error) {
      return response.status(500).json({ error: 'Error updating user' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const user = await userService.getById(id)

      await userService.delete(id);

      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
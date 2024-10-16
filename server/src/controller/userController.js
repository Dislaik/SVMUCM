const userService = require('../service/userService');

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

      response.status(200).json(user);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByUsername(request, response) {
    try {
      const { username } = request.params;
      const user = await userService.getByUsername(username)

      response.status(200).json(user);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const user = await userService.create(body);

      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ error: 'Error creating user' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const user = await userService.update(id, body);
      if (!user) {
        return response.status(404).json({ message: 'User not found' });
      }

      response.status(200).json(user);
    } catch (error) {
      response.status(500).json({ error: 'Error updating user' });
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
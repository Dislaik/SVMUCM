const roleService = require('../service/roleService');

class RoleController {
  async getAll(request, response) {
    try {
      const roles = await roleService.getAll();
      
      response.status(200).json(roles);
    } catch (error) {
      response.status(500).json({ error: 'Error fetching roles' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const role = await roleService.getById(id)

      response.status(200).json(role);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const role = await roleService.create(body);

      response.status(200).json(role);
    } catch (error) {
      response.status(500).json({ error: 'Error creating role' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const role = await roleService.update(id, body);
      if (!role) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(role);
    } catch (error) {
      response.status(500).json({ error: 'Error updating role' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const role = await roleService.getById(id)

      await roleService.delete(id);

      res.status(200).json(role);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new RoleController();
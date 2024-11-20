const roleService = require('../service/roleService');

class RoleController {
  async getAll(request, response) {
    try {
      const roles = await roleService.getAll();
      
      response.status(200).json({ ok: true, message: roles});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const role = await roleService.getById(id)

      if (role) {
        return response.status(200).json({ ok: true, message: role}); 
      }

      response.status(404).json({ ok: false, error: 'Role not found'});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const role = await RegionService.getByName(name);
      
      if (!role) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: role});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const role = await RegionService.getByLabel(label);

      if (!role) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: role});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
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
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: role});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
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
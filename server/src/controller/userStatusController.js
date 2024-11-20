const UserStatusService = require('../service/userStatusService');

class UserStatusController {
  async getAll(request, response) {
    try {
      const userStatus = await UserStatusService.getAll();
      
      response.status(200).json({ ok: true, message: userStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const userStatus = await UserStatusService.getById(id)

      response.status(200).json(userStatus);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const userStatus = await UserStatusService.getByName(name);
      
      if (!userStatus) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: userStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const userStatus = await UserStatusService.getByLabel(label);

      if (!userStatus) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: userStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const userStatus = await UserStatusService.create(body);

      response.status(200).json(userStatus);
    } catch (error) {
      response.status(500).json({ error: 'Error creating userStatus' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const userStatus = await UserStatusService.update(id, body);
      if (!userStatus) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(userStatus);
    } catch (error) {
      response.status(500).json({ error: 'Error updating userStatus' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const userStatus = await UserStatusService.getById(id)

      await UserStatusService.delete(id);

      res.status(200).json(userStatus);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new UserStatusController();
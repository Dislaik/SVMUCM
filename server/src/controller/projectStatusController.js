const ProjectStatusService = require('../service/projectStatusService');

class RoleController {
  async getAll(request, response) {
    try {
      const projectStatues = await ProjectStatusService.getAll();
      
      response.status(200).json({ ok: true, message: projectStatues});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const projectStatus = await ProjectStatusService.getById(id)

      response.status(200).json(projectStatus);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const projectStatus = await ProjectStatusService.getByName(name);
      
      if (!projectStatus) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: projectStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const projectStatus = await ProjectStatusService.getByLabel(label);

      if (!projectStatus) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: projectStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const projectStatus = await ProjectStatusService.create(body);

      response.status(200).json(projectStatus);
    } catch (error) {
      response.status(500).json({ error: 'Error creating projectStatus' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const projectStatus = await ProjectStatusService.update(id, body);
      if (!projectStatus) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(projectStatus);
    } catch (error) {
      response.status(500).json({ error: 'Error updating projectStatus' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const projectStatus = await ProjectStatusService.getById(id)

      await ProjectStatusService.delete(id);

      res.status(200).json(projectStatus);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new RoleController();
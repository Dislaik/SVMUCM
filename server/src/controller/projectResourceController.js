const ProjectResourceService = require('../service/projectResourceService');

class ProjectResourceController {
  async getAll(request, response) {
    try {
      const projectResources = await ProjectResourceService.getAll();
      
      response.status(200).json(projectResources);
    } catch (error) {
      response.status(500).json({ error: 'Error fetching ProjectStatues' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const projectResource = await ProjectResourceService.getById(id)

      response.status(200).json(projectResource);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const projectResource = await ProjectResourceService.create(body);

      response.status(200).json(projectResource);
    } catch (error) {
      response.status(500).json({ error: 'Error creating projectResource' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const projectResource = await ProjectResourceService.update(id, body);
      if (!projectResource) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(projectResource);
    } catch (error) {
      response.status(500).json({ error: 'Error updating projectResource' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const projectResource = await ProjectResourceService.getById(id)

      await ProjectResourceService.delete(id);

      res.status(200).json(projectResource);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProjectResourceController();
const ResourceService = require('../service/resourceService');

class ResourceController {
  async getAll(request, response) {
    try {
      const resources = await ResourceService.getAll();
      
      response.status(200).json({ ok: true, message: resources});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const resource = await ResourceService.getById(id)

      if (!resource) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: resource});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const resource = await ResourceService.create(body);

      response.status(200).json({ ok: true, message: resource});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const resource = await ResourceService.update(id, body);
      if (!resource) {
        return response.status(404).json({ message: 'Resource not found' });
      }

      response.status(200).json(resource);
    } catch (error) {
      response.status(500).json({ error: 'Error updating resource' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const resource = await ResourceService.getById(id)

      await ResourceService.delete(id);

      res.status(200).json(resource);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ResourceController();
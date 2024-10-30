const RegionService = require('../service/regionService');

class RegionController {
  async getAll(request, response) {
    try {
      const regions = await RegionService.getAll();
      
      response.status(200).json({ ok: true, message: regions});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const region = await RegionService.getById(id)

      response.status(200).json(region);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const region = await RegionService.getByName(name);
      
      if (!region) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: region});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const region = await RegionService.getByLabel(label);

      if (!region) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: region});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const region = await RegionService.create(body);

      response.status(200).json(region);
    } catch (error) {
      response.status(500).json({ error: 'Error creating region' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const region = await RegionService.update(id, body);
      if (!region) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(region);
    } catch (error) {
      response.status(500).json({ error: 'Error updating region' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const region = await RegionService.getById(id)

      await RegionService.delete(id);

      res.status(200).json(region);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new RegionController();
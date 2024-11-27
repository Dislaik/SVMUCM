const RegionService = require('../service/regionService');

class RegionController {
  async getAll(request, response) {
    try {
      const regions = await RegionService.getAll();
      
      return response.status(200).json({ ok: true, message: regions});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const region = await RegionService.getById(id)

      return response.status(200).json({ ok: true, message: region});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const region = await RegionService.getByName(name);
      
      if (!region) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: region});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const region = await RegionService.getByLabel(label);

      if (!region) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: region});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const region = await RegionService.create(body);

      return response.status(200).json({ ok: true, message: region});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const region = await RegionService.update(id, body);
      if (!region) {
        return response.status(404).json({ ok: true, message: 'Region not found'});
      }

      return response.status(200).json({ ok: true, message: region});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const region = await RegionService.getById(id)

      await RegionService.delete(id);

      return response.status(200).json({ ok: true, message: region});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new RegionController();
const CityService = require('../service/cityService');

class CityController {
  async getAll(request, response) {
    try {
      const cities = await CityService.getAll();
      
      response.status(200).json(cities);
    } catch (error) {
      response.status(500).json({ error: 'Error fetching cities' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const city = await CityService.getById(id)

      response.status(200).json(city);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const city = await CityService.getByName(name);
      
      if (!city) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: city});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const city = await CityService.getByLabel(label);

      if (!city) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: city});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByRegionId(request, response) {
    try {
      const { id } = request.params;
      const cities = await CityService.getByRegionId(id);

      if (!cities) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: cities});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByRegionName(request, response) {
    try {
      const { name } = request.params;
      const cities = await CityService.getByRegionName(name);

      if (!cities) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: cities});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const city = await CityService.create(body);

      response.status(200).json(city);
    } catch (error) {
      response.status(500).json({ error: 'Error creating city' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const city = await CityService.update(id, body);
      if (!city) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(city);
    } catch (error) {
      response.status(500).json({ error: 'Error updating city' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const city = await CityService.getById(id)

      await CityService.delete(id);

      res.status(200).json(city);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CityController();
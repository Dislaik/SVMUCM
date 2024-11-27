const CityService = require('../service/cityService');

class CityController {
  async getAll(request, response) {
    try {
      const cities = await CityService.getAll();
      
      return response.status(200).json({ ok: true, message: cities});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const city = await CityService.getById(id)

      return response.status(200).json({ ok: true, message: city});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const city = await CityService.getByName(name);
      
      if (!city) {
        response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: city});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const city = await CityService.getByLabel(label);

      if (!city) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: city});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByRegionId(request, response) {
    try {
      const { id } = request.params;
      const cities = await CityService.getByRegionId(id);

      if (!cities) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: cities});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByRegionName(request, response) {
    try {
      const { name } = request.params;
      const cities = await CityService.getByRegionName(name);

      if (!cities) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: cities});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    //try {
      const { body } = request;
      let error = {};
      
      if (await CityService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const cityObject = {
          name: body.name,
          label: body.label,
          id_region: body.id_region.id
        }
        let city = await CityService.create(cityObject);

        city.id_region = body.id_region

        return response.status(200).json({ ok: true, message: city});
      }

      return response.status(200).json({ ok: false, error: error});
    // } catch (error) {
    //   return response.status(500).json({ ok: false, error: error});
    // }
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
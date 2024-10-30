const HeadquarterService = require('../service/headquarterService');

class HeadquarterController {
  async getAll(request, response) {
    try {
      const headquarters = await HeadquarterService.getAll();
      
      response.status(200).json({ ok: true, message: headquarters});
    } catch (error) {
      response.status(500).json({ ok: false, error: 'Error fetching headquarter' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const headquarter = await HeadquarterService.getById(id);
      
      if (!headquarter) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: headquarter});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const headquarter = await HeadquarterService.getByName(name);
      
      if (!headquarter) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: headquarter});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const headquarter = await HeadquarterService.getByLabel(label);

      if (!headquarter) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: headquarter});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const headquarter = await HeadquarterService.create(body);

      response.status(200).json(headquarter);
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const headquarter = await HeadquarterService.update(id, body);

      if (!headquarter) {
        response.status(404).json({ ok: false, error: 'Sede no encontrada' });
      }

      response.status(200).json({ ok: true, message: headquarter });
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const headquarter = await HeadquarterService.getById(id)

      if (!headquarter) {
        response.status(404).json({ ok: false, error: 'Sede no encontrada' });
      }

      await HeadquarterService.delete(id);

      res.status(200).json({ ok: true, message: headquarter});
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new HeadquarterController();
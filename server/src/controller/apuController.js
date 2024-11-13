const APUService = require('../service/apuService');

class APUController {
  async getAll(request, response) {
    try {
      const apus = await APUService.getAll();
      
      response.status(200).json({ ok: true, message: apus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const apu = await APUService.getById(id)

      if (apu) {
        return response.status(200).json({ ok: true, message: apu}); 
      }

      response.status(404).json({ ok: false, error: 'APU not found'});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const apu = await RegionService.getByName(name);
      
      if (!apu) {
        return response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: apu});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const apu = await RegionService.getByLabel(label);

      if (!apu) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: apu});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      console.log(body)
      const apu = await APUService.create(body);

      return response.status(200).json({ ok: true, message: apu});
    } catch (error) {
      return response.status(500).json({ error: 'Error creating apu' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const apu = await APUService.update(id, body);
      if (!apu) {
        return response.status(404).json({ message: 'APU not found' });
      }

      return response.status(200).json(apu);
    } catch (error) {
      return response.status(500).json({ error: 'Error updating apu' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const apu = await APUService.getById(id)

      await APUService.delete(id);

      res.status(200).json(apu);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new APUController();
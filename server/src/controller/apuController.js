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
      const apu = await APUService.getByName(name);
      
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
      const apu = await APUService.getByLabel(label);

      if (!apu) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: apu});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    const { body } = request
    console.log(await APUService.existsByName(body.name))
    try {
      const { body } = request
      let error = {};

      if (await APUService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado'
      }

      if (Object.keys(error).length === 0) {
        const apuObject = {
          name: body.name,
          label: body.label,
          description: body.description,
          created_at: body.created_at
        }

        let apu = await APUService.create(apuObject);

        /// Add relations (not have lol, but I put this comment anyway);

        return response.status(200).json({ ok: true, message: apu});
      }

      return response.status(200).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const aux = await APUService.getByName(body.name)
      let error = {};

      if (body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este Identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const apuObject = {
          name: body.name,
          label: body.label,
          description: body.description,
          created_at: body.created_at
        }

        const apu = await APUService.update(id, apuObject);

        if (!apu) {
          return response.status(404).json({ ok: false, error: 'APU not found'});
        }

        /// Add relations (not have lol, but I put this comment anyway);

        return response.status(200).json({ ok: true, message: apu});
      }

      return response.status(200).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const apu = await APUService.getById(id)

      await APUService.delete(id);

      return response.status(200).json({ ok: true, message: apu});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new APUController();
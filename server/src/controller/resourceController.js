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
      const { body } = request;
      let error = {};
      
      if (await ResourceService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const resourceObject = {
          name: body.name,
          label: body.label,
          description: body.description,
          price: body.price,
          created_at: body.created_at
        }
        let resource = await ResourceService.create(resourceObject);

        /// Add relations (not have lol, but I put this comment anyway);

        return response.status(200).json({ ok: true, message: resource});
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
      const aux = await ResourceService.getByName(body.name)
      let error = {};

      if (body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const resourceObject = {
          name: body.name,
          label: body.label,
          description: body.description,
          price: body.price,
          created_at: body.created_at
        }
        let resource = await ResourceService.update(id, resourceObject);

        if (!resource) {
          return response.status(404).json({ ok: false, error: 'Resource not found'});
        }

        /// Add relations (not have lol, but I put this comment anyway);

        return response.status(200).json({ ok: true, message: resource});
      }

      return response.status(200).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const resource = await ResourceService.getById(id)

      await ResourceService.delete(id);

      return response.status(200).json({ ok: true, message: resource});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new ResourceController();
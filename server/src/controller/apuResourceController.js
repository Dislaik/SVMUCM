const APUResourceService = require('../service/apuResourceService');

class APUResourceController {
  async getAll(request, response) {
    try {
      const apuResources = await APUResourceService.getAll();
			console.log(apuResources)
      
      response.status(200).json(apuResources);
    } catch (error) {
      response.status(500).json({ error: 'Error fetching apuResources' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const apuResource = await APUResourceService.getById(id)

      response.status(200).json(apuResource);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByAPUId(request, response) {
    try {
      const { id } = request.params;
      const apuResources = await APUResourceService.getByAPUId(id);

      if (!apuResources) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: apuResources});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

	async getByResourceId(request, response) {
    try {
      const { id } = request.params;
      const apuResources = await APUResourceService.getByResourceId(id);

      if (!apuResources) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: apuResources});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_apu: body.id_apu.id,
        id_resource: body.id_resource.id,
        amount: body.amount,
        created_at: body.created_at
      }
      
      let apuResource = await APUResourceService.create(object);
      apuResource.id_apu = body.id_apu;
      apuResource.id_resource = body.id_resource;

      return response.status(200).json({ ok: true, message: apuResource});
    } catch (error) {
      response.status(500).json({ error: 'Error creating apuResource' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const apuResource = await APUResourceService.update(id, body);
      if (!apuResource) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(apuResource);
    } catch (error) {
      response.status(500).json({ error: 'Error updating apuResource' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const apuResource = await APUResourceService.getById(id)

      await APUResourceService.delete(id);

      res.status(200).json(apuResource);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new APUResourceController();
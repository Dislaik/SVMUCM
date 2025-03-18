const APUResourceService = require('../service/apuResourceService'); // El servicio APU - Resource es llamado

// Controlador de la clase APU - Resource, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo APU - Resource
class APUResourceController {

  // Metodo que obtiene todos los datos de APU - Resource
  async getAll(request, response) {
    try {
      const p1 = await APUResourceService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una APU - Resource por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await APUResourceService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una APU - Resource por su ID de APU
  async getByAPUId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await APUResourceService.getByAPUId(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una APU - Resource por su ID de Resource
	async getByResourceId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await APUResourceService.getByResourceId(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea una APU - Resource a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_apu: body.id_apu.id,
        id_resource: body.id_resource.id,
        created_at: body.created_at
      }
      
      let p1 = await APUResourceService.create(object);
      p1.id_apu = body.id_apu;
      p1.id_resource = body.id_resource;

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que actualiza una APU - Resource a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const p1 = await APUResourceService.update(id, body);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que elimina una APU - Resource por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await APUResourceService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await APUResourceService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new APUResourceController();
const ResourceService = require('../service/resourceService'); // El servicio Resource es llamado

// Controlador de la clase Resource, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo Resource
class ResourceController {

  // Metodo que obtiene todos los datos de Region
  async getAll(request, response) {
    try {
      const p1 = await ResourceService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Resource por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ResourceService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Resource por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await ResourceService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Resource por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await ResourceService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea una Resource a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      let error = {};

      if (await ResourceService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado' 
      }

      if (Object.keys(error).length === 0) { 
        const object = {
          name: body.name,
          label: body.label,
          description: body.description,
          price: body.price,
          created_at: body.created_at
        }

        let p1 = await ResourceService.create(object);


        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que actualiza una Resource a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const aux = await ResourceService.getByName(body.name);
      let error = {};

      if (aux && body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este Identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          name: body.name,
          label: body.label,
          description: body.description,
          price: body.price,
          created_at: body.created_atd
        }

        const p1 = await ResourceService.update(id, object);

        if (!p1) {
          return response.status(404).json({ ok: true, message: null});
        }

        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que elimina una Resource por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ResourceService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await ResourceService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new ResourceController();
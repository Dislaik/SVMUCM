const RegionService = require('../service/regionService'); // El servicio Region es llamado

// Controlador de la clase Region, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo Region
class RegionController {

  // Metodo que obtiene todos los datos de Region
  async getAll(request, response) {
    try {
      const p1 = await RegionService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Region por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await RegionService.getById(id) // Se obtiene la Region a traves de un servicio

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }


  // Metodo que obtiene una Region por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await RegionService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

   // Metodo que obtiene una Region por su etiqueta
   async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await RegionService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea una Region a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      let error = {};

      if (await RegionService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado' 
      }

      if (Object.keys(error).length === 0) { 
        const object = {
          name: body.name,
          label: body.label,
          created_at: body.created_at
        }

        let p1 = await RegionService.create(object);


        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que actualiza una Region a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const aux = await RegionService.getByName(body.name);
      let error = {};

      if (aux && body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este Identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          name: body.name,
          label: body.label,
          created_at: body.created_atd
        }

        const p1 = await RegionService.update(id, object);

        if (!p1) {
          return response.status(404).json({ ok: false, message: null});
        }

        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que elimina una Region por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await RegionService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await RegionService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new RegionController();
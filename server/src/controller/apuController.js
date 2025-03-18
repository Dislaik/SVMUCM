const APUService = require('../service/apuService'); // El servicio APU es llamado

// Controlador de la clase APU, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo APU
class APUController {

  // Metodo que obtiene todos los datos de APU
  async getAll(request, response) {
    try {
      const p1 = await APUService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una APU por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await APUService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una APU por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await APUService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una APU por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await APUService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea una APU a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      let error = {};

      if (await APUService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado' 
      }

      if (Object.keys(error).length === 0) { 
        const object = {
          name: body.name,
          label: body.label,
          description: body.description,
          created_at: body.created_at
        }

        let p1 = await APUService.create(object);


        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que actualiza una APU a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const aux = await APUService.getByName(body.name)
      let error = {};

      if (aux && body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este Identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          name: body.name,
          label: body.label,
          description: body.description,
          created_at: body.created_at
        }

        const p1 = await APUService.update(id, object);

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

  // Metodo que elimina una APU por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await APUService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await APUService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new APUController();
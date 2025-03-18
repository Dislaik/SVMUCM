const CityService = require('../service/cityService'); // El servicio City es llamado

// Controlador de la clase City, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo City
class CityController {

  // Metodo que obtiene todos los datos de City 
  async getAll(request, response) {
    try {
      const p1 = await CityService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una City por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await CityService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Career por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await CityService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Career por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await CityService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }


  // Metodo que obtiene las Career por la ID de Region
  async getByRegionId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await CityService.getByRegionId(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene las Career por el nombre de identificación de Region
  async getByRegionName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await CityService.getByRegionName(name);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea una City a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request;
      let error = {};
      
      if (await CityService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          name: body.name,
          label: body.label,
          id_region: body.id_region.id,
          created_at: body.created_at
        }
        let p1 = await CityService.create(object);

        p1.id_region = body.id_region;

        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que actualiza una City a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const aux = await CityService.getByName(body.name);
      let error = {};

      if (aux && body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0){
        const object = {
          name: body.name,
          label: body.label,
          id_region: body.id_region.id,
          created_at: body.created_at
        }
  
        let p1 = await CityService.update(id, object);
  
        if (!p1) {
          return response.status(404).json({ ok: true, message: null});
        }
  
        p1.id_region = body.id_region;
  
        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que elimina una City por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await CityService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await CityService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }
}

module.exports = new CityController();
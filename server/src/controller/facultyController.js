const FacultyService = require('../service/facultyService'); // El servicio Faculty es llamado

// Controlador de la clase Faculty, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo Faculty
class FacultyController {

  // Metodo que obtiene todos los datos de Faculty 
  async getAll(request, response) {
    try {
      const p1 = await FacultyService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Faculty por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await FacultyService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Faculty por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await FacultyService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Faculty por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await FacultyService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }


  // Metodo que crea una Faculty a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      let error = {};

      if (await FacultyService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) { 
        const object = {
          name: body.name,
          label: body.label,
          created_at: body.created_at
        }

        const p1 = await FacultyService.create(object);

        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

 // Metodo que actualiza una Faculty a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const aux = await FacultyService.getByName(body.name);
      let error = {};

      if (aux && body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este Identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          name: body.name,
          label: body.label,
          created_at: body.created_at
        }

        const p1 = await FacultyService.update(id, object);

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

  // Metodo que elimina una Faculty por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await FacultyService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await FacultyService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

// Modulo que permite llamar la clase Faculty desde otros archivos
module.exports = new FacultyController();
const CareerService = require('../service/careerService'); // El servicio Career es llamado

// Controlador de la clase Career, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo Career
class CareerController {

  // Metodo que obtiene todos los datos de Career 
  async getAll(request, response) {
    try {
      const p1 = await CareerService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Career por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await CareerService.getById(id);

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
      const p1 = await CareerService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una Career por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await CareerService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
 
  // Metodo que obtiene las Career por su nombre de identificación de Headquarter y Faculty
  async getByHeadquarterAndFacultyName(request, response) {
    try {
      const { headquarterName, facultyName } = request.params;
      const p1 = await CareerService.getByHeadquarterAndFacultyName(headquarterName, facultyName);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea una Career a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      let error = {};

      if (await CareerService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          name: body.name,
          label: body.label,
          id_headquarter: body.id_headquarter.id,
          id_faculty: body.id_faculty.id,
          created_at: body.created_at
        }

        let p1 = await CareerService.create(object);

        p1.id_headquarter = body.id_headquarter;
        p1.id_faculty = body.id_faculty;

        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false,  error: error });
    }
  }

  // Metodo que actualiza una Career a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const aux = await CareerService.getByName(body.name);
      let error = {};

      if (aux && body.name === aux.name && Number(id) !== aux.id) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0){
        const object = {
          name: body.name,
          label: body.label,
          id_headquarter: body.id_headquarter.id,
          id_faculty: body.id_faculty.id,
          created_at: body.created_at
        }
  
        let p1 = await CareerService.update(id, object);
  
        if (!p1) {
          return response.status(404).json({ ok: false, message: null});
        }
  
        p1.id_headquarter = body.id_headquarter;
        p1.id_faculty = body.id_faculty;
  
        return response.status(200).json({ ok: true, message: p1});
      }

      return response.status(400).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que elimina una Career por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await CareerService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await CareerService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }
}

module.exports = new CareerController();
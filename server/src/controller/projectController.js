const ProjectService = require('../service/projectService'); // El servicio Project es llamado

// Controlador de la clase Project, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo Project
class ProjectController {

  // Metodo que obtiene todos los datos de Project
  async getAll(request, response) {
    try {
      const p1 = await ProjectService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene un Project por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene un Project por el ID de User
  async getByUserId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectService.getByUserId(id);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea un Project a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request;
      const object = {
        name: body.name,
        description: body.description,
        id_user: body.id_user.id,
        start_date: body.start_date,
        end_date: body.end_date,
        id_career: body.id_career.id,
        id_city: body.id_city.id,
        id_projectStatus: body.id_projectStatus.id,
        created_at: body.created_at
      }

      const p1 = await ProjectService.create(object);
      p1.id_user = body.id_user;
      p1.id_career = body.id_career;
      p1.id_city = body.id_city;
      p1.id_projectStatus = body.id_projectStatus;

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que actualiza un Project a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const object = {
        name: body.name,
        description: body.description,
        id_user: body.id_user.id,
        start_date: body.start_date,
        end_date: body.end_date,
        id_career: body.id_career.id,
        id_city: body.id_city.id,
        id_projectStatus: body.id_projectStatus.id,
        created_at: body.created_at
      }

      let p1 = await ProjectService.update(id, object);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      p1.id_user = body.id_user;
      p1.id_career = body.id_career;
      p1.id_city = body.id_city;
      p1.id_projectStatus = body.id_projectStatus;

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }
}

module.exports = new ProjectController();
const ProjectUserService = require('../service/projectUserService'); // El servicio ProjectUser es llamado

// Controlador de la clase ProjectUser, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo ProjectUser
class ProjectUserController {

  // Metodo que obtiene todos los datos de ProjectUser
  async getAll(request, response) {
    try {
      const p1 = await ProjectUserService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene un ProjectUser por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectUserService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene todos los ProjectUser por la ID de un Project
  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectUserService.getByProjectId(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene todos los ProjectUser por la ID de un User
  async getByUserId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectUserService.getByUserId(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea un ProjectUser a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_project: body.id_project.id,
        id_user: body.id_user.id,
        id_faculty: body.id_faculty.id,
        created_at: body.created_at
      }
      
      let p1 = await ProjectUserService.create(object);
      p1.id_project = body.id_project;
      p1.id_user = body.id_user;
      p1.id_faculty = body.id_faculty;


      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que elimina un ProjectUser por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectUserService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await ProjectUserService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new ProjectUserController();
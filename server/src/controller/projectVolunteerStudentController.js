const ProjectVolunteerStudentService = require('../service/projectVolunteerStudentService'); // El servicio ProjectVolunteerStudent es llamado

// Controlador de la clase ProjectVolunteerStudent, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo ProjectVolunteerStudent
class ProjectVolunteerStudentController {

  // Metodo que obtiene todos los datos de ProjectVolunteerStudent
  async getAll(request, response) {
    try {
      const p1 = await ProjectVolunteerStudentService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene un ProjectVolunteerStudent por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectVolunteerStudentService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene todos los ProjectVolunteerStudent por la ID de un Project
  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectVolunteerStudentService.getByProjectId(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene todos los ProjectVolunteerStudent por la ID de un User
  async getByVolunteerStudentId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectVolunteerStudentService.getByVolunteerStudentId(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea un ProjectVolunteerStudent a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_project: body.id_project.id,
        id_volunteer_student: body.id_volunteer_student.id,
        created_at: body.created_at
      }
      
      let p1 = await ProjectVolunteerStudentService.create(object);
      p1.id_project = body.id_project;
      p1.id_volunteer_student = body.id_volunteer_student;

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que elimina un ProjectVolunteerStudent por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectVolunteerStudentService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await ProjectVolunteerStudentService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new ProjectVolunteerStudentController();
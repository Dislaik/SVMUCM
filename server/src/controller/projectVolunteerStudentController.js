const ProjectVolunteerStudentService = require('../service/projectVolunteerStudentService');

class ProjectVolunteerStudentController {
  async getAll(request, response) {
    try {
      const projectVolunteerStudents = await ProjectVolunteerStudentService.getAll();
      
      return response.status(200).json({ ok: true, message: projectVolunteerStudents});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const projectVolunteerStudent = await ProjectVolunteerStudentService.getById(id)

      return response.status(200).json({ ok: true, message: projectVolunteerStudent});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const projectVolunteerStudents = await ProjectVolunteerStudentService.getByProjectId(id);

      if (!projectVolunteerStudents) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: projectVolunteerStudents});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByVolunteerStudentId(request, response) {
    try {
      const { id } = request.params;
      const projectVolunteerStudents = await ProjectVolunteerStudentService.getByVolunteerStudentId(id);

      if (!projectVolunteerStudents) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: projectVolunteerStudents});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_project: body.id_project.id,
        id_volunteer_student: body.id_volunteer_student.id,
        created_at: body.created_at
      }
      
      let projectVolunteerStudent = await ProjectVolunteerStudentService.create(object);
      projectVolunteerStudent.id_project = body.id_project;
      projectVolunteerStudent.id_volunteer_student = body.id_volunteer_student;

      return response.status(200).json({ ok: true, message: projectVolunteerStudent});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const projectVolunteerStudent = await ProjectVolunteerStudentService.update(id, body);
      if (!projectVolunteerStudent) {
        return response.status(404).json({ message: 'Project Volunteer Student not found' });
      }

      return response.status(200).json({ ok: true, message: projectVolunteerStudent});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {

      const { id } = request.params;
      const p1 = await ProjectVolunteerStudentService.getById(id)

      await ProjectVolunteerStudentService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
  }
}

module.exports = new ProjectVolunteerStudentController();
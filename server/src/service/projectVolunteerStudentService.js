const ProjectVolunteerStudentRepository = require('../repository/projectVolunteerStudentRepository'); // El Repositorio ProjectVolunteerStudent es llamado

// Servicio de la clase ProjectVolunteerStudent, funciona como capa intermedia y transforma el resultado al deseado
class ProjectVolunteerStudentService {
  async getAll() { 
    const p1 = await ProjectVolunteerStudentRepository.findAll();

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_project = p3.project;
      p3.id_volunteer_student = p3.volunteer_student;
      p3.id_volunteer_student.id_user_status = p3.volunteer_student.user_status;
      p3.id_volunteer_student.id_career = p3.volunteer_student.career;

      delete p3.project;
      delete p3.volunteer_student.user_status;
      delete p3.volunteer_student.career;
      delete p3.volunteer_student;

      return p3;
    })

    return p2;
  }

  async getById(id) {
    const p1 = await ProjectVolunteerStudentRepository.findById(id);

    if (!p1) {
      return null
    }

    const p2 = p1.toJSON();

    p2.id_project = p2.project;
    p2.id_volunteer_student = p2.volunteer_student;
    p2.id_volunteer_student.id_user_status = p2.volunteer_student.user_status;
    p2.id_volunteer_student.id_career = p2.volunteer_student.career;

    delete p2.project;
    delete p2.volunteer_student.user_status;
    delete p2.volunteer_student.career;
    delete p2.volunteer_student;


    return p2;
  }

  async getByProjectId(id) {
    const p1 = await ProjectVolunteerStudentRepository.findByProjectId(id);

    if (!p1) {
      return null;
    }

		const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_project = p3.project;
      p3.id_volunteer_student = p3.volunteer_student;
      p3.id_volunteer_student.id_user_status = p3.volunteer_student.user_status;
      p3.id_volunteer_student.id_career = p3.volunteer_student.career;

      delete p3.project;
      delete p3.volunteer_student.user_status;
      delete p3.volunteer_student.career;
      delete p3.volunteer_student;

      return p3;
    })

    return p2;
  }

  async getByVolunteerStudentId(id) {
    const p1 = await ProjectVolunteerStudentRepository.findByVolunteerStudentId(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_project = p3.project;
      p3.id_volunteer_student = p3.volunteer_student;
      p3.id_volunteer_student.id_user_status = p3.volunteer_student.user_status;
      p3.id_volunteer_student.id_career = p3.volunteer_student.career;

      delete p3.project;
      delete p3.volunteer_student.user_status;
      delete p3.volunteer_student.career;
      delete p3.volunteer_student;

      return p3;
    })

    return p2;
  }

  async create(data) {
    return await ProjectVolunteerStudentRepository.create(data);
  }

  async update(id, data) {
    return await ProjectVolunteerStudentRepository.update(id, data);
  }

  async delete(id) {
    return await ProjectVolunteerStudentRepository.delete(id);
  }
}

module.exports = new ProjectVolunteerStudentService();
const ProjectVolunteerStudentRepository = require('../repository/projectVolunteerStudentRepository');

class ProjectVolunteerStudentService {
  async getAll() { 
    const p1 = await ProjectVolunteerStudentRepository.findAll();

    const p2 = p1.map(item => {
      const object = item.toJSON();

      object.id_project = object.project;
      object.id_volunteer_student = object.volunteer_student;

      delete object.project;
      delete object.volunteer_student;

      return object;
    })

    return p2;
  }

  async getById(id) {
    const p1 = await ProjectVolunteerStudentRepository.findById(id);

    if (!p1) {
      return null
    }

    const object = p1.toJSON();

    object.id_project = object.project;
    object.id_volunteer_student = object.volunteer_student;

    delete object.project;
    delete object.volunteer_student;


    return object;
  }

  async getByProjectId(id) {
    const p1 = await ProjectVolunteerStudentRepository.findByProjectId(id);

    if (!p1) {
      return null;
    }

		const p2 = p1.map(item => {
      const object = item.toJSON();

      object.id_project = object.project;
      object.id_volunteer_student = object.volunteer_student;

      delete object.project;
      delete object.volunteer_student;

      return object;
    })

    return p2;
  }

  async getByVolunteerStudentId(id) {
    const p1 = await ProjectVolunteerStudentRepository.findByVolunteerStudentId(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.map(item => {
      const object = item.toJSON();

      object.id_project = object.project;
      object.id_volunteer_student = object.volunteer_student;

      delete object.project;
      delete object.volunteer_student;

      return object;
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
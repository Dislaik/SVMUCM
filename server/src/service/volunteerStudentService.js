const VolunteerStudentRepository = require('../repository/volunteerStudentRepository');

class VolunteerStudentService {
  async getAll() {
    const volunteerStudent = await VolunteerStudentRepository.findAll();

    const restructuredVolunteerStudent = volunteerStudent.map(volunteerStudent => {
      const volunteerStudentJSON = volunteerStudent.toJSON();

      volunteerStudentJSON.id_user_status = volunteerStudentJSON.user_status;

      delete volunteerStudentJSON.user_status;

      return volunteerStudentJSON;
    });

    return restructuredVolunteerStudent;
  }

  async getById(id) {
    const volunteerStudent = await VolunteerStudentRepository.findById(id);

    if (volunteerStudent) {
      const restructuredVolunteerStudent = volunteerStudent.toJSON();

      restructuredVolunteerStudent.id_user_status = restructuredVolunteerStudent.user_status;

      delete restructuredVolunteerStudent.user_status;

      return restructuredVolunteerStudent;
    }

    throw new Error('User not found');
  }

  async getByRun(run) {
    const volunteerStudent = await VolunteerStudentRepository.findByRun(run);

    if (volunteerStudent) {
      const restructuredVolunteerStudent = volunteerStudent.toJSON();

      restructuredVolunteerStudent.id_user_status = restructuredVolunteerStudent.user_status;

      delete restructuredVolunteerStudent.user_status;

      return restructuredVolunteerStudent;
    }

    throw new Error('User not found');
  }

  async create(data) {
    return await VolunteerStudentRepository.create(data);
  }

  async update(id, data) {
    return await VolunteerStudentRepository.update(id, data);
  }

  async delete(id) {
    return await VolunteerStudentRepository.delete(id);
  }

  async existsByRun(run) {
    return await VolunteerStudentRepository.existsByRun(run);
  }

  async existsByEmail(email) {
    return await VolunteerStudentRepository.existsByEmail(email);
  }
}

module.exports = new VolunteerStudentService();
const VolunteerStudentRepository = require('../repository/volunteerStudentRepository'); // El Repositorio VolunteerStudent es llamado

// Servicio de la clase VolunteerStudent, funciona como capa intermedia y transforma el resultado al deseado
class VolunteerStudentService {
  async getAll() {
    const p1 = await VolunteerStudentRepository.findAll();

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_career = p3.career;
      p3.id_career.id_headquarter = p3.career.headquarter;
      p3.id_career.id_faculty = p3.career.faculty;
      p3.id_user_status = p3.user_status;

      delete p3.user_status;
      delete p3.career.headquarter;
      delete p3.career.faculty;
      delete p3.career;

      return p3;
    });

    return p2;
  }

  async getById(id) {
    const p1 = await VolunteerStudentRepository.findById(id);

    if (!p1) {
      return null
    }

    const p2 = p1.toJSON();

    p2.id_career = p2.career;
    p2.id_career.id_headquarter = p2.career.headquarter;
    p2.id_career.id_faculty = p2.career.faculty;
    p2.id_user_status = p2.user_status;

    delete p2.user_status;
    delete p2.career.headquarter;
    delete p2.career.faculty;
    delete p2.career;

    return p2;
  }

  async getByRun(run) {
    const p1 = await VolunteerStudentRepository.findByRun(run);

    if (!p1) {
      return null
    }

    const p2 = p1.toJSON();

    p2.id_career = p2.career;
    p2.id_career.id_headquarter = p2.career.headquarter;
    p2.id_career.id_faculty = p2.career.faculty;
    p2.id_user_status = p2.user_status;

    delete p2.user_status;
    delete p2.career.headquarter;
    delete p2.career.faculty;
    delete p2.career;

    return p2;
  }

  async getByEmail(email) {
    const p1 = await VolunteerStudentRepository.findByEmail(email);

    if (!p1) {
      return null
    }

    const p2 = p1.toJSON();

    p2.id_career = p2.career;
    p2.id_career.id_headquarter = p2.career.headquarter;
    p2.id_career.id_faculty = p2.career.faculty;
    p2.id_user_status = p2.user_status;

    delete p2.user_status;
    delete p2.career.headquarter;
    delete p2.career.faculty;
    delete p2.career;

    return p2;
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
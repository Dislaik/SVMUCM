const Career = require('../model/career'); // Modelo Career es llamado
const Faculty = require('../model/faculty'); // Modelo Faculty es llamado
const Headquarter = require('../model/headquarter'); // Modelo Headquarter es llamado
const UserStatus = require('../model/userStatus'); // Modelo UserStatus es llamado
const VolunteerStudent = require('../model/volunteerStudent'); // Modelo VolunteerStudent es llamado

// Repositorio de la clase VolunteerStudent, se encarga de realizar las consultas a la base de datos
class VolunteerStudentRepository {
  async findAll() {
    return await VolunteerStudent.findAll({ include: [ UserStatus, { model: Career, include: [ Headquarter, Faculty ] } ] });
  }

  async findById(id) {
    return await VolunteerStudent.findByPk(id, { include: [ UserStatus, { model: Career, include: [ Headquarter, Faculty ] }] });
  }

  async findByRun(run) {
    return await VolunteerStudent.findOne({ where: { run: run }, include: [ UserStatus, { model: Career, include: [ Headquarter, Faculty ] }] });
  }

  async findByEmail(email) {
    return await VolunteerStudent.findOne({ where: { email: email }, include: [ UserStatus, { model: Career, include: [ Headquarter, Faculty ] }] });
  }

  async create(data) {
    return await VolunteerStudent.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }

  async existsByRun(run) {
    const p1 = await this.findByRun(run);

    if (!p1) {
      return false;
    }

    return true;
  }

  async existsByEmail(email) {
    const p1 = await this.findByEmail(email);

    if (!p1) {
      return false;
    }

    return true;
  }
}

module.exports = new VolunteerStudentRepository();
const Project = require('../model/project'); // Modelo Project es llamado
const VolunteerStudent = require('../model/volunteerStudent'); // Modelo VolunteerStudent es llamado
const ProjectVolunteerStudent = require('../model/projectVolunteerStudent'); // Modelo ProjectVolunteerStudent es llamado
const UserStatus = require('../model/userStatus'); // Modelo UserStatus es llamado
const Career = require('../model/career'); // Modelo Career es llamado

// Repositorio de la clase ProjectVolunteerStudent, se encarga de realizar las consultas a la base de datos
class ProjectVolunteerStudentRepository {
  async findAll() {
    return await ProjectVolunteerStudent.findAll();
  }

  async findById(id) {
    return await ProjectVolunteerStudent.findByPk(id, { include: [Project, { model: VolunteerStudent, include: [ UserStatus, Career ] }]});
  }

  async findByProjectId(id) {
    return await ProjectVolunteerStudent.findAll({ where: { id_project: id}, include: [Project, { model: VolunteerStudent, include: [ UserStatus, Career ] }]})
  }

  async findByVolunteerStudentId(id) {
    return await ProjectVolunteerStudent.findAll({ where: { id_volunteer_student: id }, include: [Project, { model: VolunteerStudent, include: [ UserStatus, Career ] }]});
  }

  async create(data) {
    return await ProjectVolunteerStudent.create(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }
}

module.exports = new ProjectVolunteerStudentRepository();
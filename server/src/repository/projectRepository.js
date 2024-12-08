const Project = require('../model/project'); // Modelo Project es llamado
const User = require('../model/user'); // Modelo User es llamado
const Career = require('../model/career'); // Modelo Career es llamado
const City = require('../model/city'); // Modelo City es llamado
const Faculty = require('../model/faculty'); // Modelo Faculty es llamado
const Headquarter = require('../model/headquarter'); // Modelo Headquarter es llamado
const ProjectStatus = require('../model/projectStatus'); // Modelo ProjectStatus es llamado
const Region = require('../model/region'); // Modelo Region es llamado

// Repositorio de la clase Project, se encarga de realizar las consultas a la base de datos
class ProjectRepository {
  async findAll() {
    return await Project.findAll({ include: [User, { model: Career, include: [ Headquarter, Faculty ] }, { model: City, include: [ Region ] }, ProjectStatus] });
  }

  async findById(id) {
    return await Project.findByPk(id, { include: [User, { model: Career, include: [ Headquarter, Faculty ] }, { model: City, include: [ Region ] }, ProjectStatus] });
  }

  async findByUserId(id) {
    return await Project.findAll({ where: { id_user: id }, include: [User, { model: Career, include: [ Headquarter, Faculty ] }, { model: City, include: [ Region ] }, ProjectStatus] });
  }

  async create(data) {
    return await Project.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }
}

module.exports = new ProjectRepository();
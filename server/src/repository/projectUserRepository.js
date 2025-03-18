const ProjectUser = require('../model/projectUser'); // Modelo ProjectUser es llamado
const Faculty = require('../model/faculty'); // Modelo Faculty es llamado
const Project = require('../model/project'); // Modelo Project es llamado
const Role = require('../model/role'); // Modelo Role es llamado
const User = require('../model/user'); // Modelo User es llamado

// Repositorio de la clase ProjectUser, se encarga de realizar las consultas a la base de datos
class ProjectUserRepository {
  async findAll() {
    return await ProjectUser.findAll();
  }

  async findById(id) {
    return await ProjectUser.findByPk(id, { include: [Project, {model: User, include: [Role]}, Faculty]});
  }

  async findByProjectId(id) {
    return await ProjectUser.findAll({where: { id_project: id}, include: [Project, {model: User, include: [Role]}, Faculty]})
  }

  async findByUserId(id) {
    return await ProjectUser.findAll({where: { id_user: id }, include: [Project, {model: User, include: [Role]}, Faculty]});
  }

  async create(data) {
    return await ProjectUser.create(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }
}

module.exports = new ProjectUserRepository();
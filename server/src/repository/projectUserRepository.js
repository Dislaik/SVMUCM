const Project = require('../model/project');
const ProjectUser = require('../model/projectUser');
const Role = require('../model/role');
const User = require('../model/user');

class ProjectUserRepository {
  async findAll() {
    return await ProjectUser.findAll();
  }

  async findById(id) {
    return await ProjectUser.findByPk(id, { include: [Project, User]});
  }

  async findByProjectId(id) {
    return await ProjectUser.findAll({ where: { id_project: id}, include: [Project, {model: User, include: [Role]}]})
  }

  async findByUserId(id) {
    return await ProjectUser.findAll({ where: { id_user: id }, include: [Project, User]});
  }

  async create(data) {
    return await ProjectUser.create(data);
  }

  async update(id, data) {
    const projectUser = await this.findById(id);

    if (!projectUser) {
      throw new Error('Project User not found');
    }
    
    return await projectUser.update(data);
  }

  async delete(id) {
    const projectUser = await this.findById(id);

    if (!projectUser) {
      throw new Error('Project User not found');
    }

    return await projectUser.destroy();
  }
}

module.exports = new ProjectUserRepository();
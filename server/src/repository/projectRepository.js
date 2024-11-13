const Career = require('../model/career');
const City = require('../model/city');
const Project = require('../model/project');
const ProjectStatus = require('../model/projectStatus');
const User = require('../model/user');

class ProjectRepository {
  async findAll() {
    return await Project.findAll({ include: [User, Career, City, ProjectStatus] });
  }

  async findById(id) {
    return await Project.findByPk(id, { include: [User, Career, City, ProjectStatus] });
  }

  async findByUserId(id) {
    return await Project.findAll({ where: { id_user: id }, include: [User, Career, City, ProjectStatus] });
  }

  async create(data) {
    return await Project.create(data);
  }

  async update(id, data) {
    const project = await this.findById(id);

    if (!project) {
      throw new Error('Project not found');
    }
    
    return await project.update(data);
  }

  async delete(id) {
    const project = await this.findById(id);

    if (!project) {
      throw new Error('Project not found');
    }

    return await project.destroy();
  }
}

module.exports = new ProjectRepository();
const Project = require('../model/project');
const projectStatus = require('../model/projectStatus');
const User = require('../model/user');

class ProjectRepository {
  async findAll() {
    return await Project.findAll({ include: [User, projectStatus] });
  }

  async findById(id) {
    return await Project.findByPk(id);
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
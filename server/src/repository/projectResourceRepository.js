const ProjectResource = require('../model/projectResource');

class ProjectResourceRepository {
  async findAll() {
    return await ProjectResource.findAll();
  }

  async findById(id) {
    return await ProjectResource.findByPk(id);
  }
  
  async create(data) {
    return await ProjectResource.create(data);
  }

  async update(id, data) {
    const projectResource = await this.findById(id);

    if (!projectResource) {
      throw new Error('ProjectResource not found');
    }
    
    return await projectResource.update(data);
  }

  async delete(id) {
    const projectResource = await this.findById(id);

    if (!projectResource) {
      throw new Error('ProjectResource not found');
    }

    return await projectResource.destroy();
  }
}

module.exports = new ProjectResourceRepository();
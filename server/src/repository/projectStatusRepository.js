const ProjectStatus = require('../model/projectStatus');

class ProjectStatusRepository {
  async findAll() {
    return await ProjectStatus.findAll();
  }

  async findById(id) {
    return await ProjectStatus.findByPk(id);
  }

  async findByName(name) {
    return await ProjectStatus.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await ProjectStatus.findOne({ where: { label: label } });
  }

  async create(data) {
    return await ProjectStatus.create(data);
  }

  async update(id, data) {
    const projectStatus = await this.findById(id);

    if (!projectStatus) {
      throw new Error('ProjectStatus not found');
    }
    
    return await projectStatus.update(data);
  }

  async delete(id) {
    const projectStatus = await this.findById(id);

    if (!projectStatus) {
      throw new Error('ProjectStatus not found');
    }

    return await projectStatus.destroy();
  }
}

module.exports = new ProjectStatusRepository();
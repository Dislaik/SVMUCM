const ProjectStatusRepository = require('../repository/projectStatusRepository');

class ProjectStatusService {
  async getAll() {
    return await ProjectStatusRepository.findAll();
  }

  async getById(id) {
    const projectStatus = await ProjectStatusRepository.findById(id);

    if (!projectStatus) {
      throw new Error('ProjectStatus not found');
    }

    return projectStatus;
  }

  async getByName(name) {
    const projectStatus = await ProjectStatusRepository.findByName(name);
    
    if (!projectStatus) {
      throw new Error('ProjectStatus not found');
    }

    return projectStatus;
  }

  async getByLabel(label) {
    const projectStatus = await ProjectStatusRepository.findByLabel(label);
    
    if (!projectStatus) {
      throw new Error('ProjectStatus not found');
    }

    return projectStatus;
  }

  async create(data) {
    return await ProjectStatusRepository.create(data);
  }

  async update(id, data) {
    return await ProjectStatusRepository.update(id, data);
  }

  async delete(id) {
    return await ProjectStatusRepository.delete(id);
  }
}

module.exports = new ProjectStatusService();
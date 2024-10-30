const ProjectResourceRepository = require('../repository/projectResourceRepository');

class ProjectResourceService {
  async getAll() {
    return await ProjectResourceRepository.findAll();
  }

  async getById(id) {
    const projectResource = await ProjectResourceRepository.findById(id);

    if (!projectResource) {
      throw new Error('ProjectStatus not found');
    }

    return projectResource;
  }

  async create(data) {
    return await ProjectResourceRepository.create(data);
  }

  async update(id, data) {
    return await ProjectResourceRepository.update(id, data);
  }

  async delete(id) {
    return await ProjectResourceRepository.delete(id);
  }
}

module.exports = new ProjectResourceService();
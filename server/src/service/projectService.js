const ProjectRepository = require('../repository/projectRepository');

class ProjectService {
  async getAll() {
    const projects = await ProjectRepository.findAll()

    const restructuredProject = projects.map(project => {
      const projectJSON = project.toJSON();

      projectJSON.id_user = projectJSON.user;
      projectJSON.id_projectStatus = projectJSON.project_status;

      delete projectJSON.user;
      delete projectJSON.project_status;

      return projectJSON;
    });

    return restructuredProject;
  }

  async getById(id) {
    const project = await ProjectRepository.findById(id);

    if (!project) {
      throw new Error('Project not found');
    }

    return project;
  }

  async create(data) {
    return await ProjectRepository.create(data);
  }

  async update(id, data) {
    return await ProjectRepository.update(id, data);
  }

  async delete(id) {
    return await ProjectRepository.delete(id);
  }
}

module.exports = new ProjectService();
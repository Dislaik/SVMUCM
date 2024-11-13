const ProjectRepository = require('../repository/projectRepository');

class ProjectService {
  async getAll() {
    const projects = await ProjectRepository.findAll()

    const restructuredProject = projects.map(project => {
      const restructuredProject = project.toJSON();

      restructuredProject.id_user = restructuredProject.user;
      restructuredProject.id_career = restructuredProject.career;
      restructuredProject.id_city = restructuredProject.city;
      restructuredProject.id_projectStatus = restructuredProject.project_status;

      delete restructuredProject.user;
      delete restructuredProject.career;
      delete restructuredProject.city;
      delete restructuredProject.project_status;

      return restructuredProject;
    });

    return restructuredProject;
  }

  async getById(id) {
    const project = await ProjectRepository.findById(id);

    if (project) {
      const restructuredProject = project.toJSON();

      restructuredProject.id_user = restructuredProject.user;
      restructuredProject.id_career = restructuredProject.career;
      restructuredProject.id_city = restructuredProject.city;
      restructuredProject.id_projectStatus = restructuredProject.project_status;

      delete restructuredProject.user;
      delete restructuredProject.career;
      delete restructuredProject.city;
      delete restructuredProject.project_status;

      return restructuredProject;
    }

    throw new Error('Project not found');
  }

  async getByUserId(id) {
    const projects = await ProjectRepository.findByUserId(id);
    console.log(projects)

    const restructuredProject = projects.map(project => {
      const restructuredProject = project.toJSON();

      restructuredProject.id_user = restructuredProject.user;
      restructuredProject.id_career = restructuredProject.career;
      restructuredProject.id_city = restructuredProject.city;
      restructuredProject.id_projectStatus = restructuredProject.project_status;

      delete restructuredProject.user;
      delete restructuredProject.career;
      delete restructuredProject.city;
      delete restructuredProject.project_status;

      return restructuredProject;
    });

    return restructuredProject;
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
const ProjectUserRepository = require('../repository/projectUserRepository');

class ProjectUserService {
  async getAll() {
    const projectUser = await ProjectUserRepository.findAll();

    const restructuredProjectUser = projectUser.map(projectUser => {
      const projectUserJSON = projectUser.toJSON();

      projectUserJSON.id_project = projectUserJSON.project;
      projectUserJSON.id_user = projectUserJSON.user;
      projectUserJSON.id_user.id_role = projectUserJSON.user.role;

      delete projectUserJSON.user.role;
      delete projectUserJSON.user;
      delete projectUserJSON.project;

      return projectUserJSON;
    })

    return restructuredProjectUser;
  }

  async getById(id) {
    const projectUser = await ProjectUserRepository.findById(id);

    if (!projectUser) {
      throw new Error('projectUser not found');
    }

    return projectUser;
  }

  async getByUserId(id) {
    const projectUser = await ProjectUserRepository.findByUserId(id);

    if (!projectUser) {
      throw new Error('projectUser not found');
    }

    const restructuredProjectUser = projectUser.map(projectUser => {
        const projectUserJSON = projectUser.toJSON();
  
        projectUserJSON.id_project = projectUserJSON.project;
        projectUserJSON.id_user = projectUserJSON.user;
        projectUserJSON.id_user.id_role = projectUserJSON.user.role;

        delete projectUserJSON.user.role;
        delete projectUserJSON.user;
        delete projectUserJSON.project;
  
        return projectUserJSON;
      })

    return restructuredProjectUser;
  }

	async getByProjectId(id) {
    const projectUser = await ProjectUserRepository.findByProjectId(id);

    if (!projectUser) {
      throw new Error('projectUser not found');
    }

		const restructuredProjectUser = projectUser.map(projectUser => {
      const projectUserJSON = projectUser.toJSON();

      projectUserJSON.id_project = projectUserJSON.project;
      projectUserJSON.id_user = projectUserJSON.user;
      projectUserJSON.id_user.id_role = projectUserJSON.user.role;

      delete projectUserJSON.user.role;
      delete projectUserJSON.user;
      delete projectUserJSON.project;

      return projectUserJSON;
    })

    return restructuredProjectUser;
  }

  async create(data) {
    return await ProjectUserRepository.create(data);
  }

  async update(id, data) {
    return await ProjectUserRepository.update(id, data);
  }

  async delete(id) {
    return await ProjectUserRepository.delete(id);
  }
}

module.exports = new ProjectUserService();
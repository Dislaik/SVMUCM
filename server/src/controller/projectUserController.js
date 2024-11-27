const ProjectUserService = require('../service/projectUserService');

class ProjectUserController {
  async getAll(request, response) {
    try {
      const projectUsers = await ProjectUserService.getAll();
      
      return response.status(200).json({ ok: true, message: projectUsers});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const projectUser = await ProjectUserService.getById(id)

      return response.status(200).json({ ok: true, message: projectUser});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const projectUsers = await ProjectUserService.getByProjectId(id);

      if (!projectUsers) {
        response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: projectUsers});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByUserId(request, response) {
    try {
      const { id } = request.params;
      const projectUsers = await ProjectUserService.getByUserId(id);

      if (!projectUsers) {
        response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: projectUsers});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_project: body.id_project.id,
        id_user: body.id_user.id,
        created_at: body.created_at
      }
      
      let projectUser = await ProjectUserService.create(object);
      projectUser.id_project = body.id_project;
      projectUser.id_user = body.id_user;

      return response.status(200).json({ ok: true, message: projectUser});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const projectUser = await ProjectUserService.update(id, body);
      if (!projectUser) {
        return response.status(404).json({ message: 'Project_User not found' });
      }

      return response.status(200).json({ ok: true, message: projectUser});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const projectUser = await ProjectUserService.getById(id)

      await ProjectUserService.delete(id);

      return response.status(200).json({ ok: true, message: projectUser});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new ProjectUserController();
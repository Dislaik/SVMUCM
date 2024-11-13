const ProjectService = require('../service/projectService');
const utils = require('../utils/utils');

class ProjectController {
  async getAll(request, response) {
    try {
      const projects = await ProjectService.getAll();
      
      response.status(200).json({ ok: true, message: projects});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const project = await ProjectService.getById(id)

      if (!project) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: project});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByUserId(request, response) {
    try {
      const { id } = request.params;
      const projects = await ProjectService.getByUserId(id);
      
      
      response.status(200).json({ ok: true, message: projects});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request;
      const projectObject = {
        name: body.name,
        description: body.description,
        id_user: body.id_user.id,
        start_date: body.start_date,
        end_date: body.end_date,
        id_career: body.id_career.id,
        id_city: body.id_city.id,
        id_projectStatus: body.id_projectStatus.id,
        created_at: utils.getCurrentUTCTimeZone()
      }

      console.log(projectObject)

      const project = await ProjectService.create(projectObject);

      response.status(200).json({ ok: true, message: project});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const project = await ProjectService.update(id, body);
      if (!project) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(project);
    } catch (error) {
      response.status(500).json({ error: 'Error updating project' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const project = await ProjectService.getById(id)

      await ProjectService.delete(id);

      res.status(200).json(project);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProjectController();
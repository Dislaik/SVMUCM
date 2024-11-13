const ProjectAPUService = require('../service/projectApuService');

class ProjectAPUController {
  async getAll(request, response) {
    try {
      const projectAPUs = await ProjectAPUService.getAll();
			console.log(projectAPUs)
      
      response.status(200).json(projectAPUs);
    } catch (error) {
      response.status(500).json({ error: 'Error fetching projectAPUs' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const projectAPU = await ProjectAPUService.getById(id)

      response.status(200).json(projectAPU);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const projectAPUs = await ProjectAPUService.getByProjectId(id);

      if (!projectAPUs) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: projectAPUs});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByAPUId(request, response) {
    try {
      const { id } = request.params;
      const projectAPUs = await ProjectAPUService.getByAPUId(id);

      if (!projectAPUs) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: projectAPUs});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_project: body.id_project.id,
        id_apu: body.id_apu.id,
        created_at: body.created_at
      }
      
      let projectAPU = await ProjectAPUService.create(object);
      projectAPU.id_project = body.id_project;
      projectAPU.id_apu = body.id_apu;

      return response.status(200).json({ ok: true, message: projectAPU});
    } catch (error) {
      response.status(500).json({ error: 'Error creating projectAPU' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const projectAPU = await ProjectAPUService.update(id, body);
      if (!projectAPU) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(projectAPU);
    } catch (error) {
      response.status(500).json({ error: 'Error updating projectAPU' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const projectAPU = await ProjectAPUService.getById(id)

      await ProjectAPUService.delete(id);

      res.status(200).json(projectAPU);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new ProjectAPUController();
const ProjectAPURepository = require('../repository/projectApuRepository');

class ProjectAPUService {
  async getAll() {
    const projectAPU = await ProjectAPURepository.findAll();

    const restructuredProjectAPU = projectAPU.map(projectAPU => {
      const projectAPUJSON = projectAPU.toJSON();

      projectAPUJSON.id_apu = projectAPUJSON.apu;
      projectAPUJSON.id_project = projectAPUJSON.project;

      delete projectAPUJSON.apu;
      delete projectAPUJSON.project;

      return projectAPUJSON;
    })

    return restructuredProjectAPU;
  }

  async getById(id) {
    const apuResource = await ProjectAPURepository.findById(id);

    if (!apuResource) {
      throw new Error('apuResource not found');
    }

    return apuResource;
  }

  async getByAPUId(id) {
    const projectAPU = await ProjectAPURepository.findByAPUId(id);

    const restructuredProjectAPU = projectAPU.map(projectAPU => {
      const projectAPUJSON = projectAPU.toJSON();

      projectAPUJSON.id_apu = projectAPUJSON.apu;
      projectAPUJSON.id_project = projectAPUJSON.project;

      delete projectAPUJSON.apu;
      delete projectAPUJSON.project;

      return projectAPUJSON;
    })

    if (!restructuredProjectAPU) {
      throw new Error('projectAPU not found');
    }

    return restructuredProjectAPU;
  }

	async getByProjectId(id) {
    const projectAPU = await ProjectAPURepository.findByProjectId(id);
    
    const restructuredProjectAPU = projectAPU.map(projectAPU => {
      const projectAPUJSON = projectAPU.toJSON();

      projectAPUJSON.id_apu = projectAPUJSON.apu;
      projectAPUJSON.id_project = projectAPUJSON.project;

      delete projectAPUJSON.apu;
      delete projectAPUJSON.project;

      return projectAPUJSON;
    })

    if (!restructuredProjectAPU) {
      throw new Error('projectAPU not found');
    }

    return restructuredProjectAPU;
  }

  async create(data) {
    return await ProjectAPURepository.create(data);
  }

  async update(id, data) {
    return await ProjectAPURepository.update(id, data);
  }

  async delete(id) {
    return await ProjectAPURepository.delete(id);
  }
}

module.exports = new ProjectAPUService();
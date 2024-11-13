const Project = require('../model/project');
const APU = require('../model/apu');
const ProjectAPU = require('../model/projectApu');

class ProjectAPURepository {
  async findAll() {
    return await ProjectAPU.findAll();
  }

  async findById(id) {
    return await ProjectAPU.findByPk(id, { include: [Project, APU]});
  }

  async findByProjectId(id) {
    return await ProjectAPU.findAll({ where: { id_project: id}, include: [Project, APU]})
  }

  async findByAPUId(id) {
    return await ProjectAPU.findAll({ where: { id_apu: id }, include: [Project, APU]});
  }

  async create(data) {
    return await ProjectAPU.create(data);
  }

  async update(id, data) {
    const projectAPU = await this.findById(id);

    if (!projectAPU) {
      throw new Error('APU not found');
    }
    
    return await projectAPU.update(data);
  }

  async delete(id) {
    const projectAPU = await this.findById(id);

    if (!projectAPU) {
      throw new Error('ProjectAPU not found');
    }

    return await projectAPU.destroy();
  }
}

module.exports = new ProjectAPURepository();
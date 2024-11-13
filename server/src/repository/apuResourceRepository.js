const APU = require('../model/apu');
const Resource = require('../model/resource');
const APUResource = require('../model/apuResource');

class APUResourceRepository {
  async findAll() {
    return await APUResource.findAll();
  }

  async findById(id) {
    return await APUResource.findByPk(id, { include: [APU, Resource]});
  }

  async findByAPUId(id) {
    return await APUResource.findAll({ where: { id_apu: id }, include: [APU, Resource]});
  }

  async findByResourceId(id) {
    return await APUResource.findAll({ where: { id_resource: id}})
  }

  async create(data) {
    return await APUResource.create(data);
  }

  async update(id, data) {
    const apuResource = await this.findById(id);

    if (!apuResource) {
      throw new Error('APU not found');
    }
    
    return await apuResource.update(data);
  }

  async delete(id) {
    const apuResource = await this.findById(id);

    if (!apuResource) {
      throw new Error('APUResource not found');
    }

    return await apuResource.destroy();
  }
}

module.exports = new APUResourceRepository();
const APU = require('../model/apu'); // Modelo APU es llamado
const Resource = require('../model/resource');  // Modelo Resource es llamado
const APUResource = require('../model/apuResource'); // Modelo APUResource es llamado

// Repositorio de la clase APUResource, se encarga de realizar las consultas a la base de datos
class APUResourceRepository {
  async findAll() {
    return await APUResource.findAll({ include: [APU, Resource]});
  }

  async findById(id) {
    return await APUResource.findByPk(id, { include: [APU, Resource]});
  }

  async findByAPUId(id) {
    return await APUResource.findAll({ where: { id_apu: id }, include: [APU, Resource]});
  }

  async findByResourceId(id) {
    return await APUResource.findAll({ where: { id_resource: id}, include: [APU, Resource]})
  }

  async create(data) {
    return await APUResource.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }
}

module.exports = new APUResourceRepository();
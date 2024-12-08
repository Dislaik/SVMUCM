const Region = require('../model/region'); // Modelo Region es llamado

// Repositorio de la clase Region, se encarga de realizar las consultas a la base de datos
class RegionRepository {
  async findAll() {
    return await Region.findAll();
  }

  async findById(id) {
    return await Region.findByPk(id);
  }

  async findByName(name) {
    return await Region.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Region.findOne({ where: { label: label } });
  }

  async create(data) {
    return await Region.create(data);
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

  async existsByName(name) {
    const p1 = await this.findByName(name);

    if (!p1) {
      return false;
    }

    return true;
  }
}

module.exports = new RegionRepository();
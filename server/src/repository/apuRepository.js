const APU = require('../model/apu'); // Modelo APU es llamado

// Repositorio de la clase APU, se encarga de realizar las consultas a la base de datos
class APURepository {
  async findAll() {
    return await APU.findAll();
  }

  async findById(id) {
    return await APU.findByPk(id);
  }

  async findByName(name) {
    return await APU.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await APU.findOne({ where: { label: label } });
  }

  async create(data) {
    return await APU.create(data);
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

module.exports = new APURepository();
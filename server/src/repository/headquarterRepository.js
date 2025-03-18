const Headquarter = require('../model/headquarter'); // Modelo Headquarter es llamado

// Repositorio de la clase Headquarter, se encarga de realizar las consultas a la base de datos
class HeadquarterRepository {
  async findAll() {
    return await Headquarter.findAll();
  }

  async findById(id) {
    return await Headquarter.findByPk(id);
  }

  async findByName(name) {
    return await Headquarter.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Headquarter.findOne({ where: { label: label } });
  }

  async create(data) {
    return await Headquarter.create(data);
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

module.exports = new HeadquarterRepository();
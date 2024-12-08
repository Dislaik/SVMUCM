const Resource = require('../model/resource'); // Modelo Resource es llamado

// Repositorio de la clase Resource, se encarga de realizar las consultas a la base de datos
class ResourceRepository {
  async findAll() {
    return await Resource.findAll();
  }

  async findById(id) {
    return await Resource.findByPk(id);
  }

  async findByName(name) {
    return await Resource.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Resource.findOne({ where: { label: label } });
  }
  
  async create(data) {
    return await Resource.create(data);
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

module.exports = new ResourceRepository();
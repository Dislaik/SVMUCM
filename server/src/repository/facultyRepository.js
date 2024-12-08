const Faculty = require('../model/faculty'); // Modelo Faculty es llamado

// Repositorio de la clase Faculty, se encarga de realizar las consultas a la base de datos
class FacultyRepository {
  async findAll() {
    return await Faculty.findAll();
  }

  async findById(id) {
    return await Faculty.findByPk(id);
  }

  async findByName(name) {
    return await Faculty.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Faculty.findOne({ where: { label: label } });
  }

  async create(data) {
    return await Faculty.create(data);
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

module.exports = new FacultyRepository();
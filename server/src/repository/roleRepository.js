const Role = require('../model/role'); // Modelo Role es llamado

// Repositorio de la clase Role, se encarga de realizar las consultas a la base de datos
class RoleRepository {
  async findAll() {
    return await Role.findAll();
  }

  async findById(id) {
    return await Role.findByPk(id);
  }

  async findByName(name) {
    return await Role.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Role.findOne({ where: { label: label } });
  }

  async create(data) {
    return await Role.create(data);
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

module.exports = new RoleRepository();
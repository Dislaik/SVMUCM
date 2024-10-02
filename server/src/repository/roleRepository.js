const Role = require('../model/role');

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
    const role = await this.findById(id);

    if (!role) {
      throw new Error('Role not found');
    }
    
    return await role.update(data);
  }

  async delete(id) {
    const role = await this.findById(id);

    if (!role) {
      throw new Error('Role not found');
    }

    return await role.destroy();
  }
}

module.exports = new RoleRepository();
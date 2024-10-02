const roleRepository = require('../repository/roleRepository');

class RoleService {
  async getAll() {
    return await roleRepository.findAll();
  }

  async getById(id) {
    const role = await roleRepository.findById(id);

    if (!role) {
      throw new Error('Role not found');
    }

    return role;
  }

  async getByName(name) {
    const role = await roleRepository.findByName(name);
    
    if (!role) {
      throw new Error('Role not found');
    }

    return role;
  }

  async getByLabel(label) {
    const role = await roleRepository.findByLabel(label);
    
    if (!role) {
      throw new Error('Role not found');
    }

    return role;
  }

  async create(data) {
    return await roleRepository.create(data);
  }

  async update(id, data) {
    return await roleRepository.update(id, data);
  }

  async delete(id) {
    return await roleRepository.delete(id);
  }
}

module.exports = new RoleService();
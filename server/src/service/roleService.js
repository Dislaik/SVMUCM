const RoleRepository = require('../repository/roleRepository');

class RoleService {
  async getAll() {
    return await RoleRepository.findAll();
  }

  async getById(id) {
    const role = await RoleRepository.findById(id);

    if (!role) {
      throw new Error('Role not found');
    }

    return role;
  }

  async getByName(name) {
    const role = await RoleRepository.findByName(name);
    
    if (!role) {
      throw new Error('Role not found');
    }

    return role;
  }

  async getByLabel(label) {
    const role = await RoleRepository.findByLabel(label);
    
    if (!role) {
      throw new Error('Role not found');
    }

    return role;
  }

  async create(data) {
    return await RoleRepository.create(data);
  }

  async update(id, data) {
    return await RoleRepository.update(id, data);
  }

  async delete(id) {
    return await RoleRepository.delete(id);
  }
}

module.exports = new RoleService();
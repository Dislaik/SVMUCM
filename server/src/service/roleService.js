const RoleRepository = require('../repository/roleRepository'); // El Repositorio Role es llamado

// Servicio de la clase Role, funciona como capa intermedia y transforma el resultado al deseado
class RoleService {
  async getAll() {
    return await RoleRepository.findAll();
  }

  async getById(id) {
    const p1 = await RoleRepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByName(name) {
    const p1 = await RoleRepository.findByName(name);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByLabel(label) {
    const p1 = await RoleRepository.findByLabel(label);
    
    if (!p1) {
      return null;
    }

    return p1;
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
const APURepository = require('../repository/apuRepository'); // El Repositorio APU es llamado

// Servicio de la clase APU, funciona como capa intermedia y transforma el resultado al deseado
class APUService {
  async getAll() {
    return await APURepository.findAll();
  }

  async getById(id) {
    const p1 = await APURepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByName(name) {
    const p1 = await APURepository.findByName(name);
    
    if (!p1) {
      return null
    }

    return p1;
  }

  async getByLabel(label) {
    const p1 = await APURepository.findByLabel(label);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async create(data) {
    return await APURepository.create(data);
  }

  async update(id, data) {
    return await APURepository.update(id, data);
  }

  async delete(id) {
    return await APURepository.delete(id);
  }

  async existsByName(name) {
    return await APURepository.existsByName(name);
  }
}

module.exports = new APUService();
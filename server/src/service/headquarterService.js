const HeadquarterRepository = require('../repository/headquarterRepository'); // El Repositorio Headquarter es llamado

// Servicio de la clase Headquarter, funciona como capa intermedia y transforma el resultado al deseado
class HeadquarterService {
  async getAll() {
    return await HeadquarterRepository.findAll();
  }

  async getById(id) {
    const p1 = await HeadquarterRepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByName(name) {
    const p1 = await HeadquarterRepository.findByName(name);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByLabel(label) {
    const p1 = await HeadquarterRepository.findByLabel(label);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async create(data) {
    return await HeadquarterRepository.create(data);
  }

  async update(id, data) {
    return await HeadquarterRepository.update(id, data);
  }

  async delete(id) {
    return await HeadquarterRepository.delete(id);
  }

  async existsByName(name) {
    return await HeadquarterRepository.existsByName(name);
  }
}

module.exports = new HeadquarterService();
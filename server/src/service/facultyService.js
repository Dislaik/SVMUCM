const FacultyRepository = require('../repository/facultyRepository');  // El Repositorio Faculty es llamado

// Servicio de la clase Faculty, funciona como capa intermedia y transforma el resultado al deseado
class FacultyService {
  async getAll() {
    return await FacultyRepository.findAll();
  }

  async getById(id) {
    const p1 = await FacultyRepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByName(name) {
    const p1 = await FacultyRepository.findByName(name);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByLabel(label) {
    const p1 = await FacultyRepository.findByLabel(label);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async create(data) {
    return await FacultyRepository.create(data);
  }

  async update(id, data) {
    return await FacultyRepository.update(id, data);
  }

  async delete(id) {
    return await FacultyRepository.delete(id);
  }

  async existsByName(name) {
    return await FacultyRepository.existsByName(name);
  }
}

module.exports = new FacultyService();
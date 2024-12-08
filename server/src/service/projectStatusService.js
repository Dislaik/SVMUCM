const ProjectStatusRepository = require('../repository/projectStatusRepository'); // El Repositorio ProjectStatus es llamado

// Servicio de la clase ProjectStatus, funciona como capa intermedia y transforma el resultado al deseado
class ProjectStatusService {
  async getAll() {
    return await ProjectStatusRepository.findAll();
  }

  async getById(id) {
    const p1 = await ProjectStatusRepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByName(name) {
    const p1 = await ProjectStatusRepository.findByName(name);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByLabel(label) {
    const p1 = await ProjectStatusRepository.findByLabel(label);
    
    if (!p1) {
      return null;
    }

    return p1;
  }
}

module.exports = new ProjectStatusService();
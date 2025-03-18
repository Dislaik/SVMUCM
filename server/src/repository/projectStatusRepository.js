const ProjectStatus = require('../model/projectStatus'); // Modelo ProjectStatus es llamado

// Repositorio de la clase ProjectStatus, se encarga de realizar las consultas a la base de datos
class ProjectStatusRepository {
  async findAll() {
    return await ProjectStatus.findAll();
  }

  async findById(id) {
    return await ProjectStatus.findByPk(id);
  }

  async findByName(name) {
    return await ProjectStatus.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await ProjectStatus.findOne({ where: { label: label } });
  }
}

module.exports = new ProjectStatusRepository();
const UserStatus = require('../model/userStatus'); // Modelo UserStatus es llamado

// Repositorio de la clase UserStatus, se encarga de realizar las consultas a la base de datos
class UserStatusRepository {
  async findAll() {
    return await UserStatus.findAll();
  }

  async findById(id) {
    return await UserStatus.findByPk(id);
  }

  async findByName(name) {
    return await UserStatus.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await UserStatus.findOne({ where: { label: label } });
  }
}

module.exports = new UserStatusRepository();
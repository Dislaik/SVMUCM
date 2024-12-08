const User = require('../model/user'); // Modelo User es llamado
const Role = require('../model/role'); // Modelo Role es llamado
const UserStatus = require('../model/userStatus'); // Modelo UserStatus es llamado

// Repositorio de la clase User, se encarga de realizar las consultas a la base de datos
class UserRepository {
  async findAll() {
    return await User.findAll({ include: [Role, UserStatus] });
  }

  async findById(id) {
    return await User.findByPk(id, { include: [Role, UserStatus] });
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username: username }, include: [Role, UserStatus] });
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email: email }, include: [Role, UserStatus] });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }

  async existsByUsername(username) {
    const p1 = await this.findByUsername(username);

    if (!p1) {
      return false;
    }

    return true;
  }

  async existsByEmail(email) {
    const p1 = await this.findByEmail(email);

    if (!p1) {
      return false;
    }

    return true;
  }

  async countByRoleId(id) {
    return await User.count({ where: {id_role : id }})
  }
}

module.exports = new UserRepository();
const UserRepository = require('../repository/userRepository'); // El Repositorio User es llamado

// Servicio de la clase User, funciona como capa intermedia y transforma el resultado al deseado
class UserService {
  async getAll() {
    const p1 = await UserRepository.findAll();

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_role = p3.role;
      p3.id_user_status = p3.user_status;

      delete p3.role;
      delete p3.user_status;

      return p3;
    });

    return p2;
  }

  async getById(id) {
    const p1 = await UserRepository.findById(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_role = p2.role;
    p2.id_user_status = p2.user_status;

    delete p2.role;
    delete p2.user_status;

    return p2;
  }

  async getByUsername(username) {
    const p1 = await UserRepository.findByUsername(username);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_role = p2.role;
    p2.id_user_status = p2.user_status;

    delete p2.role;
    delete p2.user_status;

    return p2;
  }

  async getByEmail(email) {
    const p1 = await UserRepository.findByEmail(email);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_role = p2.role;
    p2.id_user_status = p2.user_status;

    delete p2.role;
    delete p2.user_status;

    return p2;
  }

  async create(data) {
    return await UserRepository.create(data);
  }

  async update(id, data) {
    return await UserRepository.update(id, data);
  }

  async existsByUsername(username) {
    return await UserRepository.existsByUsername(username);
  }

  async existsByEmail(email) {
    return await UserRepository.existsByEmail(email);
  }

  async getCountByRoleId(id) {
    return await UserRepository.countByRoleId(id);
  }
}

module.exports = new UserService();
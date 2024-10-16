const UserRepository = require('../repository/userRepository');

class UserService {
  async getAll() {
    const user = await UserRepository.findAll();

    const restructuredUser = user.map(user => {
      const userJSON = user.toJSON();

      userJSON.id_role = userJSON.role;

      delete userJSON.role;

      return userJSON;
    });

    return restructuredUser;
  }

  async getById(id) {
    const user = await UserRepository.findById(id);

    if (user) {
      const restructuredUser = user.toJSON();

      restructuredUser.id_role = restructuredUser.role;

      delete restructuredUser.role;

      return restructuredUser;
    }

    throw new Error('User not found');
  }

  async getByUsername(username) {
    const user = await UserRepository.findByUsername(username);

    if (user) {
      const restructuredUser = user.toJSON();

      restructuredUser.id_role = restructuredUser.role;

      delete restructuredUser.role;

      return restructuredUser;
    }

    throw new Error('User not found');
  }

  async create(data) {
    return await UserRepository.create(data);
  }

  async update(id, data) {
    return await UserRepository.update(id, data);
  }

  async delete(id) {
    return await UserRepository.delete(id);
  }

  async existsByUsername(username) {
    return await UserRepository.existsByUsername(username);
  }

  async existsByEmail(email) {
    return await UserRepository.existsByEmail(email);
  }
}

module.exports = new UserService();
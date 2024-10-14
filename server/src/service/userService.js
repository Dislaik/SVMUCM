const UserRepository = require('../repository/userRepository');

class UserService {
  async getAll() {
    return await UserRepository.findAll();
  }

  async getById(id) {
    const user = await UserRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getByUsername(username) {
    const user = await UserRepository.findByUsername(username);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
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
const userRepository = require('../repository/userRepository');

class UserService {
  async getAll() {
    return await userRepository.findAll();
  }

  async getById(id) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async getByUsername(username) {
    const user = await userRepository.findByUsername(username);
    
    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }

  async create(data) {
    return await userRepository.create(data);
  }

  async update(id, data) {
    return await userRepository.update(id, data);
  }

  async delete(id) {
    return await userRepository.delete(id);
  }

  async existsByUsername(username) {
    return await userRepository.existsByUsername(username);
  }

  async existsByEmail(email) {
    return await userRepository.existsByEmail(email);
  }
}

module.exports = new UserService();
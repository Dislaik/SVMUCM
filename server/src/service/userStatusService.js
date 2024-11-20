const UserStatusRepository = require('../repository/userStatusRepository');

class UserStatusService {
  async getAll() {
    return await UserStatusRepository.findAll();
  }

  async getById(id) {
    const userStatus = await UserStatusRepository.findById(id);

    if (!userStatus) {
      throw new Error('User Status not found');
    }

    return userStatus;
  }

  async getByName(name) {
    const userStatus = await UserStatusRepository.findByName(name);
    
    if (!userStatus) {
      throw new Error('User Status not found');
    }

    return userStatus;
  }

  async getByLabel(label) {
    const userStatus = await UserStatusRepository.findByLabel(label);
    
    if (!userStatus) {
      throw new Error('User Status not found');
    }

    return userStatus;
  }

  async create(data) {
    return await UserStatusRepository.create(data);
  }

  async update(id, data) {
    return await UserStatusRepository.update(id, data);
  }

  async delete(id) {
    return await UserStatusRepository.delete(id);
  }
}

module.exports = new UserStatusService();
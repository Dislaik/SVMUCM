const UserStatus = require('../model/userStatus');

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

  async create(data) {
    return await UserStatus.create(data);
  }

  async update(id, data) {
    const userStatus = await this.findById(id);

    if (!userStatus) {
      throw new Error('UserStatus not found');
    }
    
    return await userStatus.update(data);
  }

  async delete(id) {
    const userStatus = await this.findById(id);

    if (!userStatus) {
      throw new Error('UserStatus not found');
    }

    return await userStatus.destroy();
  }
}

module.exports = new UserStatusRepository();
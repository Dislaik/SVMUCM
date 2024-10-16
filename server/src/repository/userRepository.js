const Role = require('../model/role');
const User = require('../model/user');

class UserRepository {
  async findAll() {
    return await User.findAll({ include: [Role] });
  }

  async findById(id) {
    return await User.findByPk(id, { include: [Role] });
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username: username }, include: [Role] });
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email: email }, include: [Role] });
  }

  async create(data) {
    return await User.create(data);
  }

  async update(id, data) {
    const user = await this.findById(id);

    if (!user) {
      throw new Error('User not found');
    }
    
    return await user.update(data);
  }

  async delete(id) {
    const user = await this.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return await user.destroy();
  }

  async existsByUsername(username) {
    const user = await this.findByUsername(username);

    if (!user) {
      return false;
    }

    return true;
  }

  async existsByEmail(email) {
    const user = await this.findByEmail(email);

    if (!user) {
      return false;
    }

    return true;
  }
}

module.exports = new UserRepository();
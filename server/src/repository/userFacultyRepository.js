const UserFaculty = require('../model/userFaculty');
const User = require('../model/user');
const Faculty = require('../model/faculty');
const UserStatus = require('../model/userStatus');


class UserFacultyRepository {
  async findAll() {
    return await UserFaculty.findAll({ include: [{model: User, include: [UserStatus]}, Faculty]});
  }

  async findById(id) {
    return await UserFaculty.findByPk(id, { include: [{model: User, include: [UserStatus]}, Faculty]});
  }

  async findByUserId(id) {
    return await UserFaculty.findOne({ where: { id_user: id }, include: [{model: User, include: [UserStatus]}, Faculty]});
  }

  async findByFacultyId(id) {
    return await UserFaculty.findAll({ where: { id_faculty: id}})
  }

  async create(data) {
    return await UserFaculty.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }
}

module.exports = new UserFacultyRepository();
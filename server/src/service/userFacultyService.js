const UserFacultyRepository = require('../repository/userFacultyRepository');


class UserFacultyService {
  async getAll() {
    const p1 = await UserFacultyRepository.findAll();

    if (!p1) {
      return null;
    }

    const p3 = p1.map(object => {
      const p2 = object.toJSON();

      p2.id_user = p2.user;
      p2.id_user.id_user_status = p2.user.user_status;
      p2.id_faculty = p2.faculty;

      delete p2.user.user_status;
      delete p2.user;
      delete p2.faculty;

      return p2;
    })

    return p3;
  }

  async getById(id) {
    const p1 = await UserFacultyRepository.findById(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_user = p2.user;
    p2.id_user.id_user_status = p2.user.user_status;
    p2.id_faculty = p2.faculty;

    delete p2.user.user_status;
    delete p2.user;
    delete p2.faculty;

    return p2;
  }

  async getByUserId(id) {
    const p1 = await UserFacultyRepository.findByUserId(id);

    if (!p1) {
      return null;
    }
    console.log(p1)
    const p2 = p1.toJSON();

    p2.id_user = p2.user;
    p2.id_user.id_user_status = p2.user.user_status;
    p2.id_faculty = p2.faculty;

    delete p2.user.user_status;
    delete p2.user;
    delete p2.faculty;

    return p2;
  }

	async getByFacultyId(id) {
    const p1 = await UserFacultyRepository.findByFacultyId(id);

    if (!p1) {
      return null;
    }

    const p3 = p1.map(object => {
      const p2 = object.toJSON();

      p2.id_user = p2.user;
      p2.id_faculty = p2.faculty;

      delete p2.user;
      delete p2.faculty;

      return p2;
    })

    return p3;
  }

  async create(data) {
    return await UserFacultyRepository.create(data);
  }

  async update(id, data) {
    return await UserFacultyRepository.update(id, data);
  }

  async delete(id) {
    return await UserFacultyRepository.delete(id);
  }
}

module.exports = new UserFacultyService();
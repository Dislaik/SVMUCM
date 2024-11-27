const UserStatus = require('../model/userStatus');
const VolunteerStudent = require('../model/volunteerStudent');

class VolunteerStudentRepository {
  async findAll() {
    return await VolunteerStudent.findAll({ include: [UserStatus] });
  }

  async findById(id) {
    return await VolunteerStudent.findByPk(id, { include: [UserStatus] });
  }

  async findByRun(run) {
    return await VolunteerStudent.findOne({ where: { run: run }, include: [UserStatus] });
  }

  async findByEmail(email) {
    return await VolunteerStudent.findOne({ where: { email: email }, include: [UserStatus] });
  }

  async create(data) {
    return await VolunteerStudent.create(data);
  }

  async update(id, data) {
    const volunteerStudent = await this.findById(id);

    if (!volunteerStudent) {
      throw new Error('Volunteer student not found');
    }
    
    return await volunteerStudent.update(data);
  }

  async delete(id) {
    const volunteerStudent = await this.findById(id);

    if (!volunteerStudent) {
      throw new Error('Volunteer student not found');
    }

    return await volunteerStudent.destroy();
  }

  async existsByRun(run) {
    const volunteerStudent = await this.findByRun(run);

    if (!volunteerStudent) {
      return false;
    }

    return true;
  }

  async existsByEmail(email) {
    const volunteerStudent = await this.findByEmail(email);

    if (!volunteerStudent) {
      return false;
    }

    return true;
  }
}

module.exports = new VolunteerStudentRepository();
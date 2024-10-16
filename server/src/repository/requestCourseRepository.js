const RequestCourse = require('../model/requestCourse');

class RequestCourseRepository {
  async findAll() {
    return await RequestCourse.findAll();
  }

  async findById(id) {
    return await RequestCourse.findByPk(id);
  }

  async create(data) {
    return await RequestCourse.create(data);
  }

  async update(id, data) {
    const requestCourse = await this.findById(id);

    if (!requestCourse) {
      throw new Error('Request course not found');
    }
    
    return await requestCourse.update(data);
  }

  async delete(id) {
    const requestCourse = await this.findById(id);

    if (!requestCourse) {
      throw new Error('Request course not found');
    }

    return await requestCourse.destroy();
  }
}

module.exports = new RequestCourseRepository();
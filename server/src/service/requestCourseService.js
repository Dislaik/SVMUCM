const RequestCourseRepository = require('../repository/requestCourseRepository');

class RequestCourseService {
  async getAll() {
    return await RequestCourseRepository.findAll();
  }

  async getById(id) {
    const requestCourse = await RequestCourseRepository.findById(id);

    if (!requestCourse) {
      throw new Error('Request course not found');
    }

    return requestCourse;
  }

  async create(data) {
    return await RequestCourseRepository.create(data);
  }

  async update(id, data) {
    return await RequestCourseRepository.update(id, data);
  }

  async delete(id) {
    return await RequestCourseRepository.delete(id);
  }
}

module.exports = new RequestCourseService();
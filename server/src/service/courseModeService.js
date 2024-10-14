const CourseModeRepository = require('../repository/courseModeRepository');

class CourseModeService {
  async getAll() {
    return await CourseModeRepository.findAll();
  }

  async getById(id) {
    const courseMode = await CourseModeRepository.findById(id);

    if (!courseMode) {
      throw new Error('Course mode not found');
    }

    return courseMode;
  }

  async getByName(name) {
    const courseMode = await CourseModeRepository.findByName(name);
    
    if (!courseMode) {
      throw new Error('Course mode not found');
    }

    return courseMode;
  }

  async getByLabel(label) {
    const courseMode = await CourseModeRepository.findByLabel(label);
    
    if (!courseMode) {
      throw new Error('Course mode not found');
    }

    return courseMode;
  }

  async create(data) {
    return await CourseModeRepository.create(data);
  }

  async update(id, data) {
    return await CourseModeRepository.update(id, data);
  }

  async delete(id) {
    return await CourseModeRepository.delete(id);
  }
}

module.exports = new CourseModeService();
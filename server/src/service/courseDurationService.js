const CourseDurationRepository = require('../repository/courseDurationRepository');

class CourseDurationService {
  async getAll() {
    return await CourseDurationRepository.findAll();
  }

  async getById(id) {
    const courseDuration = await CourseDurationRepository.findById(id);

    if (!courseDuration) {
      throw new Error('Course duration not found');
    }

    return courseDuration;
  }

  async getByName(name) {
    const courseDuration = await CourseDurationRepository.findByName(name);
    
    if (!courseDuration) {
      throw new Error('Course duration not found');
    }

    return courseDuration;
  }

  async getByLabel(label) {
    const courseDuration = await CourseDurationRepository.findByLabel(label);
    
    if (!courseDuration) {
      throw new Error('Course duration not found');
    }

    return courseDuration;
  }

  async create(data) {
    return await CourseDurationRepository.create(data);
  }

  async update(id, data) {
    return await CourseDurationRepository.update(id, data);
  }

  async delete(id) {
    return await CourseDurationRepository.delete(id);
  }
}

module.exports = new CourseDurationService();
const CourseDuration = require('../model/courseDuration');

class CourseDurationRepository {
  async findAll() {
    return await CourseDuration.findAll();
  }

  async findById(id) {
    return await CourseDuration.findByPk(id);
  }

  async findByName(name) {
    return await CourseDuration.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await CourseDuration.findOne({ where: { label: label } });
  }

  async create(data) {
    return await CourseDuration.create(data);
  }

  async update(id, data) {
    const courseDuration = await this.findById(id);

    if (!courseDuration) {
      throw new Error('Course duration not found');
    }
    
    return await courseDuration.update(data);
  }

  async delete(id) {
    const courseDuration = await this.findById(id);

    if (!courseDuration) {
      throw new Error('Course duration not found');
    }

    return await courseDuration.destroy();
  }
}

module.exports = new CourseDurationRepository();
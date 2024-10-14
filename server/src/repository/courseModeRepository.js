const CourseMode = require('../model/courseMode');

class CourseModeRepository {
  async findAll() {
    return await CourseMode.findAll();
  }

  async findById(id) {
    return await CourseMode.findByPk(id);
  }

  async findByName(name) {
    return await CourseMode.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await CourseMode.findOne({ where: { label: label } });
  }

  async create(data) {
    return await CourseMode.create(data);
  }

  async update(id, data) {
    const courseMode = await this.findById(id);

    if (!courseMode) {
      throw new Error('Course mode not found');
    }
    
    return await courseMode.update(data);
  }

  async delete(id) {
    const courseMode = await this.findById(id);

    if (!courseMode) {
      throw new Error('Course mode not found');
    }

    return await courseMode.destroy();
  }
}

module.exports = new CourseModeRepository();
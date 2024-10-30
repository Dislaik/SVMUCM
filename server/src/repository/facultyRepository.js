const Faculty = require('../model/faculty');

class FacultyRepository {
  async findAll() {
    return await Faculty.findAll();
  }

  async findById(id) {
    return await Faculty.findByPk(id);
  }

  async findByName(name) {
    return await Faculty.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Faculty.findOne({ where: { label: label } });
  }

  async create(data) {
    return await Faculty.create(data);
  }

  async update(id, data) {
    const faculty = await this.findById(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }
    
    return await faculty.update(data);
  }

  async delete(id) {
    const faculty = await this.findById(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    return await faculty.destroy();
  }
}

module.exports = new FacultyRepository();
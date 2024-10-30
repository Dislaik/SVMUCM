const Career = require('../model/career');
const Faculty = require('../model/faculty');
const Headquarter = require('../model/headquarter');

class CareerRepository {
  async findAll() {
    return await Career.findAll();
  }

  async findById(id) {
    return await Career.findByPk(id);
  }

  async findByName(name) {
    return await Career.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Career.findOne({ where: { label: label } });
  }

  async findByHeadquarterAndFacultyName(headquarterName, facultyName) {
    const headquarter = await Headquarter.findOne({ where: {name: headquarterName} });
    const faculty = await Faculty.findOne({ where: {name: facultyName} });

    return await Career.findAll({ where: { id_headquarter:  headquarter.id, id_faculty: faculty.id} })
  }

  async create(data) {
    return await Career.create(data);
  }

  async update(id, data) {
    const career = await this.findById(id);

    if (!career) {
      throw new Error('Career not found');
    }
    
    return await career.update(data);
  }

  async delete(id) {
    const career = await this.findById(id);

    if (!career) {
      throw new Error('Career not found');
    }

    return await career.destroy();
  }
}

module.exports = new CareerRepository();
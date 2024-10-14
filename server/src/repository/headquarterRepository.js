const Headquarter = require('../model/headquarter');

class HeadquarterRepository {
  async findAll() {
    return await Headquarter.findAll();
  }

  async findById(id) {
    return await Headquarter.findByPk(id);
  }

  async findByName(name) {
    return await Headquarter.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Headquarter.findOne({ where: { label: label } });
  }

  async create(data) {
    return await Headquarter.create(data);
  }

  async update(id, data) {
    const headquarter = await this.findById(id);

    if (!headquarter) {
      throw new Error('Headquarter not found');
    }
    
    return await headquarter.update(data);
  }

  async delete(id) {
    const headquarter = await this.findById(id);

    if (!headquarter) {
      throw new Error('Headquarter not found');
    }

    return await headquarter.destroy();
  }
}

module.exports = new HeadquarterRepository();
const Region = require('../model/region');

class RegionRepository {
  async findAll() {
    return await Region.findAll();
  }

  async findById(id) {
    return await Region.findByPk(id);
  }

  async findByName(name) {
    return await Region.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Region.findOne({ where: { label: label } });
  }

  async create(data) {
    return await Region.create(data);
  }

  async update(id, data) {
    const region = await this.findById(id);

    if (!region) {
      throw new Error('Region not found');
    }
    
    return await region.update(data);
  }

  async delete(id) {
    const region = await this.findById(id);

    if (!region) {
      throw new Error('Region not found');
    }

    return await region.destroy();
  }
}

module.exports = new RegionRepository();
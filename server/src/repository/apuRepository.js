const APU = require('../model/apu');

class APURepository {
  async findAll() {
    return await APU.findAll();
  }

  async findById(id) {
    return await APU.findByPk(id);
  }

  async findByName(name) {
    return await APU.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await APU.findOne({ where: { label: label } });
  }

  async create(data) {
    return await APU.create(data);
  }

  async update(id, data) {
    const apu = await this.findById(id);

    if (!apu) {
      throw new Error('APU not found');
    }
    
    return await apu.update(data);
  }

  async delete(id) {
    const apu = await this.findById(id);

    if (!apu) {
      throw new Error('APU not found');
    }

    return await apu.destroy();
  }

  async existsByName(name) {
    const apu = await this.findByName(name);

    if (!apu) {
      return false;
    }

    return true;
  }
}

module.exports = new APURepository();
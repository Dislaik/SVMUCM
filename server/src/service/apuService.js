const APURepository = require('../repository/apuRepository');

class APUService {
  async getAll() {
    return await APURepository.findAll();
  }

  async getById(id) {
    const apu = await APURepository.findById(id);

    if (!apu) {
      throw new Error('APU not found');
    }

    return apu;
  }

  async getByName(name) {
    const apu = await APURepository.findByName(name);
    
    if (!apu) {
      throw new Error('APU not found');
    }

    return apu;
  }

  async getByLabel(label) {
    const apu = await APURepository.findByLabel(label);
    
    if (!apu) {
      throw new Error('APU not found');
    }

    return apu;
  }

  async create(data) {
    return await APURepository.create(data);
  }

  async update(id, data) {
    return await APURepository.update(id, data);
  }

  async delete(id) {
    return await APURepository.delete(id);
  }

  async existsByName(name) {
    return await APURepository.existsByName(name);
  }
}

module.exports = new APUService();
const RegionRepository = require('../repository/regionRepository');

class RegionService {
  async getAll() {
    return await RegionRepository.findAll();
  }

  async getById(id) {
    const region = await RegionRepository.findById(id);

    if (!region) {
      throw new Error('Role not found');
    }

    return region;
  }

  async getByName(name) {
    const region = await RegionRepository.findByName(name);
    
    if (!region) {
      throw new Error('Role not found');
    }

    return region;
  }

  async getByLabel(label) {
    const region = await RegionRepository.findByLabel(label);
    
    if (!region) {
      throw new Error('Role not found');
    }

    return region;
  }

  async create(data) {
    return await RegionRepository.create(data);
  }

  async update(id, data) {
    return await RegionRepository.update(id, data);
  }

  async delete(id) {
    return await RegionRepository.delete(id);
  }
}

module.exports = new RegionService();
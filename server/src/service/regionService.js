const RegionRepository = require('../repository/regionRepository');

class RegionService {
  async getAll() {
    return await RegionRepository.findAll();
  }

  async getById(id) {
    const p1 = await RegionRepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByName(name) {
    const p1 = await RegionRepository.findByName(name);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByLabel(label) {
    const p1 = await RegionRepository.findByLabel(label);
    
    if (!p1) {
      return null;
    }

    return p1;
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

  async existsByName(name) {
    return await RegionRepository.existsByName(name);
  }
}

module.exports = new RegionService();
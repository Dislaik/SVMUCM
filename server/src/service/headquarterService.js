const HeadquarterRepository = require('../repository/headquarterRepository');

class HeadquarterService {
  async getAll() {
    return await HeadquarterRepository.findAll();
  }

  async getById(id) {
    const headquarter = await HeadquarterRepository.findById(id);

    if (!headquarter) {
      throw new Error('Headquarter not found');
    }

    return headquarter;
  }

  async getByName(name) {
    const headquarter = await HeadquarterRepository.findByName(name);
    
    if (!headquarter) {
      throw new Error('Headquarter not found');
    }

    return headquarter;
  }

  async getByLabel(label) {
    const headquarter = await HeadquarterRepository.findByLabel(label);
    
    if (!headquarter) {
      throw new Error('Headquarter not found');
    }

    return headquarter;
  }

  async create(data) {
    return await HeadquarterRepository.create(data);
  }

  async update(id, data) {
    return await HeadquarterRepository.update(id, data);
  }

  async delete(id) {
    return await HeadquarterRepository.delete(id);
  }
}

module.exports = new HeadquarterService();
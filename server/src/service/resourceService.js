const ResourceRepository = require('../repository/resourceRepository');

class ResourceService {
  async getAll() {
    return await ResourceRepository.findAll();
  }

  async getById(id) {
    const resource = await ResourceRepository.findById(id);

    if (!resource) {
      throw new Error('Resource not found');
    }

    return resource;
  }

  async getByName(name) {
    const resource = await ResourceRepository.findByName(name);
    
    if (!resource) {
      throw new Error('Resource not found');
    }

    return resource;
  }

  async getByLabel(label) {
    const resource = await ResourceRepository.findByLabel(label);
    
    if (!resource) {
      throw new Error('Resource not found');
    }

    return resource;
  }

  async create(data) {
    return await ResourceRepository.create(data);
  }

  async update(id, data) {
    return await ResourceRepository.update(id, data);
  }

  async delete(id) {
    return await ResourceRepository.delete(id);
  }

  async existsByName(name) {
    return await ResourceRepository.existsByName(name);
  }
}

module.exports = new ResourceService();
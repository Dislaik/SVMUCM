const Resource = require('../model/resource');

class ResourceRepository {
  async findAll() {
    return await Resource.findAll();
  }

  async findById(id) {
    return await Resource.findByPk(id);
  }
  
  async create(data) {
    return await Resource.create(data);
  }

  async update(id, data) {
    const resource = await this.findById(id);

    if (!resource) {
      throw new Error('Resource not found');
    }
    
    return await resource.update(data);
  }

  async delete(id) {
    const resource = await this.findById(id);

    if (!resource) {
      throw new Error('Resource not found');
    }

    return await resource.destroy();
  }
}

module.exports = new ResourceRepository();
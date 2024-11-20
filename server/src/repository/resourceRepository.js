const Resource = require('../model/resource');

class ResourceRepository {
  async findAll() {
    return await Resource.findAll();
  }

  async findById(id) {
    return await Resource.findByPk(id);
  }

  async findByName(name) {
    return await Resource.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await Resource.findOne({ where: { label: label } });
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

  async existsByName(name) {
    const resource = await this.findByName(name);

    if (!resource) {
      return false;
    }

    return true;
  }
}

module.exports = new ResourceRepository();
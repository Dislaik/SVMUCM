const City = require('../model/city');
const Region = require('../model/region');

class CityRepository {
  async findAll() {
    return await City.findAll( { include: [Region]});
  }

  async findById(id) {
    return await City.findByPk(id);
  }

  async findByName(name) {
    return await City.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await City.findOne({ where: { label: label } });
  }

  async findByRegionId(id) {
    return await City.findAll({ where: { id_region: id}})
  }

  async findByRegionName(name) {
    const region = await Region.findOne({where: {name: name}})

    return await City.findAll({ where: { id_region: region.id}})
  }

  async create(data) {
    return await City.create(data);
  }

  async update(id, data) {
    const city = await this.findById(id);

    if (!city) {
      throw new Error('City not found');
    }
    
    return await city.update(data);
  }

  async delete(id) {
    const city = await this.findById(id);

    if (!city) {
      throw new Error('City not found');
    }

    return await city.destroy();
  }
}

module.exports = new CityRepository();
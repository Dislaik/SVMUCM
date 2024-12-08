const City = require('../model/city');
const Region = require('../model/region');

// Repositorio de la clase City, se encarga de realizar las consultas a la base de datos
class CityRepository {
  async findAll() {
    return await City.findAll( { include: [Region]});
  }

  async findById(id) {
    return await City.findByPk(id, { include: [Region] });
  }

  async findByName(name) {
    return await City.findOne({ where: { name: name }, include: [Region] });
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
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }

  async existsByName(name) {
    const p1 = await this.findByName(name);

    if (!p1) {
      return false;
    }

    return true;
  }
}

module.exports = new CityRepository();
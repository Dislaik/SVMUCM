const CityRepository = require('../repository/cityRepository');

class CityService {
  async getAll() {
    const p1 = await CityRepository.findAll();
    
    const p2 = p1.map(city => {
      const p3 = city.toJSON();

      p3.id_region = p3.region;

      delete p3.region;

      return p3;
    })

    return p2;
  }

  async getById(id) {
    const p1 = await CityRepository.findById(id);

    if (!p1) {
      return null
    }

    const p2 = p1.toJSON();

    p2.id_region = p2.region;

    delete p2.region;

    return p2;
  }

  async getByName(name) {
    const city = await CityRepository.findByName(name);
    
    if (!city) {
      return null
    }

    return city;
  }

  async getByLabel(label) {
    const city = await CityRepository.findByLabel(label);
    
    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  async getByRegionId(id) {
    const cities = await CityRepository.findByRegionId(id);

    if (!cities) {
      throw new Error('Cities not found');
    }

    return cities;
  }

  async getByRegionName(name) {
    const cities = await CityRepository.findByRegionName(name);

    if (!cities) {
      throw new Error('Cities not found');
    }

    return cities;
  }

  async create(data) {
    return await CityRepository.create(data);
  }

  async update(id, data) {
    return await CityRepository.update(id, data);
  }

  async delete(id) {
    return await CityRepository.delete(id);
  }

  async existsByName(name) {
    return await CityRepository.existsByName(name);
  }
}

module.exports = new CityService();
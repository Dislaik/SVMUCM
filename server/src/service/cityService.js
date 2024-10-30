const CityRepository = require('../repository/cityRepository');

class CityService {
  async getAll() {
    const cities = await CityRepository.findAll();
    
    const restructuredCities = cities.map(city => {
      const cityJSON = city.toJSON();

      cityJSON.id_region = cityJSON.region;

      delete cityJSON.region;

      return cityJSON;
    })

    return restructuredCities;
  }

  async getById(id) {
    const city = await CityRepository.findById(id);

    if (!city) {
      throw new Error('City not found');
    }

    return city;
  }

  async getByName(name) {
    const city = await CityRepository.findByName(name);
    
    if (!city) {
      throw new Error('City not found');
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
}

module.exports = new CityService();
const APUResourceRepository = require('../repository/apuResourceRepository');

class APUResourceService {
  async getAll() {
    const apuResources = await APUResourceRepository.findAll();

    const restructuredAPUResources = apuResources.map(apuResource => {
      const apuResourceJSON = apuResource.toJSON();

      apuResourceJSON.id_apu = apuResourceJSON.apu;
      apuResourceJSON.id_resource = apuResourceJSON.resource;

      delete apuResourceJSON.apu;
      delete apuResourceJSON.resource;

      return apuResourceJSON;
    })

    return restructuredAPUResources;
  }

  async getById(id) {
    const apuResource = await APUResourceRepository.findById(id);

    if (!apuResource) {
      throw new Error('apuResource not found');
    }

    return apuResource;
  }

  async getByAPUId(id) {
    const apuResources = await APUResourceRepository.findByAPUId(id);

    const restructuredAPUResources = apuResources.map(apuResource => {
      const apuResourceJSON = apuResource.toJSON();

      apuResourceJSON.id_apu = apuResourceJSON.apu;
      apuResourceJSON.id_resource = apuResourceJSON.resource;

      delete apuResourceJSON.apu;
      delete apuResourceJSON.resource;

      return apuResourceJSON;
    })

    if (!restructuredAPUResources) {
      throw new Error('apuResources not found');
    }

    return restructuredAPUResources;
  }

	async getByResourceId(id) {
    const apuResources = await APUResourceRepository.findByResourceId(id);

    if (!apuResources) {
      throw new Error('apuResources not found');
    }

    return apuResources;
  }

  async create(data) {
    return await APUResourceRepository.create(data);
  }

  async update(id, data) {
    return await APUResourceRepository.update(id, data);
  }

  async delete(id) {
    return await APUResourceRepository.delete(id);
  }
}

module.exports = new APUResourceService();
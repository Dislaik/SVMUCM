const APUResourceRepository = require('../repository/apuResourceRepository'); // El Repositorio APUResource es llamado

// Servicio de la clase APUResource, funciona como capa intermedia y transforma el resultado al deseado
class APUResourceService {
  async getAll() {
    const p1 = await APUResourceRepository.findAll();

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_apu = p3.apu;
      p3.id_resource = p3.resource;

      delete p3.apu;
      delete p3.resource;

      return p3;
    })

    return p2;
  }

  async getById(id) {
    const p1 = await APUResourceRepository.findById(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_apu = p2.apu;
    p2.id_resource = p2.resource;

    delete p2.apu;
    delete p2.resource;

    return p2;
  }

  async getByAPUId(id) {
    const p1 = await APUResourceRepository.findByAPUId(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_apu = p3.apu;
      p3.id_resource = p3.resource;

      delete p3.apu;
      delete p3.resource;

      return p3;
    })

    return p2;
  }

	async getByResourceId(id) {
    const apuResources = await APUResourceRepository.findByResourceId(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_apu = p3.apu;
      p3.id_resource = p3.resource;

      delete p3.apu;
      delete p3.resource;

      return p3;
    })

    return p2;
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
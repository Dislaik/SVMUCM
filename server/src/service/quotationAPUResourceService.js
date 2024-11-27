const QuotationAPUResourceRepository = require('../repository/quotationAPUResourceRepository');

class QuotationAPUResourceService {
  async getAll() { 
    const p1 = await QuotationAPUResourceRepository.findAll();

    const p2 = p1.map(p1 => {
      const object = p1.toJSON();

      object.id_quotation = object.quotation;
      object.id_apu = object.apu;
      object.id_resource = object.resource;

      delete object.quotation;
      delete object.apu;
      delete object.resource;

      return object;
    })

    return p2;
  }

  async getById(id) {
    const p1 = await QuotationAPUResourceRepository.findById(id);

    if (!p1) {
      return null
    }

    const object = p1.toJSON();

    object.id_quotation = object.quotation;
    object.id_apu = object.apu;
    object.id_resource = object.resource;

    delete object.quotation;
    delete object.apu;
    delete object.resource;


    return object;
  }

  async getByQuotationId(id) {
    const p1 = await QuotationAPUResourceRepository.findByQuotationId(id);

    if (!p1) {
      return null
    }

	    const p2 = p1.map(p1 => {
      const object = p1.toJSON();

      object.id_quotation = object.quotation;
      object.id_apu = object.apu;
      object.id_resource = object.resource;

      delete object.quotation;
      delete object.apu;
      delete object.resource;

      return object;
    })

    return p2;
  }

  async getByAPUId(id) {
    const p1 = await QuotationAPUResourceRepository.findByAPUId(id);

    if (!p1) {
      return null
    }

	    const p2 = p1.map(p1 => {
      const object = p1.toJSON();

      object.id_quotation = object.quotation;
      object.id_apu = object.apu;
      object.id_resource = object.resource;

      delete object.quotation;
      delete object.apu;
      delete object.resource;

      return object;
    })

    return p2;
  }

  async getByResourceId(id) {
    const p1 = await QuotationAPUResourceRepository.findByResourceId(id);

    if (!p1) {
      return null
    }

	    const p2 = p1.map(p1 => {
      const object = p1.toJSON();

      object.id_quotation = object.quotation;
      object.id_apu = object.apu;
      object.id_resource = object.resource;

      delete object.quotation;
      delete object.apu;
      delete object.resource;

      return object;
    })

    return p2;
  }
  

  async create(data) {
    return await QuotationAPUResourceRepository.create(data);
  }

  async update(id, data) {
    return await QuotationAPUResourceRepository.update(id, data);
  }

  async delete(id) {
    return await QuotationAPUResourceRepository.delete(id);
  }
}

module.exports = new QuotationAPUResourceService();
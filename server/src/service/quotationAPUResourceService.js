const QuotationAPUResourceRepository = require('../repository/quotationAPUResourceRepository');

class QuotationAPUResourceService {
  async getAll() { 
    const p1 = await QuotationAPUResourceRepository.findAll();

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_quotation = p3.quotation;
      p3.id_apu = p3.apu;
      p3.id_resource = p3.resource;

      delete p3.quotation;
      delete p3.apu;
      delete p3.resource;

      return p3;
    })

    return p2;
  }

  async getById(id) {
    const p1 = await QuotationAPUResourceRepository.findById(id);

    if (!p1) {
      return null
    }

    const p2 = p1.toJSON();

    p2.id_quotation = p2.quotation;
    p2.id_apu = p2.apu;
    p2.id_resource = p2.resource;

    delete p2.quotation;
    delete p2.apu;
    delete p2.resource;


    return p2;
  }

  async getByQuotationId(id) {
    const p1 = await QuotationAPUResourceRepository.findByQuotationId(id);

    if (!p1) {
      return null
    }

	  const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_quotation = p3.quotation;
      p3.id_apu = p3.apu;
      p3.id_resource = p3.resource;

      delete p3.quotation;
      delete p3.apu;
      delete p3.resource;

      return p3;
    })

    return p2;
  }

  async getByAPUId(id) {
    const p1 = await QuotationAPUResourceRepository.findByAPUId(id);

    if (!p1) {
      return null
    }

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_quotation = p3.quotation;
      p3.id_apu = p3.apu;
      p3.id_resource = p3.resource;

      delete p3.quotation;
      delete p3.apu;
      delete p3.resource;

      return p3;
    })

    return p2;
  }

  async getByResourceId(id) {
    const p1 = await QuotationAPUResourceRepository.findByResourceId(id);

    if (!p1) {
      return null
    }

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_quotation = p3.quotation;
      p3.id_apu = p3.apu;
      p3.id_resource = p3.resource;

      delete p3.quotation;
      delete p3.apu;
      delete p3.resource;

      return p3;
    })

    return p2;
  }
  

  async create(data) {
    return await QuotationAPUResourceRepository.create(data);
  }

  async delete(id) {
    return await QuotationAPUResourceRepository.delete(id);
  }
}

module.exports = new QuotationAPUResourceService();
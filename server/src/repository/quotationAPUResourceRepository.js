const QuotationAPUResource = require('../model/quotationAPUResource');
const Quotation = require('../model/quotation');
const APU = require('../model/apu');
const Resource = require('../model/resource');

class QuotationAPUResourceRepository {
  async findAll() {
    return await QuotationAPUResource.findAll();
  }

  async findById(id) {
    return await QuotationAPUResource.findByPk(id, { include: [Quotation, APU, Resource]});
  }

  async findByQuotationId(id) {
    return await QuotationAPUResource.findAll({ where: { id_quotation: id}, include: [Quotation, APU, Resource]})
  }

  async findByAPUId(id) {
    return await QuotationAPUResource.findAll({ where: { id_apu: id }, include: [Quotation, APU, Resource]});
  }

  async findByResourceId(id) {
    return await QuotationAPUResource.findAll({ where: { id_resource: id }, include: [Quotation, APU, Resource]});
  }

  async create(data) {
    return await QuotationAPUResource.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      throw new Error('Project Volunteer Student not found');
    }
    
    return await p1.update(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      throw new Error('Project Volunteer Student not found');
    }

    return await p1.destroy();
  }
}

module.exports = new QuotationAPUResourceRepository();
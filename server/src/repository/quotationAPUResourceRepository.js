const QuotationAPUResource = require('../model/quotationAPUResource'); // Modelo QuotationAPUResource es llamado
const Quotation = require('../model/quotation'); // Modelo Quotation es llamado
const APU = require('../model/apu'); // Modelo APU es llamado
const Resource = require('../model/resource'); // Modelo Resource es llamado

// Repositorio de la clase QuotationAPUResource, se encarga de realizar las consultas a la base de datos
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

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }
}

module.exports = new QuotationAPUResourceRepository();
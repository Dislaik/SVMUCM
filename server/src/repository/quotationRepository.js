const Career = require('../model/career');
const City = require('../model/city');
const Project = require('../model/project');
const projectStatus = require('../model/projectStatus');
const Quotation = require('../model/quotation');
const QuotationStatus = require('../model/quotationStatus');
const User = require('../model/user');

class QuotationRepository {
  async findAll() {
    return await Quotation.findAll({ include: [{ model: Project, include: [ { model: User }, { model: City }, { model: Career }, { model: projectStatus } ]}, { model: QuotationStatus }] });
  }

  async findById(id) {
    return await Quotation.findByPk(id);
  }

  async findByProjectId(id) {
    return await Quotation.findOne({ where: { id_project: id }, include: [{ model: Project, include: [ { model: User }, { model: City }, { model: Career }, { model: projectStatus } ]}, { model: QuotationStatus }] })
  }

  async create(data) {
    return await Quotation.create(data);
  }

  async update(id, data) {
    const quotation = await this.findById(id);

    if (!quotation) {
      throw new Error('Quotation not found');
    }
    
    return await quotation.update(data);
  }

  async delete(id) {
    const quotation = await this.findById(id);

    if (!quotation) {
      throw new Error('Quotation not found');
    }

    return await quotation.destroy();
  }
}

module.exports = new QuotationRepository();
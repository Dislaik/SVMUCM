const Career = require('../model/career'); // Modelo Career es llamado
const City = require('../model/city'); // Modelo City es llamado
const Project = require('../model/project'); // Modelo Project es llamado
const projectStatus = require('../model/projectStatus'); // Modelo projectStatus es llamado
const Quotation = require('../model/quotation'); // Modelo Quotation es llamado
const QuotationStatus = require('../model/quotationStatus'); // Modelo QuotationStatus es llamado
const User = require('../model/user'); // Modelo Project es llamado

// Repositorio de la clase Quotation, se encarga de realizar las consultas a la base de datos
class QuotationRepository {
  async findAll() {
    return await Quotation.findAll({ include: [{ model: Project, include: [ { model: User }, { model: City }, { model: Career }, { model: projectStatus } ]}, { model: QuotationStatus }] });
  }

  async findById(id) {
    return await Quotation.findByPk(id, { include: [{ model: Project, include: [ { model: User }, { model: City }, { model: Career }, { model: projectStatus } ]}, { model: QuotationStatus }] });
  }

  async findByProjectId(id) {
    return await Quotation.findOne({ where: { id_project: id }, include: [{ model: Project, include: [ { model: User }, { model: City }, { model: Career }, { model: projectStatus } ]}, { model: QuotationStatus }] })
  }

  async create(data) {
    return await Quotation.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }
}

module.exports = new QuotationRepository();
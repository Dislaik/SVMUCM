const QuotationStatus = require('../model/quotationStatus'); // Modelo QuotationStatus es llamado

// Repositorio de la clase QuotationStatus, se encarga de realizar las consultas a la base de datos
class QuotationStatusRepository {
  async findAll() {
    return await QuotationStatus.findAll();
  }

  async findById(id) {
    return await QuotationStatus.findByPk(id);
  }

  async findByName(name) {
    return await QuotationStatus.findOne({ where: { name: name } });
  }

  async findByLabel(label) {
    return await QuotationStatus.findOne({ where: { label: label } });
  }
}

module.exports = new QuotationStatusRepository();
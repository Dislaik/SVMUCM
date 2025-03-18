const QuotationStatusRepository = require('../repository/quotationStatusRepository'); // El Repositorio QuotationStatus es llamado

// Servicio de la clase QuotationStatus, funciona como capa intermedia y transforma el resultado al deseado
class QuotationStatusService {
  async getAll() {
    return await QuotationStatusRepository.findAll();
  }

  async getById(id) {
    const p1 = await QuotationStatusRepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByName(name) {
    const p1 = await QuotationStatusRepository.findByName(name);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByLabel(label) {
    const p1 = await QuotationStatusRepository.findByLabel(label);
    
    if (!p1) {
      return null;
    }

    return p1;
  }
}

module.exports = new QuotationStatusService();
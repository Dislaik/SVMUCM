const QuotationStatusRepository = require('../repository/quotationStatusRepository');

class QuotationStatusService {
  async getAll() {
    return await QuotationStatusRepository.findAll();
  }

  async getById(id) {
    const quotationStatus = await QuotationStatusRepository.findById(id);

    if (!quotationStatus) {
      throw new Error('Quotation Status not found');
    }

    return quotationStatus;
  }

  async getByName(name) {
    const quotationStatus = await QuotationStatusRepository.findByName(name);
    
    if (!quotationStatus) {
      throw new Error('Quotation Status not found');
    }

    return quotationStatus;
  }

  async getByLabel(label) {
    const quotationStatus = await QuotationStatusRepository.findByLabel(label);
    
    if (!quotationStatus) {
      throw new Error('Quotation Status not found');
    }

    return quotationStatus;
  }

  async create(data) {
    return await QuotationStatusRepository.create(data);
  }

  async update(id, data) {
    return await QuotationStatusRepository.update(id, data);
  }

  async delete(id) {
    return await QuotationStatusRepository.delete(id);
  }
}

module.exports = new QuotationStatusService();
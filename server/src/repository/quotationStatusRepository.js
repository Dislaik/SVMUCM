const QuotationStatus = require('../model/quotationStatus');

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

  async create(data) {
    return await QuotationStatus.create(data);
  }

  async update(id, data) {
    const quotationStatus = await this.findById(id);

    if (!quotationStatus) {
      throw new Error('Quotation Status not found');
    }
    
    return await QuotationStatus.update(data);
  }

  async delete(id) {
    const quotationStatus = await this.findById(id);

    if (!quotationStatus) {
      throw new Error('Quotation Status not found');
    }

    return await QuotationStatus.destroy();
  }
}

module.exports = new QuotationStatusRepository();
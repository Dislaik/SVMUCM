const QuotationRepository = require('../repository/quotationRepository');

class QuotationService {
  async getAll() {
    const quotations = await QuotationRepository.findAll();
    const restructuredQuotation = quotations.map(quotation => {
      const quotationJSON = quotation.toJSON();

      quotationJSON.id_project = quotationJSON.project;
      quotationJSON.id_project.id_user = quotationJSON.project.user;
      quotationJSON.id_project.id_city = quotationJSON.project.city;
      quotationJSON.id_project.id_career = quotationJSON.project.career;
      quotationJSON.id_project.id_project_status = quotationJSON.project.project_status;
      quotationJSON.id_quotation_status = quotationJSON.quotation_status;

      delete quotationJSON.project.user;
      delete quotationJSON.project.city;
      delete quotationJSON.project.career;
      delete quotationJSON.project.project_status;
      delete quotationJSON.project;
      delete quotationJSON.quotation_status;

      return quotationJSON;
    });


    return restructuredQuotation;
  }

  async getById(id) {
    const quotation = await QuotationRepository.findById(id);

    if (!quotation) {
      throw new Error('Quotation not found');
    }

    return quotation;
  }

  async getByProjectId(id) {
    const quotation = await QuotationRepository.findByProjectId(id);
    if (!quotation) {
      throw new Error('Quotation not found');
    }

    return quotation;
  }

  async create(data) {
    return await QuotationRepository.create(data);
  }

  async update(id, data) {
    return await QuotationRepository.update(id, data);
  }

  async delete(id) {
    return await QuotationRepository.delete(id);
  }
}

module.exports = new QuotationService();
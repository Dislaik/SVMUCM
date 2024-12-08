const QuotationRepository = require('../repository/quotationRepository');  // El Repositorio Quotation es llamado

// Servicio de la clase Quotation, funciona como capa intermedia y transforma el resultado al deseado
class QuotationService {
  async getAll() {
    const p1 = await QuotationRepository.findAll();

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_project = p3.project;
      p3.id_project.id_user = p3.project.user;
      p3.id_project.id_city = p3.project.city;
      p3.id_project.id_career = p3.project.career;
      p3.id_project.id_project_status = p3.project.project_status;
      p3.id_quotation_status = p3.quotation_status;

      delete p3.project.user;
      delete p3.project.city;
      delete p3.project.career;
      delete p3.project.project_status;
      delete p3.project;
      delete p3.quotation_status;

      return p3;
    });


    return p2;
  }

  async getById(id) {
    const p1 = await QuotationRepository.findById(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_project = p2.project;
    p2.id_project.id_user = p2.project.user;
    p2.id_project.id_city = p2.project.city;
    p2.id_project.id_career = p2.project.career;
    p2.id_project.id_project_status = p2.project.project_status;
    p2.id_quotation_status = p2.quotation_status;

    delete p2.project.user;
    delete p2.project.city;
    delete p2.project.career;
    delete p2.project.project_status;
    delete p2.project;
    delete p2.quotation_status; 

    return p2;
  }

  async getByProjectId(id) {
    const p1 = await QuotationRepository.findByProjectId(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_project = p2.project;
    p2.id_project.id_user = p2.project.user;
    p2.id_project.id_city = p2.project.city;
    p2.id_project.id_career = p2.project.career;
    p2.id_project.id_project_status = p2.project.project_status;
    p2.id_quotation_status = p2.quotation_status;

    delete p2.project.user;
    delete p2.project.city;
    delete p2.project.career;
    delete p2.project.project_status;
    delete p2.project;
    delete p2.quotation_status; 

    return p2;
  }

  async create(data) {
    return await QuotationRepository.create(data);
  }

  async update(id, data) {
    return await QuotationRepository.update(id, data);
  }
}

module.exports = new QuotationService();
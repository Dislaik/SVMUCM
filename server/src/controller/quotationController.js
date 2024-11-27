const QuotationService = require('../service/quotationService');

class QuotationController {
  async getAll(request, response) {
    try {
      const quotations = await QuotationService.getAll();
      
      response.status(200).json({ ok: true, message: quotations});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const quotation = await QuotationService.getById(id)

      return response.status(200).json({ ok: true, message: quotation});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const quotation = await QuotationService.getByProjectId(id);
      
      if (!quotation) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: quotation});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }


  async create(request, response) {
    try {
      const { body } = request
      const quotationObject = {
        id_project: body.id_project.id,
        id_quotation_status: body.id_quotation_status.id,
        end_date: body.end_date,
        created_at: body.created_at
      }

      let quotation = await QuotationService.create(quotationObject);

      quotation.id_project = body.id_project;
      quotation.id_quotation_status = body.id_quotation_status;

      return response.status(200).json({ ok: true, message: quotation});
    } catch (error) {
      return response.status(500).json({ ok: false,  error: error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const quotationObject = {
        id_project: body.id_project.id,
        id_quotation_status: body.id_quotation_status.id,
        end_date: body.end_date,
        created_at: body.created_at
      }

      const quotation = await QuotationService.update(id, quotationObject);

      if (!quotation) {
        return response.status(404).json({ ok: false, message: 'Quotation not found'});
      }

      quotation.id_project = body.id_project;
      quotation.id_quotation_status = body.id_quotation_status;

      return response.status(200).json({ ok: true, message: quotation});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const quotation = await QuotationService.getById(id)

      await QuotationService.delete(id);

      res.status(200).json(quotation);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new QuotationController();
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

      response.status(200).json(quotation);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const quotation = await QuotationService.getByProjectId(id);
      
      if (!quotation) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: quotation});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }


  async create(request, response) {
    try {
      const { body } = request
      const quotationObject = {
        id_project: body.id_project.id,
        id_quotation_status: body.id_quotation_status.id,
        duration_day: body.durationDay,
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

      const quotation = await QuotationService.update(id, body);
      if (!quotation) {
        return response.status(404).json({ message: 'Quotation not found' });
      }

      response.status(200).json(quotation);
    } catch (error) {
      response.status(500).json({ error: 'Error updating quotation' });
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
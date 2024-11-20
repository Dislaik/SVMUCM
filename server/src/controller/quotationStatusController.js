const QuotationStatusService = require('../service/quotationStatusService');

class QuotationStatusController {
  async getAll(request, response) {
    try {
      const quotationStatus = await QuotationStatusService.getAll();
      
      response.status(200).json({ ok: true, message: quotationStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const quotationStatus = await QuotationStatusService.getById(id)

      response.status(200).json(quotationStatus);
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const quotationStatus = await QuotationStatusService.getByName(name);
      
      if (!quotationStatus) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: quotationStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const quotationStatus = await QuotationStatusService.getByLabel(label);

      if (!quotationStatus) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: quotationStatus});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const quotationStatus = await QuotationStatusService.create(body);

      response.status(200).json(quotationStatus);
    } catch (error) {
      response.status(500).json({ error: 'Error creating quotationStatus' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const quotationStatus = await QuotationStatusService.update(id, body);
      if (!quotationStatus) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(quotationStatus);
    } catch (error) {
      response.status(500).json({ error: 'Error updating quotationStatus' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const quotationStatus = await QuotationStatusService.getById(id)

      await QuotationStatusService.delete(id);

      res.status(200).json(quotationStatus);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new QuotationStatusController();
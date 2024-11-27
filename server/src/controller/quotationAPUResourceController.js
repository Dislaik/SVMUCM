const QuotationAPUResourceService = require('../service/quotationAPUResourceService');

class ProjectVolunteerStudentController {

  async getAll(request, response) {
    try {
      const p1 = await QuotationAPUResourceService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getById(id)

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByQuotationId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getByQuotationId(id);

      if (!p1) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByAPUId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getByAPUId(id);

      if (!p1) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async getByResourceId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getByResourceId(id);

      if (!p1) {
        return response.status(200).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_quotation: body.id_quotation.id,
        id_apu: body.id_apu.id,
        id_resource: body.id_resource.id,
        uuid: body.uuid,
        amount: body.amount,
        price: body.price,
        subtotal: body.subtotal,
        created_at: body.created_at
      }
      
      let p1 = await QuotationAPUResourceService.create(object);
      p1.id_quotation = body.id_quotation;
      p1.id_apu = body.id_apu;
      p1.id_resource = body.id_resource;

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const p1 = await QuotationAPUResourceService.update(id, body);
      if (!p1) {
        return response.status(404).json({ message: 'Project Volunteer Student not found' });
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getById(id)

      await QuotationAPUResourceService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new ProjectVolunteerStudentController();
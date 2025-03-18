const QuotationAPUResourceService = require('../service/quotationAPUResourceService'); // El servicio QuotationAPUResource es llamado

// Controlador de la clase QuotationAPUResource, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo QuotationAPUResource
class QuotationAPUResourceController {

  // Metodo que obtiene todos los datos de QuotationAPUResource
  async getAll(request, response) {
    try {
      const p1 = await QuotationAPUResourceService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene un QuotationAPUResource por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene todos los QuotationAPUResource por la ID de una Quotation
  async getByQuotationId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getByQuotationId(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene todos los QuotationAPUResource por la ID de una APU
  async getByAPUId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getByAPUId(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene todos los QuotationAPUResource por la ID de un Resource
  async getByResourceId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getByResourceId(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea un QuotationAPUResource a partir de las entradas recibidas
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

  // Metodo que elimina un QuotationAPUResource por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationAPUResourceService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await QuotationAPUResourceService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new QuotationAPUResourceController();
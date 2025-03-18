const QuotationService = require('../service/quotationService'); // El servicio Quotation es llamado

// Controlador de la clase Quotation, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo Quotation
class QuotationController {

  // Metodo que obtiene todos los datos de Quotation
  async getAll(request, response) {
    try {
      const p1 = await QuotationService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene un Quotation por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene un Quotation por el ID de Project
  async getByProjectId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationService.getByProjectId(id);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea un Quotation a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_project: body.id_project.id,
        id_quotation_status: body.id_quotation_status.id,
        start_date: body.start_date,
        end_date: body.end_date,
        price: body.price,
        created_at: body.created_at
      }

      let p1 = await QuotationService.create(object);

      p1.id_project = body.id_project;
      p1.id_quotation_status = body.id_quotation_status;

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false,  error: error });
    }
  }

  // Metodo que actualiza un Quotation a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const object = {
        id_project: body.id_project.id,
        id_quotation_status: body.id_quotation_status.id,
        start_date: body.start_date,
        end_date: body.end_date,
        price: body.price,
        created_at: body.created_at
      }
      let p1 = await QuotationService.update(id, object);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      p1.id_project = body.id_project;
      p1.id_quotation_status = body.id_quotation_status;

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }
}

module.exports = new QuotationController();
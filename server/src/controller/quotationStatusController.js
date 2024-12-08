const QuotationStatusService = require('../service/quotationStatusService'); // El servicio QuotationStatus es llamado

// Controlador de la clase QuotationStatus, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo QuotationStatus
class QuotationStatusController {

  // Metodo que obtiene todos los datos de QuotationStatus 
  async getAll(request, response) {
    try {
      const p1 = await QuotationStatusService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una QuotationStatus por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await QuotationStatusService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una QuotationStatus por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await QuotationStatusService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una QuotationStatus por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await QuotationStatusService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new QuotationStatusController();
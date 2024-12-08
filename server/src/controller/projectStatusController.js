const ProjectStatusService = require('../service/projectStatusService'); // El servicio ProjectStatus es llamado

// Controlador de la clase ProjectStatus, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo ProjectStatus
class ProjectStatusController {

  // Metodo que obtiene todos los datos de ProjectStatus 
  async getAll(request, response) {
    try {
      const p1 = await ProjectStatusService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una ProjectStatus por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await ProjectStatusService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una ProjectStatus por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await ProjectStatusService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una ProjectStatus por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await ProjectStatusService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new ProjectStatusController();
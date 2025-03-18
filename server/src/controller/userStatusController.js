const UserStatusService = require('../service/userStatusService');  // El servicio UserStatus es llamado

// Controlador de la clase UserStatus, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo UserStatus
class UserStatusController {

  // Metodo que obtiene todos los datos de UserStatus 
  async getAll(request, response) {
    try {
      const p1 = await UserStatusService.getAll();
      
      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene una UserStatus por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await UserStatusService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene una UserStatus por su nombre de identificador
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await UserStatusService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene una ProjectStatus por su etiqueta
  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const p1 = await UserStatusService.getByLabel(label);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }
}

module.exports = new UserStatusController();
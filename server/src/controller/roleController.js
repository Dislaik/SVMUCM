const RoleService = require('../service/roleService'); // El servicio Role es llamado

// Controlador de la clase Role, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo Role
class RoleController {

  // Metodo que obtiene todos los datos de Role
  async getAll(request, response) {
    try {
      const p1 = await RoleService.getAll();
      
      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un User por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await RoleService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un Role por su nombre de identificacion
  async getByName(request, response) {
    try {
      const { name } = request.params;
      const p1 = await RoleService.getByName(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un Role por su etiqueta
  async getByLabel(request, response) {
    try {
      const { name } = request.params;
      const p1 = await RoleService.getByLabel(name);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que actualiza una Resource a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const object = {
        name: body.name,
        label: body.label,
        created_at: body.created_atd
      }

      const p1 = await RoleService.update(id, object);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new RoleController();
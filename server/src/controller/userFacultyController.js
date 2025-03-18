const UserFacultyService = require('../service/userFacultyService'); // El servicio User - Faculty es llamado

// Controlador de la clase User - Faculty, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo User - Faculty
class UserFacultyController {

  // Metodo que obtiene todos los datos de User - Faculty
  async getAll(request, response) {
    try {
      const p1 = await UserFacultyService.getAll();
      
      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una User - Faculty por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await UserFacultyService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una User - Faculty por su ID de APU
  async getByUserId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await UserFacultyService.getByUserId(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que obtiene una User - Faculty por su ID de Resource
	async getByFacultyId(request, response) {
    try {
      const { id } = request.params;
      const p1 = await UserFacultyService.getByFacultyId(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que crea una User - Faculty a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request
      const object = {
        id_user: body.id_user.id,
        id_faculty: body.id_faculty.id,
        created_at: body.created_at
      }
      
      let p1 = await UserFacultyService.create(object);
      p1.id_user = body.id_user;
      p1.id_faculty = body.id_faculty;

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que actualiza una User - Faculty a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const object = {
        id_user: body.id_user.id,
        id_faculty: body.id_faculty.id,
        created_at: body.created_at
      }

      const p1 = await UserFacultyService.update(id, object);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      p1.id_user = body.id_user;
      p1.id_faculty = body.id_faculty;

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  // Metodo que elimina una User - Faculty por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await UserFacultyService.getById(id)

      if (!p1) {
        return response.status(404).json({ ok: true, message: null });
      }

      await UserFacultyService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

// Modulo que permite llamar la clase User - Faculty desde otros archivos
module.exports = new UserFacultyController();
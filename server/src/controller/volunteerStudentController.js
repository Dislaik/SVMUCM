const VolunteerStudentService = require('../service/volunteerStudentService'); // El servicio VolunteerStudent es llamado

// Controlador de la clase VolunteerStudent, valida los datos recibidos y realiza actualizaciones correspondientes en el modelo VolunteerStudent
class VolunteerStudentController {

  // Metodo que obtiene todos los datos de VolunteerStudent
  async getAll(request, response) {
    try {
      const p1 = await VolunteerStudentService.getAll();
      
      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un VolunteerStudent por su ID
  async getById(request, response) {
    try {
      const { id } = request.params;
      const p1 = await VolunteerStudentService.getById(id);

      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un VolunteerStudent por su run
  async getByRun(request, response) {
    try {
      const { username } = request.params;
      const p1 = await VolunteerStudentService.getByRun(username);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que obtiene un VolunteerStudent por su correo electronico
  async getByEmail(request, response) {
    try {
      const { email } = request.params;
      const p1 = await VolunteerStudentService.getByEmail(email);
      
      if (!p1) {
        return response.status(404).json({ ok: true, message: null});
      }

      return response.status(200).json({ ok: true, message: p1 });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }


  // Metodo que crea un VolunteerStudent a partir de las entradas recibidas
  async create(request, response) {
    try {
      const { body } = request;
      let error = {};
      
      if (await VolunteerStudentService.existsByRun(body.run)) {
        error.run = 'El RUN ya esta registrado';
      }

      if (await VolunteerStudentService.existsByEmail(body.email)) {
        error.email = 'El correo electrónico ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          run: body.run,
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          id_user_status: body.id_user_status.id,
          id_career: body.id_career.id,
          created_at: body.created_at
        }

        let p1 = await VolunteerStudentService.create(object);
        p1.id_user_status = body.id_user_status;
        p1.id_career = body.id_career;

        return response.status(200).json({ ok: true, message: p1 });
      }

      return response.status(400).json({ ok: false, error: error });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que actualiza un VolunteerStudent a partir de las entradas recibidas
  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const targetUser = await VolunteerStudentService.getByEmail(body.email);
      let error = {};

      if (targetUser && body.email === targetUser.email && Number(id) !== targetUser.id) {
        error.email = 'El correo electrónico ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const object = {
          run: body.run,
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          id_user_status: body.id_user_status.id,
          id_career: body.id_career.id,
          created_at: body.created_at
        } 

        let p1 = await VolunteerStudentService.update(id, object);

        if (!p1) {
          return response.status(404).json({ ok: true, message: null });
        }

        p1.id_role = body.id_role;
        p1.id_user_status = body.id_user_status;
        p1.id_career = body.id_career;

        return response.status(200).json({ ok: true, message: p1 });
      }

      return response.status(400).json({ ok: false, error: error });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  // Metodo que elimina una VolunteerStudent por su ID
  async delete(request, response) {
    try {
      const { id } = request.params;
      const p1 = await VolunteerStudentService.getById(id);

      await VolunteerStudentService.delete(id);

      return response.status(200).json({ ok: true, message: p1});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }
}

module.exports = new VolunteerStudentController();
const VolunteerStudentService = require('../service/volunteerStudentService');
const auth = require('../security/authentication');
const utils = require('../utils/utils');

class VolunteerStudentController {
  async getAll(request, response) {
    try {
      const volunteersStudents = await VolunteerStudentService.getAll();
      
      response.status(200).json({ ok: true, message: volunteersStudents});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const volunteerStudent = await VolunteerStudentService.getById(id)

      if (volunteerStudent) {
        return response.status(200).json({ ok: true, message: volunteerStudent}); 
      }

      response.status(404).json({ ok: false, error: 'User not found'});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByRun(request, response) {
    try {
      const { run } = request.params;
      const volunteerStudent = await VolunteerStudentService.getByRun(run)

      if (volunteerStudent) {
        return response.status(200).json({ ok: true, message: volunteerStudent});
      }

      response.status(404).json({ ok: false, error: 'Volunteer Student not found'});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByEmail(request, response) {
    try {
      const { email } = request.params;
      const volunteerStudent = await userService.getByEmail(email)

      if (volunteerStudent) {
        return response.status(200).json({ ok: true, message: volunteerStudent});
      }

      response.status(404).json({ ok: false, error: 'Volunteer Student not found'});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async create(request, response) {
    try {
      const { body } = request;
      let error = {};
      
      if (await VolunteerStudentService.existsByRun(body.run)) {
        error.run = 'Este RUN ya esta registrado';
      }

      if (await VolunteerStudentService.existsByEmail(body.email)) {
        error.email = 'El correo electronico ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const volunteerStudentObject = {
          run: body.run,
          email: body.email,
          first_name: body.first_name,
          last_name: body.last_name,
          id_user_status: body.id_user_status.id,
          created_at: body.created_at
        }

        let volunteerStudent = await VolunteerStudentService.create(volunteerStudentObject);
        volunteerStudent.id_user_status = body.id_user_status;

        return response.status(200).json({ ok: true, message: volunteerStudent});
      }

      response.status(200).json({ ok: false, error: error});
    } catch (error) {
      response.status(500).json({ ok: false,  error: error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const volunteerStudentObject = {
        run: body.run,
        email: body.email,
        first_name: body.first_name,
        last_name: body.last_name,
        id_user_status: body.id_user_status.id,
        created_at: body.created_at
      } 

      const VolunteerStudentUpdated = await VolunteerStudentService.update(id, volunteerStudentObject);
      if (!VolunteerStudentUpdated) {
        return response.status(404).json({ ok: false,  error: 'Volunteer Student not found' });
      }

      VolunteerStudentUpdated.id_role = body.id_role;
      VolunteerStudentUpdated.id_user_status = body.id_user_status;

      return response.status(200).json({ ok: true, message: VolunteerStudentUpdated});
    } catch (error) {
      return response.status(500).json({ error: 'Error updating Volunteer Student' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const volunteerStudent = await VolunteerStudentService.getById(id)

      await VolunteerStudentService.delete(id);

      return response.status(200).json({ ok: true, message: volunteerStudent});
    } catch (error) {
      return response.status(500).json({ ok: false,  error: error });
    }
  }
}

module.exports = new VolunteerStudentController();
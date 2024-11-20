const FacultyService = require('../service/facultyService');

class FacultyController {
  async getAll(request, response) {
    try {
      const faculties = await FacultyService.getAll();
      
      response.status(200).json({ ok: true, message: faculties});
    } catch (error) {
      response.status(500).json({ error: 'Error fetching faculties' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const faculty = await FacultyService.getById(id)

      if (!faculty) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: faculty});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const faculty = await FacultyService.getByName(name);
      
      if (!faculty) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: faculty});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const faculty = await FacultyService.getByLabel(label);

      if (!faculty) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: faculty});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const faculty = await FacultyService.create(body);

      response.status(200).json(faculty);
    } catch (error) {
      response.status(500).json({ error: 'Error creating faculty' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;
      const faculty = await FacultyService.update(id, body);

      if (!faculty) {
        return response.status(404).json({ ok: false, error: 'Sede no encontrada' });
      }

      return response.status(200).json({ ok: true, message: faculty });
    } catch (error) {
      return response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const faculty = await FacultyService.getById(id)

      await FacultyService.delete(id);

      res.status(200).json(faculty);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new FacultyController();
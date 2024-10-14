const CourseModeService = require('../service/courseModeService');

class CourseModeController {
  async getAll(request, response) {
    try {
      const courseMode = await CourseModeService.getAll();
      
      response.status(200).json({ ok: true, message: courseMode});
    } catch (error) {
      response.status(500).json({ ok: false, error: 'Error fetching course mode' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const courseMode = await CourseModeService.getById(id);
      
      if (!courseMode) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: courseMode});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const courseMode = await CourseModeService.getByName(name);
      
      if (!courseMode) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: courseMode});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const courseMode = await CourseModeService.getByLabel(label);

      if (!courseMode) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: courseMode});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const courseMode = await CourseModeService.create(body);

      response.status(200).json(courseMode);
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const courseMode = await CourseModeService.update(id, body);

      if (!courseMode) {
        response.status(404).json({ ok: false, error: 'Modalidad del curso no encontrada' });
      }

      response.status(200).json({ ok: true, message: courseMode });
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const courseMode = await CourseModeService.getById(id)

      if (!courseMode) {
        response.status(404).json({ ok: false, error: 'Modalidad del curso no encontrada' });
      }

      await CourseModeService.delete(id);

      res.status(200).json({ ok: true, message: courseMode});
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CourseModeController();
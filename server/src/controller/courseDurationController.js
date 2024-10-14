const CourseDurationService = require('../service/courseDurationService');

class CourseDurationController {
  async getAll(request, response) {
    try {
      const courseDuration = await CourseDurationService.getAll();
      
      response.status(200).json({ ok: true, message: courseDuration});
    } catch (error) {
      response.status(500).json({ ok: false, error: 'Error fetching course duration' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const courseDuration = await CourseDurationService.getById(id);
      
      if (!courseDuration) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: courseDuration});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const courseDuration = await CourseDurationService.getByName(name);
      
      if (!courseDuration) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: courseDuration});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const courseDuration = await CourseDurationService.getByLabel(label);

      if (!courseDuration) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: courseDuration});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const courseDuration = await CourseDurationService.create(body);

      response.status(200).json(courseDuration);
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const courseDuration = await CourseDurationService.update(id, body);

      if (!courseDuration) {
        response.status(404).json({ ok: false, error: 'Duración del curso no encontrada' });
      }

      response.status(200).json({ ok: true, message: courseDuration });
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const courseDuration = await CourseDurationService.getById(id)

      if (!courseDuration) {
        response.status(404).json({ ok: false, error: 'Duración del curso no encontrada' });
      }

      await CourseDurationService.delete(id);

      res.status(200).json({ ok: true, message: courseDuration});
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CourseDurationController();
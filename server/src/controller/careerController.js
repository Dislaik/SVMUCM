const CareerService = require('../service/careerService');

class CareerController {
  async getAll(request, response) {
    try {
      const careers = await CareerService.getAll();
      
      response.status(200).json({ ok: true, message: careers});
    } catch (error) {
      response.status(500).json({ error: 'Error fetching faculties' });
    }
  }

  async getById(request, response) {
    try {
      const { id } = request.params;
      const career = await CareerService.getById(id)

      if (!career) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: career});
    } catch (error) {
      response.status(500).json(null);
    }
  }

  async getByName(request, response) {
    try {
      const { name } = request.params;
      const career = await CareerService.getByName(name);
      
      if (!career) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: career});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByLabel(request, response) {
    try {
      const { label } = request.params;
      const career = await CareerService.getByLabel(label);

      if (!career) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: career});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async getByHeadquarterAndFacultyName(request, response) {
    try {
      const { headquarterName, facultyName } = request.params;
      const career = await CareerService.getByHeadquarterAndFacultyName(headquarterName, facultyName);

      if (!career) {
        response.status(200).json({ ok: true, message: null});
      }

      response.status(200).json({ ok: true, message: career});
    } catch (error) {
      response.status(500).json({ ok: false, error: error});
    }
  }

  async create(request, response) {
    try {
      const { body } = request
      const career = await CareerService.create(body);

      response.status(200).json(career);
    } catch (error) {
      response.status(500).json({ error: 'Error creating career' });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const career = await CareerService.update(id, body);
      if (!career) {
        return response.status(404).json({ message: 'Role not found' });
      }

      response.status(200).json(career);
    } catch (error) {
      response.status(500).json({ error: 'Error updating career' });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const career = await CareerService.getById(id)

      await CareerService.delete(id);

      res.status(200).json(career);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new CareerController();
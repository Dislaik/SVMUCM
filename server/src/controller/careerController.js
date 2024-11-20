const Headquarter = require('../model/headquarter');
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
      let error = {};

      if (await CareerService.existsByName(body.name)) {
        error.name = 'Este identificador ya esta registrado';
      }

      if (Object.keys(error).length === 0) {
        const careerObject = {
          name: body.name,
          label: body.label,
          id_headquarter: body.id_headquarter.id,
          id_faculty: body.id_faculty.id
        }

        let career = await CareerService.create(careerObject);

        career.id_headquarter = body.id_headquarter;
        career.id_faculty = body.id_faculty;

        return response.status(200).json({ ok: true, message: career});
      }

      return response.status(200).json({ ok: false, error: error});
    } catch (error) {
      return response.status(500).json({ ok: false,  error: error });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { body } = request;

      const careerObject = {
        name: body.name,
        label: body.label,
        id_headquarter: body.id_headquarter.id,
        id_faculty: body.id_faculty.id
      }

      let career = await CareerService.update(id, careerObject);

      if (!career) {
        return response.status(404).json({ ok: false, message: 'Career not found'}); 
      }

      career.id_headquarter = body.id_headquarter;
      career.id_faculty = body.id_faculty;

      return response.status(200).json({ ok: true, message: career});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      const career = await CareerService.getById(id)

      await CareerService.delete(id);

      return response.status(200).json({ ok: true, message: career});
    } catch (error) {
      return response.status(500).json({ ok: false, error: error });
    }
  }
}

module.exports = new CareerController();
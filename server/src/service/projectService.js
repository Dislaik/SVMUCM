const ProjectRepository = require('../repository/projectRepository'); // El Repositorio Project es llamado

// Servicio de la clase Project, funciona como capa intermedia y transforma el resultado al deseado
class ProjectService {
  async getAll() {
    const p1 = await ProjectRepository.findAll()

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_user = p3.user;
      p3.id_city = p3.city;
      p3.id_city.id_region = p3.city.region;
      p3.id_career = p3.career;
      p3.id_career.id_headquarter = p3.career.headquarter;
      p3.id_career.id_faculty = p3.career.faculty;
      p3.id_projectStatus = p3.project_status;

      delete p3.user;
      delete p3.city.region;
      delete p3.city;
      delete p3.career.headquarter;
      delete p3.career.faculty;
      delete p3.career;
      delete p3.project_status;

      return p3;
    });

    return p2;
  }

  async getById(id) {
    const p1 = await ProjectRepository.findById(id);

    if (!p1) {
      return null
    }

    const p2 = p1.toJSON();

    p2.id_user = p2.user;
    p2.id_city = p2.city;
    p2.id_city.id_region = p2.city.region;
    p2.id_career = p2.career;
    p2.id_career.id_headquarter = p2.career.headquarter;
    p2.id_career.id_faculty = p2.career.faculty;
    p2.id_projectStatus = p2.project_status;

    delete p2.user;
    delete p2.city.region;
    delete p2.city;
    delete p2.career.headquarter;
    delete p2.career.faculty;
    delete p2.career;
    delete p2.project_status;

    return p2;
  }

  async getByUserId(id) {
    const p1 = await ProjectRepository.findByUserId(id);

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_user = p3.user;
      p3.id_city = p3.city;
      p3.id_city.id_region = p3.city.region;
      p3.id_career = p3.career;
      p3.id_career.id_headquarter = p3.career.headquarter;
      p3.id_career.id_faculty = p3.career.faculty;
      p3.id_projectStatus = p3.project_status;

      delete p3.user;
      delete p3.city.region;
      delete p3.city;
      delete p3.career.headquarter;
      delete p3.career.faculty;
      delete p3.career;
      delete p3.project_status;

      return p3;
    });

    return p2;
  }

  async create(data) {
    return await ProjectRepository.create(data);
  }

  async update(id, data) {
    return await ProjectRepository.update(id, data);
  }
}

module.exports = new ProjectService();
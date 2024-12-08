const CareerRepository = require('../repository/careerRepository'); // El Repositorio Career es llamado

// Servicio de la clase Career, funciona como capa intermedia y transforma el resultado al deseado
class CareerService {
  async getAll() {
    const p1 = await CareerRepository.findAll();

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_headquarter = p3.headquarter;
      p3.id_faculty = p3.faculty;

      delete p3.headquarter;
      delete p3.faculty;

      return p3;
    });

    return p2
  }

  async getById(id) {
    const p1 = await CareerRepository.findById(id);
    
    if (!p1) {
      return null
    }
    const p2 = p1.toJSON();

    p2.id_headquarter = p2.headquarter;
    p2.id_faculty = p2.faculty;

    delete p2.headquarter;
    delete p2.faculty;

    return p2;
  }

  async getByName(name) {
    const p1 = await CareerRepository.findByName(name);
    
    if (!p1) {
      return null
    }
    const p2 = p1.toJSON();

    p2.id_headquarter = p2.headquarter;
    p2.id_faculty = p2.faculty;

    delete p2.headquarter;
    delete p2.faculty;

    return p2;
  }

  async getByLabel(label) {
    const p1 = await CareerRepository.findByLabel(label);
    
    if (!p1) {
      return null
    }
    const p2 = p1.toJSON();

    p2.id_headquarter = p2.headquarter;
    p2.id_faculty = p2.faculty;

    delete p2.headquarter;
    delete p2.faculty;

    return p2;
  }

  async getByHeadquarterAndFacultyName(headquarterName, facultyName) {
    return await CareerRepository.findByHeadquarterAndFacultyName(headquarterName, facultyName);
  }

  async create(data) {
    return await CareerRepository.create(data);
  }

  async update(id, data) {
    return await CareerRepository.update(id, data);
  }

  async delete(id) {
    return await CareerRepository.delete(id);
  }

  async existsByName(name) {
    return await CareerRepository.existsByName(name);
  }
}

module.exports = new CareerService();
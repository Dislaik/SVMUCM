const Career = require('../model/career'); // Modelo Career es llamado
const Faculty = require('../model/faculty'); // Modelo Faculty es llamado
const Headquarter = require('../model/headquarter'); // Modelo Headquarter es llamado

// Repositorio de la clase Career, se encarga de realizar las consultas a la base de datos
class CareerRepository {
  async findAll() {
    return await Career.findAll({ include: [ Headquarter, Faculty ] });
  }

  async findById(id) {
    return await Career.findByPk(id, { include: [ Headquarter, Faculty ] });
  }

  async findByName(name) {
    return await Career.findOne({ where: { name: name }, include: [ Headquarter, Faculty ] });
  }

  async findByLabel(label) {
    return await Career.findOne({ where: { label: label }, include: [ Headquarter, Faculty ] });
  }

  // Just a experiment, not really worth
  async findByHeadquarterAndFacultyName(headquarterName, facultyName) {
    const headquarter = await Headquarter.findOne({ where: {name: headquarterName} });
    const faculty = await Faculty.findOne({ where: {name: facultyName} });

    return await Career.findAll({ where: { id_headquarter:  headquarter.id, id_faculty: faculty.id} })
  }

  async create(data) {
    return await Career.create(data);
  }

  async update(id, data) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }
    
    return await p1.update(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      return null;
    }

    return await p1.destroy();
  }

  async existsByName(name) {
    const p1 = await this.findByName(name);

    if (!p1) {
      return false;
    }

    return true;
  }
}

module.exports = new CareerRepository();
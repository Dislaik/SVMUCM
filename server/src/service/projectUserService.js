const ProjectUserRepository = require('../repository/projectUserRepository'); // El Repositorio ProjectUser es llamado

// Servicio de la clase ProjectUser, funciona como capa intermedia y transforma el resultado al deseado
class ProjectUserService {
  async getAll() {
    const p1 = await ProjectUserRepository.findAll();

    if (!p1) {
      return null;
    }

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_project = p3.project;
      p3.id_user = p3.user;
      p3.id_user.id_role = p3.user.role;
      p3.id_faculty = p3.faculty;

      delete p3.user.role;
      delete p3.user;
      delete p3.project;
      delete p3.faculty;

      return p3;
    })

    return p2;
  }

  async getById(id) {
    const p1 = await ProjectUserRepository.findById(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.toJSON();

    p2.id_project = p2.project;
    p2.id_user = p2.user;
    p2.id_user.id_role = p2.user.role;
    p2.id_faculty = p2.faculty;

    delete p2.user.role;
    delete p2.user;
    delete p2.project;
    delete p2.faculty;

    return p2;
  }

  async getByUserId(id) {
    const p1 = await ProjectUserRepository.findByUserId(id);

    if (!p1) {
      return null;
    }

    const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_project = p3.project;
      p3.id_user = p3.user;
      p3.id_user.id_role = p3.user.role;
      p3.id_faculty = p3.faculty;

      delete p3.user.role;
      delete p3.user;
      delete p3.project;
      delete p3.faculty;

      return p3;
    })

    return p2;
  }

	async getByProjectId(id) {
    const p1 = await ProjectUserRepository.findByProjectId(id);

    if (!p1) {
      return null;
    }

		const p2 = p1.map(object => {
      const p3 = object.toJSON();

      p3.id_project = p3.project;
      p3.id_user = p3.user;
      p3.id_user.id_role = p3.user.role;
      p3.id_faculty = p3.faculty;

      delete p3.user.role;
      delete p3.user;
      delete p3.project;
      delete p3.faculty;

      return p3;
    })

    return p2;
  }

  async create(data) {
    return await ProjectUserRepository.create(data);
  }

  async delete(id) {
    return await ProjectUserRepository.delete(id);
  }
}

module.exports = new ProjectUserService();
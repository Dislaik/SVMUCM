const Project = require('../model/project');
const VolunteerStudent = require('../model/volunteerStudent');
const ProjectVolunteerStudent = require('../model/projectVolunteerStudent');

class ProjectVolunteerStudentRepository {
  async findAll() {
    return await ProjectVolunteerStudent.findAll();
  }

  async findById(id) {
    return await ProjectVolunteerStudent.findByPk(id, { include: [Project, VolunteerStudent]});
  }

  async findByProjectId(id) {
    return await ProjectVolunteerStudent.findAll({ where: { id_project: id}, include: [Project, VolunteerStudent]})
  }

  async findByVolunteerStudentId(id) {
    return await ProjectVolunteerStudent.findAll({ where: { id_volunteer_student: id }, include: [Project, VolunteerStudent]});
  }

  async create(data) {
    return await ProjectVolunteerStudent.create(data);
  }

  async update(id, data) {
    const projectVolunteerStudent = await this.findById(id);

    if (!projectVolunteerStudent) {
      throw new Error('Project Volunteer Student not found');
    }
    
    return await projectVolunteerStudent.update(data);
  }

  async delete(id) {
    const p1 = await this.findById(id);

    if (!p1) {
      throw new Error('Project Volunteer Student not found');
    }

    return await p1.destroy();
  }
}

module.exports = new ProjectVolunteerStudentRepository();
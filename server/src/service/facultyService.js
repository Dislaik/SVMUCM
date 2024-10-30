const FacultyRepository = require('../repository/facultyRepository');

class FacultyService {
  async getAll() {
    return await FacultyRepository.findAll();
  }

  async getById(id) {
    const faculty = await FacultyRepository.findById(id);

    if (!faculty) {
      throw new Error('Faculty not found');
    }

    return faculty;
  }

  async getByName(name) {
    const faculty = await FacultyRepository.findByName(name);
    
    if (!faculty) {
      throw new Error('Faculty not found');
    }

    return faculty;
  }

  async getByLabel(label) {
    const faculty = await FacultyRepository.findByLabel(label);
    
    if (!faculty) {
      throw new Error('Faculty not found');
    }

    return faculty;
  }

  async create(data) {
    return await FacultyRepository.create(data);
  }

  async update(id, data) {
    return await FacultyRepository.update(id, data);
  }

  async delete(id) {
    return await FacultyRepository.delete(id);
  }
}

module.exports = new FacultyService();
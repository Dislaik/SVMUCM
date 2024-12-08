const RecoveryPasswordRepository = require('../repository/recoveryPasswordRepository');

class RecoveryPasswordService {

  async getAll() {
    return await RecoveryPasswordRepository.findAll();
  }

  async getById(id) {
    const p1 = await RecoveryPasswordRepository.findById(id);

    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByCode(code) {
    const p1 = await RecoveryPasswordRepository.findByCode(code);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async getByUserId(id) {
    const p1 = await RecoveryPasswordRepository.findByUserId(id);
    
    if (!p1) {
      return null;
    }

    return p1;
  }

  async create(data) {
    return await RecoveryPasswordRepository.create(data);
  }

  async update(id, data) {
    return await RecoveryPasswordRepository.update(id, data);
  }

  async delete(id) {
    return await RecoveryPasswordRepository.delete(id);
  }
}

module.exports = new RecoveryPasswordService();
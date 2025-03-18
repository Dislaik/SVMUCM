const RecoveryPassword = require('../model/recoveryPassword');
const User = require('../model/user');

class RecoveryPasswordRepository {
  async findAll() {
    return await RecoveryPassword.findAll({ include: [ User ] });
  }

  async findById(id) {
    return await RecoveryPassword.findByPk(id, { include: [ User ] });
  }

  async findByCode(code) {
    return await RecoveryPassword.findOne({ where: { code: code }, include: [ User ] });
  }

  async findByUserId(id) {
    return await RecoveryPassword.findOne({ where: { id_user: id }, include: [ User ] });
  }

  async create(data) {
    return await RecoveryPassword.create(data);
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
}

module.exports = new RecoveryPasswordRepository();
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const UserStatus = require('./userStatus');

const VolunteerStudent = sequelize.define('volunteer_student', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  run: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  id_user_status: { type: DataTypes.INTEGER, allowNull: false, references: { model: UserStatus, key: 'id' } },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

VolunteerStudent.belongsTo(UserStatus, { foreignKey: 'id_user_status'});

module.exports = VolunteerStudent;
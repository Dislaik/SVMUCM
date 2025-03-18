const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Faculty = require('./faculty');

const UserFaculty = sequelize.define('user_faculty', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_user: { type: DataTypes.INTEGER, allowNull: false, unique: true, references: { model: User, key: 'id' } },
  id_faculty: { type: DataTypes.INTEGER, allowNull: false, references: { model: Faculty, key: 'id' }},
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

UserFaculty.belongsTo(User, { foreignKey: 'id_user'});
UserFaculty.belongsTo(Faculty, { foreignKey: 'id_faculty'});

module.exports = UserFaculty;
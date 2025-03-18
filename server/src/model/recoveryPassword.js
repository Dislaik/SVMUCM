const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');

const RecoveryPassword = sequelize.define('recovery_password', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING, allowNull: false },
  timestamp : { type: DataTypes.BIGINT, allowNull: false },
  id_user: { type: DataTypes.INTEGER, allowNull: false, unique: true, references: { model: User, key: 'id'} },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

RecoveryPassword.belongsTo(User, { foreignKey: 'id_user' });

module.exports = RecoveryPassword;
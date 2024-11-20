const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const UserStatus = sequelize.define('user_status', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false },
});

module.exports = UserStatus;
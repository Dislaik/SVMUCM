const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const projectStatus = sequelize.define('project_status', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

module.exports = projectStatus;
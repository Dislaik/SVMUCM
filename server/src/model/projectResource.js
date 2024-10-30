const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const projectResource = sequelize.define('project_resource', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: true},
  price: { type: DataTypes.INTEGER, allowNull: false}
});

module.exports = projectResource;
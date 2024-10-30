const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Faculty = sequelize.define('faculty', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Faculty;
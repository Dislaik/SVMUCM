const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const APU = sequelize.define('apu', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false },
  description: {type: DataTypes.STRING, allowNull: true},
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

module.exports = APU;
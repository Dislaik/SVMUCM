const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Region = require('./region');

const City = sequelize.define('city', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false },
  id_region: { type: DataTypes.INTEGER, allowNull: false, references: { model: Region, key: 'id' } },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

City.belongsTo(Region, { foreignKey: 'id_region'});

module.exports = City;
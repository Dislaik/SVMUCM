const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Resource = require('./resource');
const APU = require('./apu');

const APUResource = sequelize.define('apu_resource', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_apu: { type: DataTypes.INTEGER, allowNull: false, references: { model: APU, key: 'id' } },
  id_resource: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' }},
  amount: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

APUResource.belongsTo(APU, { foreignKey: 'id_apu'});
APUResource.belongsTo(Resource, { foreignKey: 'id_resource'});

module.exports = APUResource;
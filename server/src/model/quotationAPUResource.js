const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Quotation = require('./quotation');
const APU = require('./apu');
const Resource = require('./resource');

const QuotationAPUResource = sequelize.define('quotation_apu_resource', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_quotation: { type: DataTypes.INTEGER, allowNull: false, references: { model: Quotation, key: 'id' } },
  id_apu: { type: DataTypes.INTEGER, allowNull: false, references: { model: APU, key: 'id' } },
  id_resource: { type: DataTypes.INTEGER, allowNull: false, references: { model: Resource, key: 'id' }},
  uuid: { type: DataTypes.STRING, allowNull: false },
  amount: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  subtotal: { type: DataTypes.INTEGER, allowNull: false },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

QuotationAPUResource.belongsTo(Quotation, { foreignKey: 'id_quotation'});
QuotationAPUResource.belongsTo(APU, { foreignKey: 'id_apu'});
QuotationAPUResource.belongsTo(Resource, { foreignKey: 'id_resource'});

module.exports = QuotationAPUResource;
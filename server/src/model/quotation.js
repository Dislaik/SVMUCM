const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const QuotationStatus = require('./quotationStatus');
const Project = require('./project');

const Quotation = sequelize.define('quotation', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_project: { type: DataTypes.INTEGER, allowNull: false, references: { model: Project, key: 'id'} },
  id_quotation_status: { type: DataTypes.INTEGER, allowNull: false, references: { model: QuotationStatus, key: 'id'} },
  duration_day: { type:DataTypes.INTEGER, allowNull: false},
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

Quotation.belongsTo(Project, { foreignKey: 'id_project' });
Quotation.belongsTo(QuotationStatus, { foreignKey: 'id_quotation_status' })

module.exports = Quotation;
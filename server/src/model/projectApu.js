const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Project = require('./project');
const APU = require('./apu');

const ProjectAPU = sequelize.define('project_apu', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_project: { type: DataTypes.INTEGER, allowNull: false, references: { model: Project, key: 'id' }},
  id_apu: {type: DataTypes.INTEGER, allowNull: false, references: { model: APU, key: 'id' }},
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

ProjectAPU.belongsTo(Project, { foreignKey: 'id_project'});
ProjectAPU.belongsTo(APU, { foreignKey: 'id_apu' });

module.exports = ProjectAPU;
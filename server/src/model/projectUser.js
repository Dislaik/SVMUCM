const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Project = require('./project');
const User = require('./user');
const Faculty = require('./faculty');

const ProjectUser = sequelize.define('project_user', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_project: { type: DataTypes.INTEGER, allowNull: false, references: { model: Project, key: 'id' }},
  id_user: {type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' }},
  id_faculty: { type: DataTypes.INTEGER, allowNull: false, references: { model: Faculty, key: 'id' }},
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

ProjectUser.belongsTo(Project, { foreignKey: 'id_project'});
ProjectUser.belongsTo(User, { foreignKey: 'id_user' });
ProjectUser.belongsTo(Faculty, { foreignKey: 'id_faculty' });

module.exports = ProjectUser;
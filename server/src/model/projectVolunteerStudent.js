const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Project = require('./project');
const VolunteerStudent = require('./volunteerStudent');

const ProjectVolunteerStudent = sequelize.define('project_volunteer_student', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  id_project: { type: DataTypes.INTEGER, allowNull: false, references: { model: Project, key: 'id' }},
  id_volunteer_student: {type: DataTypes.INTEGER, allowNull: false, references: { model: VolunteerStudent, key: 'id' }},
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

ProjectVolunteerStudent.belongsTo(Project, { foreignKey: 'id_project'});
ProjectVolunteerStudent.belongsTo(VolunteerStudent, { foreignKey: 'id_volunteer_student' });

module.exports = ProjectVolunteerStudent;
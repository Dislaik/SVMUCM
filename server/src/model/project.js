const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./user');
const Career = require('./career');
const City = require('./city');
const projectStatus = require('./projectStatus');

const Project = sequelize.define('project', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  id_user: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id',} },
  start_date : { type: DataTypes.DATE, allowNull: false },
  end_date: { type: DataTypes.DATE, allowNull: false },
  id_career: { type: DataTypes.INTEGER, allowNull: false, references: { model: Career, key: 'id',} },
  id_city: { type: DataTypes.INTEGER, allowNull: false, references: { model: City, key: 'id',} },
  id_projectStatus: { type: DataTypes.INTEGER, allowNull: false,  references: { model: projectStatus, key: 'id'}},
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

Project.belongsTo(User, { foreignKey: 'id_user' });
Project.belongsTo(Career, { foreignKey: 'id_career' })
Project.belongsTo(City, { foreignKey: 'id_city' })
Project.belongsTo(projectStatus, { foreignKey: 'id_projectStatus' })

module.exports = Project;
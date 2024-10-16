const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const Headquarter = require('./headquarter');
const User = require('./user');

const RequestCourse = sequelize.define('request_course', {
  id: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  id_headquarter: { type: DataTypes.INTEGER, allowNull: false, references: { model: Headquarter, key: 'id',} },
  duration: { type: DataTypes.STRING, allowNull: false },
  mode: { type: DataTypes.STRING, allowNull: false },
  availableSchedule: { type: DataTypes.STRING, allowNull: false },
  id_user: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id',} },
  reason: { type: DataTypes.STRING, allowNull:false },
  created_at: { type: DataTypes.DATE,  allowNull: false }
});

module.exports = RequestCourse;